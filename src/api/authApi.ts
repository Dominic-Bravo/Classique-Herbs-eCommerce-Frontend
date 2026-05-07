import type { AuthSession, UserRole } from '../utils/auth';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const AUTH_ENDPOINTS = {
  google: `${API_BASE_URL}/auth/google/`,
  login: `${API_BASE_URL}/auth/login/`,
  registration: `${API_BASE_URL}/auth/registration/`,
};

export const GOOGLE_OAUTH_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/google-callback&prompt=consent&response_type=code&client_id=1018020452119-vbobeis6f5keoq8kbo5t446flgcu5cap.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline';

export const GOOGLE_AUTH_REDIRECT_KEY = 'classique_google_auth_redirect';

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

export type GoogleAuthPayload = {
  access_token?: string;
  code?: string;
  id_token?: string;
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
  access_token?: string;
  refresh?: string;
  refresh_token?: string;
  code?: string;
  id_token?: string;
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
  const token = data?.access ?? data?.access_token ?? data?.id_token ?? data?.code;

  if (!token) {
    throw new AuthApiError(data?.detail ?? 'The auth API did not return an access token.');
  }

  const user = data?.user;
  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ');

  return {
    token,
    refreshToken: data?.refresh ?? data?.refresh_token,
    user: {
      id: user?.pk,
      name: fullName || user?.username || fallbackUser.username,
      email: user?.email ?? fallbackUser.email,
      role: user?.role ?? fallbackUser.role,
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

export const authenticateWithGoogle = async (payload: GoogleAuthPayload) => {
  const hasCredential = Boolean(payload.access_token || payload.code || payload.id_token);

  if (!hasCredential) {
    throw new AuthApiError('Enter a Google access token, authorization code, or ID token.');
  }

  const data = await postAuth(AUTH_ENDPOINTS.google, payload, 'Google authentication failed. Please try again.');
  const user = data?.user;

  return toAuthSession(data, {
    username: user?.username ?? 'Google User',
    email: user?.email ?? '',
    role: user?.role ?? 'customer',
  });
};
