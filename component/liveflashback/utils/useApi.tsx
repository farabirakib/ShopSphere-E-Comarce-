import { AxiosAuth } from "./AxiosAPI";

export type TApiResponse<T> = {
  error: number;
  message?: string;
  data?: T;
  eventId?: string;
  image_url?: string;
  bkashURL?: string;
  perId?: string;
  donateId?: string;
  res: any;
};

type TMethod = "get" | "post";

type ReturnType = {
  get: <T extends unknown>(
    url: string,
    query?: Record<string, any>
  ) => Promise<TApiResponse<T>>;
  post: <T extends unknown>(
    url: string,
    payload: Record<string, number | string | any>
  ) => Promise<TApiResponse<T>>;
};

/**
 * Custom hook to handle API requests with authentication and error handling.
 * Ensures `reloadKey` is reactive and accessible outside the hook.
 */
const useApi = (): ReturnType => {
  const request = async <T = any,>(
    method: TMethod,
    path: string,
    payload?: any,
    query?: Record<string, any>
  ): Promise<TApiResponse<T>> => {
    try {
      const formattedUrl = path.startsWith("/") ? path : `/${path}`;
      const apiRequest = AxiosAuth.setPath(formattedUrl, query);

      let config = {};
      if (payload instanceof FormData) {
        config = { headers: { "Content-Type": "multipart/form-data" } };
      }

      const { data }: { data: TApiResponse<T> } =
        method === "get"
          ? await apiRequest.get(config)
          : await apiRequest.post(payload, config);

      if (data.error !== 0) {
        throw new Error(data.message);
      }

      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    get: <T extends unknown>(
      url: string,
      query?: Record<string, any>
    ): Promise<TApiResponse<T>> => request("get", url, undefined, query),

    post: <T extends unknown>(
      url: string,
      payload: Record<string, any>
    ): Promise<TApiResponse<T>> => request("post", url, payload),
  };
};

export default useApi;
