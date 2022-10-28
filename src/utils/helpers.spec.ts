import { describe, test, expect } from 'vitest';
import { getErrorDictionary } from './helpers';
import { AxiosError, AxiosResponse } from 'axios';

describe('getErrorDictionary helper', () => {
  test('Error with message passed', () => {
    const error = new Error('Error message');

    expect(getErrorDictionary(error)).toEqual({ Error: ['Error message'] });
  });

  test('Error without message passed', () => {
    const error = new Error();
    expect(getErrorDictionary(error)).toEqual({ Error: ['Unknown error, please try again'] });
  });

  test('AxiosError passed', () => {
    const response = {
      data: undefined,
      status: 0
    } as AxiosResponse;

    const error: AxiosError = new AxiosError(
      'Network Error',
      'ERR_NETWORK',
      {},
      {},
      response);

    expect(getErrorDictionary(error)).toEqual({
      'API Error, please try again': [
        'Network Error'
      ]
    });
  });

  test('AxiosError with validation errors passed', () => {
    const response = {
      data: {
        errors: {
          name: [
            'Too short'
          ],
          password: [
            'Too short',
            'Must contain number'
          ]
        }
      },
      status: 422
    } as AxiosResponse;

    const error: AxiosError = new AxiosError(
      'Request failed with status code 422',
      'ERR_BAD_REQUEST',
      {},
      {},
      response);

    expect(getErrorDictionary(error)).toEqual({
      name: [
        'Too short'
      ],
      password: [
        'Too short',
        'Must contain number'
      ]
    });
  });
});
