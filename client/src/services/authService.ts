import type { AxiosInstance } from 'axios';
import type {
  UserResponceAuthType,
  UserSignInType,
  UserSignUpType,
  UserType,
} from '../types/userTypes';

import apiInstance from './apiInstance';

class AuthService {
  constructor(private readonly api: AxiosInstance) {}

  public userSignUpService(data: UserSignUpType): Promise<UserResponceAuthType> {
    return this.api.post<UserResponceAuthType>('/auth/signup', data).then((res) => res.data);
  }

  public userSignInService(data: UserSignInType): Promise<UserResponceAuthType> {
    return this.api.post<UserResponceAuthType>('/auth/login', data).then((res) => res.data);
  }

  public checkUserService(): Promise<UserType> {
    return this.api<{ user: UserType }>('/auth/check').then(
      (res) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(res.data.user);
          }, 1000);
        }),
    );
  }
}

export default new AuthService(apiInstance);
