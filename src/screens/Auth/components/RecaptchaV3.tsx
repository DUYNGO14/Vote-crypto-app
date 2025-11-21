// screens/Auth/components/RecaptchaV3.tsx
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import ReCaptcha, { GoogleRecaptchaRefAttributes } from '@valture/react-native-recaptcha-v3';

type RecaptchaV3Props = {
  siteKey: string;
  baseUrl?: string;
  action?: string;
  onVerify?: (token: string) => void;
  onError?: (error: string) => void;
  onLoad?: () => void;
  onExpire?: () => void;
  autoExecute?: boolean;
};

export type RecaptchaV3Ref = {
  getToken: (action?: string) => Promise<string>;
  readonly isReady: boolean;
};

const FALLBACK_TIMEOUT = 3000; // 3 seconds
const DEBUG = __DEV__; // Only log in development

const RecaptchaV3 = forwardRef<RecaptchaV3Ref, RecaptchaV3Props>(
  ({ 
    siteKey, 
    baseUrl, 
    action = 'login', 
    onVerify, 
    onError, 
    onLoad,
    onExpire,
    autoExecute = false
  }, ref) => {
    const recaptchaRef = useRef<GoogleRecaptchaRefAttributes>(null);
    const isReadyRef = useRef(false);
    const [isReady, setIsReady] = useState(false);
    console.log('[RECAPTCHA] Site key:', siteKey);
    console.log('[RECAPTCHA] Base URL:', baseUrl);
    // Helper for conditional logging
    const log = (message: string, ...args: any[]) => {
      if (DEBUG) console.log(message, ...args);
    };

    // Set ready state
    const setReadyState = (ready: boolean) => {
      if (isReadyRef.current !== ready) {
        isReadyRef.current = ready;
        setIsReady(ready);
        if (ready) onLoad?.();
      }
    };

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      getToken: async (customAction?: string) => {
        if (!isReadyRef.current) {
          throw new Error('reCAPTCHA is not ready yet. Please wait for initialization.');
        }
        
        if (!recaptchaRef.current) {
          throw new Error('reCAPTCHA not initialized');
        }
        
        const tokenAction = customAction || action;
        log('🔑 Getting reCAPTCHA token for action:', tokenAction);
        
        const token = await recaptchaRef.current.getToken(tokenAction);
        
        if (!token) {
          throw new Error('No token received from reCAPTCHA');
        }
        
        log('✅ Token received successfully');
        return token;
      },
      get isReady() {
        return isReadyRef.current;
      },
    }), [action]);

    // Official load callback
    const handleLoad = () => {
      log('🎉 reCAPTCHA loaded (official callback)');
      setReadyState(true);
    };

    // Error callback
    const handleError = (error: string) => {
      console.error('💥 reCAPTCHA error:', error);
      setReadyState(false);
      onError?.(error);
    };

    // Verify callback - fallback for when onLoad doesn't trigger
    const handleVerify = (token: string) => {
      log('✅ reCAPTCHA verified');
      if (!isReadyRef.current) {
        log('⚠️ Setting ready from verify (onLoad not called)');
        setReadyState(true);
      }
      onVerify?.(token);
    };

    // Expire callback
    const handleExpire = () => {
      log('⚠️ reCAPTCHA token expired');
      setReadyState(false);
      onExpire?.();
    };

    // Fallback mechanism - test if reCAPTCHA works after timeout
    useEffect(() => {
      if (!autoExecute) return;
      const fallbackTimer = setTimeout(async () => {
        if (!isReadyRef.current && recaptchaRef.current) {
          log('🔍 Testing reCAPTCHA (fallback after timeout)');
          
          try {
            const token = await recaptchaRef.current.getToken(action);
            
            if (token && !isReadyRef.current) {
              log('✅ Fallback test successful');
              setReadyState(true);
            } else if (isReadyRef.current) {
              log('ℹ️ Already ready');
            }
          } catch (err) {
            console.error('❌ Fallback test failed:', err);
          }
        }
      }, FALLBACK_TIMEOUT);

      return () => {
        clearTimeout(fallbackTimer);
        isReadyRef.current = false;
      };
    }, [action]);

    return (
      <ReCaptcha
        ref={recaptchaRef}
        siteKey={siteKey}
        baseUrl={baseUrl}
        action={action}
        onVerify={handleVerify}
        onError={handleError}
        onLoad={handleLoad}
        onExpire={handleExpire}
        containerStyle={styles.recaptchaContainer}
        lang="en"
      />
    );
  }
);

RecaptchaV3.displayName = 'RecaptchaV3';

export default RecaptchaV3;

const styles = StyleSheet.create({
  recaptchaContainer: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
    zIndex: -9999,
  },
});