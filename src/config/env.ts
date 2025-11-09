import { CORE_API_DOMAIN, APP_ENV, ENABLE_LOGGER } from '@env';

export const Config = {
  apiBaseUrl: CORE_API_DOMAIN,
  appEnv: APP_ENV,
  enableLogger: ENABLE_LOGGER === 'true',
  apiTimeout: Number(process.env.API_TIMEOUT) || 10000,
};
