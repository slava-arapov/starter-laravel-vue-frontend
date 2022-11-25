import axios, { AxiosError } from 'axios';
import { ErrorDictionary } from '@/interfaces/ErrorDictionary';

interface ServerData {
  errors?: ErrorDictionary
}

export const getErrorDictionary = (error: Error | AxiosError<ServerData>): ErrorDictionary => {
  const inDevelopmentEnv = import.meta.env.NODE_ENV === 'development';

  let errors: ErrorDictionary = {};

  if (!error.name) {
    error.name = 'Unknown error';
  }

  if (!error.message) {
    error.message = 'Unknown error, please try again';
  }

  if (axios.isAxiosError(error)) {
    error.name = 'API Error, please try again';

    if (error.response?.data?.errors) {
      errors = error.response.data.errors;
    }

    if (!error.response?.data) {
      console.error(`API ${error.config?.url} not found`);
    }

    if (inDevelopmentEnv && error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    }
  }

  if (Object.keys(errors).length === 0) {
    errors[error.name] = [error.message];
  }

  return errors;
};
