import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const apiFetch = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // console.log("AXIOS CONFIG ONREQUEST", config);
  return config;
};

const onRequestError = (err: AxiosError): Promise<AxiosError> => {
  // console.error("AXIOS CONFIG ONREQUEST ERROR", err);
  return Promise.reject(err);
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  // console.log("AXIOS CONFIG ONRESPONSE", res);
  return res;
};

const onResponseError = (err: AxiosError): Promise<AxiosError> => {
  // console.error("AXIOS CONFIG ONRESPONSE ERROR", err);
  return Promise.reject(err);
};

apiFetch.interceptors.request.use(onRequest, onRequestError);
apiFetch.interceptors.response.use(onResponse, onResponseError);

export default apiFetch;
