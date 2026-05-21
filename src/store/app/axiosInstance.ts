import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onRequest = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const tokenResult = await AsyncStorage.getItem('token');

  if (tokenResult) {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${tokenResult}`;
  }

  return config;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  //   console.log('error', error.response);

  return Promise.reject(error);
};

const setupInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  // @ts-ignore
  axiosInstance.interceptors.request.use(onRequest);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

export const appAxios = setupInterceptors(
  axios.create({
    baseURL: 'http://192.168.0.15:8000',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
);
