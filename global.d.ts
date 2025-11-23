// global.d.ts
/// <reference types="nativewind/types" />
/// <reference types="expo/types" />

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const CORE_API_DOMAIN: string;
  export const ENABLE_LOGGER: string;
  export const APP_ENV: string;
  export const RECAPTCHA_SITE_KEY : string;
  export const API_TIMEOUT: string;
  export const RECAPTCHA_GOOGLE_URL: string;
  export const RECAPTCHA_BASE_URL: string;
  export const DOMAIN_MEDIA: string;
  export const REOWN_PROJECT_ID: string
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';

// Optional: alias nếu bạn dùng import '@/*'
declare module "@/*" {
  import type { ComponentType } from "react";
  const value: ComponentType<any>;
  export default value;
}
