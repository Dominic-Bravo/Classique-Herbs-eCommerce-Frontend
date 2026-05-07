import type { AuthSession, UserRole } from '../utils/auth';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const AUTH_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login/`,
  registration: `${API_BASE_URL}/auth/registration/`,
};

export const ROLE_OPTIONS: Array<{ value: UserRole; label: string }> = [
  { value: 'customer', label: 'Customer' },
  { value: 'owner', label: 'Owner' },
  { value: 'anonymous', label: 'Anonymous' },
];

export type LoginPayload = {
  username: string;
  email: string;
  password: string;
};

export type RegistrationPayload = {
  username: string;
  email: string;
  password1: string;
  password2: string;
  role: UserRole;
};

type AuthUserResponse = {
  pk?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: UserRole;
};

type AuthResponse = {
  access?: string;
  refresh?: string;
  user?: AuthUserResponse;
  detail?: string;
};

export class AuthApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthApiError';
  }
}

const formatApiError = (errorData: unknown, fallbackMessage: string) => {
  if (!errorData || typeof errorData !== 'object') {
    return fallbackMessage;
  }

  return Object.entries(errorData)
    .map(([field, value]) => {
      if (Array.isArray(value)) {
        return `${field}: ${value.join(' ')}`;
      }

      return `${field}: ${String(value)}`;
    })
    .join(' ');
};

const postAuth = async <Payload>(url: string, payload: Payload, fallbackError: string) => {
  let response: Response;

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new AuthApiError('Could not connect to the auth API. Make sure the backend is running.');
  }

  const data = (await response.json().catch(() => null)) as AuthResponse | null;

  if (!response.ok) {
    throw new AuthApiError(formatApiError(data, fallbackError));
  }

  return data;
};

const toAuthSession = (
  data: AuthResponse | null,
  fallbackUser: { username: string; email: string; role?: UserRole },
): AuthSession => {
  if (!data?.access) {
    throw new AuthApiError(data?.detail ?? 'The auth API did not return an access token.');
  }

  const fullName = [data.user?.first_name, data.user?.last_name].filter(Boolean).join(' ');

  return {
    token: data.access,
    refreshToken: data.refresh,
    user: {
      id: data.user?.pk,
      name: fullName || data.user?.username || fallbackUser.username,
      email: data.user?.email ?? fallbackUser.email,
      role: data.user?.role ?? fallbackUser.role,
    },
  };
};

export const registerUser = async (payload: RegistrationPayload) => {
  const data = await postAuth(AUTH_ENDPOINTS.registration, payload, 'Registration failed. Please check your details and try again.');

  return toAuthSession(data, {
    username: payload.username,
    email: payload.email,
    role: payload.role,
  });
};

export const loginUser = async (payload: LoginPayload) => {
  const data = await postAuth(AUTH_ENDPOINTS.login, payload, 'Login failed. Please check your credentials and try again.');

  return toAuthSession(data, {
    username: payload.username,
    email: payload.email,
  });
};
