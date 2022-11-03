import matchers from '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/vue';
import FlashMessage from './FlashMessage.vue';
import vuetify from '@/plugins/vuetify';

expect.extend(matchers);

describe('FlashMessage', () => {
  test('Renders message', () => {
    const { getByText } = render(FlashMessage, {
      props: {
        message: 'hello world'
      },
      global: {
        plugins: [vuetify]
      }
    });
    expect(getByText('hello world')).toBeInTheDocument();
  });

  test('Renders string error', () => {
    const { getByText } = render(FlashMessage, {
      props: {
        error: 'unexpected error'
      },
      global: {
        plugins: [vuetify]
      }
    });
    expect(getByText('unexpected error')).toBeInTheDocument();
  });

  test('Renders errors and error headings from dictionary', () => {
    const { getByText } = render(FlashMessage, {
      props: {
        error: {
          Name: [
            'too short',
            'contains number'
          ],
          Email: [
            'invalid'
          ]
        }
      },
      global: {
        plugins: [vuetify]
      }
    });

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('too short')).toBeInTheDocument();
    expect(getByText('contains number')).toBeInTheDocument();

    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('invalid')).toBeInTheDocument();
  });

  test('Replaces dashes with spaces and capitalizes error group names', () => {
    const { getByText } = render(FlashMessage, {
      props: {
        error: {
          name: [
            'too short',
            'contains number'
          ],
          // eslint-disable-next-line camelcase
          personal_email: [
            'invalid'
          ]
        }
      },
      global: {
        plugins: [vuetify]
      }
    });
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Personal Email')).toBeInTheDocument();
  });
});
