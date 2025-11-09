const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  // Basic phone validation - accepts numbers, +, -, spaces, parentheses
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

const isEmailOrPhone = (input: string): 'email' | 'phone' | 'invalid' => {
  if (isValidEmail(input)) {
    return 'email';
  } else if (isValidPhone(input)) {
    return 'phone';
  } else {
    return 'invalid';
  }
};

export { isValidEmail, isValidPhone, isEmailOrPhone };
