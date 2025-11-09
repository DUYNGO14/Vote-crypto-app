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
