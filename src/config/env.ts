import {
  CORE_API_DOMAIN,
  APP_ENV,
  ENABLE_LOGGER,
  RECAPTCHA_SITE_KEY,
  API_TIMEOUT,
  RECAPTCHA_GOOGLE_URL,
  RECAPTCHA_BASE_URL,
  DOMAIN_MEDIA
} from '@env';

export const Config = {
  apiBaseUrl: CORE_API_DOMAIN,
  appEnv: APP_ENV,
  enableLogger: ENABLE_LOGGER === 'true',
  apiTimeout: Number(API_TIMEOUT) || 10000,
  captcha_site_key: RECAPTCHA_SITE_KEY,
  google_lib: RECAPTCHA_GOOGLE_URL,
  domain_name: RECAPTCHA_BASE_URL,
  domain_media: DOMAIN_MEDIA,
};
