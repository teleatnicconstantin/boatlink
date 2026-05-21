import axios from 'axios';
import { ApiError } from '../../typings/types';


const handleError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const errors = error?.response?.data?.errors;

    if (errors && typeof errors === 'object') {
      return { errors };
    }

    let allErrorMessages = {};

    if (!errors) {
      allErrorMessages = {
        message: error?.message,
      };
    }

    if (error?.response?.data?.error) {
      allErrorMessages = {
        message: error?.response?.data?.error,
      };
    }
    if (error?.response?.data?.message) {
      allErrorMessages = {
        message: error?.response?.data?.message,
      };
    }

    return allErrorMessages as ApiError;
  } else {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';

    return { message };
  }
};

const getFileExtension = (url: string): string => {
  const parts = url.split('.');
  const lastPart = parts.pop();

  if (!lastPart) {
    return '';
  }

  return lastPart.split(/\#|\?/)[0];
};



export {
  handleError,
};
