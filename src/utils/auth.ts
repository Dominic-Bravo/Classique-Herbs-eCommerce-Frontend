export type UserRole = 'owner' | 'customer' | 'anonymous';

export interface AuthUser {
  id?: string | number;
  name: string;
  email: string;
  role?: UserRole;
}

export interface AuthSession {
  token: string;
  refreshToken?: string;
  user: AuthUser;
}

const SESSION_KEY = 'classique_auth_session';

const isBrowser = () => typeof window !== 'undefined';

const fallbackUser: AuthUser = {
  name: 'Classique Customer',
  email: 'customer@classique.test',
  role: 'customer',
};

export const getAuthSession = (): AuthSession | null => {
  if (!isBrowser()) {
    return null;
  }

  const rawSession = window.localStorage.getItem(SESSION_KEY);
  const rawToken =
    window.localStorage.getItem('authToken') ??
    window.localStorage.getItem('token') ??
    window.localStorage.getItem('access_token');

  if (rawSession) {
    try {
      const parsed = JSON.parse(rawSession) as Partial<AuthSession>;

      if (parsed.token || rawToken) {
        return {
          token: parsed.token ?? rawToken ?? '',
          user: {
            ...fallbackUser,
            ...parsed.user,
          },
        };
      }
    } catch {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }

  if (rawToken) {
    return {
      token: rawToken,
      user: fallbackUser,
    };
  }

  return null;
};

export const setAuthSession = (session: AuthSession) => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('auth-session-changed'));
};

export const clearAuthSession = () => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem('authToken');
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');
  window.dispatchEvent(new Event('auth-session-changed'));
};

export const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'CC';
