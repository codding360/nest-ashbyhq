import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance, AxiosBasicCredentials, HttpStatusCode } from 'axios';
import { ConfigOptions } from './types/global';
import { Errors } from './enums/errors.enum';
import { UnauthorizedError, BadRequestError, InternalError, NotFoundError } from './errors';

@Injectable()
export class AshbyhqService {
  private axiosInstance: AxiosInstance;
  private readonly BASE_URL = 'https://api.ashbyhq.com';
  private readonly TIMEOUT = 10000;
  private readonly HEADERS = {
    'Content-Type': 'application/json',
  };

  constructor(
    @Inject('ASHBY_HQ_OPTIONS')
    private readonly options: ConfigOptions,
  ) {
    if (!options.auth.username && !options.auth.apiKey) {
      throw new Error(Errors.INVALID_CREDENTIALS);
    }

    const auth: AxiosBasicCredentials = {
      username: options.auth.username || options.auth.apiKey || '',
      password: options.auth.password || '',
    };

    const headers: Record<string, string> = {
      ...this.HEADERS,
      ...options.headers,
    };

    const baseURL: string = options.baseURL || this.BASE_URL;
    const timeout: number = options.timeout || this.TIMEOUT;

    this.axiosInstance = axios.create({
      baseURL,
      timeout,
      headers,
      auth,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      this.handleError,
    );
  }

  private handleError<T>(error: AxiosError<T>): T {
    switch (error.response?.status) {
      case HttpStatusCode.Unauthorized:
        throw new UnauthorizedError(error.message);
      case HttpStatusCode.BadRequest:
        throw new BadRequestError(error.message);
      case HttpStatusCode.InternalServerError:
        throw new InternalError(error.message);
      case HttpStatusCode.NotFound:
        throw new NotFoundError(error.message);
      default:
        console.error(error);
        throw new Error(Errors.SOMETHING_WENT_WRONG);
    }
  }

  protected async post<T, D>(url: string, data: D): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  protected async upload<T>(url: string, data: FormData): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
} 