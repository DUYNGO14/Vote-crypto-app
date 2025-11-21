// hooks/useRecaptchaV3.ts
import { useRef, useCallback, useState } from 'react';
import { RecaptchaV3Ref } from '@/screens/Auth/components/RecaptchaV3';

const DEBUG = __DEV__;

export function useRecaptchaV3() {
  const recaptchaRef = useRef<RecaptchaV3Ref>(null);
  const [isReady, setIsReady] = useState(false);

  const getToken = useCallback(async (action: string = 'login'): Promise<string> => {
    if (!recaptchaRef.current) {
      throw new Error('reCAPTCHA not initialized');
    }

    if (!recaptchaRef.current.isReady) {
      throw new Error('reCAPTCHA is not ready yet. Please wait for initialization.');
    }

    if (DEBUG) {
      console.log('🔄 Getting reCAPTCHA token for action:', action);
    }

    const token = await recaptchaRef.current.getToken(action);
    
    if (!token) {
      throw new Error('No token received from reCAPTCHA');
    }

    if (DEBUG) {
      console.log('✅ Token received successfully');
    }

    return token;
  }, []);

  const handleRecaptchaLoad = useCallback(() => {
    if (DEBUG) {
      console.log('✅ reCAPTCHA loaded');
    }
    setIsReady(true);
  }, []);

  const handleRecaptchaError = useCallback((error: string) => {
    console.error('❌ reCAPTCHA error:', error);
    setIsReady(false);
  }, []);

  return { 
    recaptchaRef, 
    getToken, 
    isReady,
    onRecaptchaLoad: handleRecaptchaLoad,
    onRecaptchaError: handleRecaptchaError,
  };
}