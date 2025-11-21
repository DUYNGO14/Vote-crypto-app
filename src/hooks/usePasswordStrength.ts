// hooks/usePasswordStrength.ts
import { useState, useMemo } from 'react';

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number;
  feedback: string[];
  isValid: boolean;
}

export const usePasswordStrength = () => {
  const [password, setPassword] = useState('');

  const strengthResult: PasswordStrengthResult = useMemo(() => {
    if (!password) {
      return {
        strength: 'weak',
        score: 0,
        feedback: [],
        isValid: false
      };
    }

    let score = 0;
    const feedback: string[] = [];

    // Check length
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    // Check lowercase letters
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include lowercase letters');
    }

    // Check uppercase letters
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include uppercase letters');
    }

    // Check numbers
    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include numbers');
    }

    // Check special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include special characters');
    }

    // Determine strength
    let strength: PasswordStrength = 'weak';
    if (score >= 5) {
      strength = 'very-strong';
    } else if (score >= 4) {
      strength = 'strong';
    } else if (score >= 3) {
      strength = 'medium';
    }

    return {
      strength,
      score,
      feedback: score >= 4 ? [] : feedback, // Only show feedback when password is weak
      isValid: score >= 3 // Allow medium and above
    };
  }, [password]);

  return {
    password,
    setPassword,
    ...strengthResult
  };
};