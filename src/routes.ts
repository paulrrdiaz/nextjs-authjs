export const PUBLIC_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  NOT_FOUND: '/404',
  AUTH_VERIFY_EMAIL: '/auth/verify-email',
}

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  NEW_PASSWORD: '/auth/new-password',
}
export const API_AUTH_PREFIX = '/api/auth'

export const DASHBOARD_ROUTES = {
  INDEX: '/dashboard',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
  USERS: '/dashboard/users',
  USER: '/dashboard/users/:id',
}

export const DEFAULT_LOGIN_REDIRECT = DASHBOARD_ROUTES.INDEX
