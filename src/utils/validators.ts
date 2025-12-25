// Reusable validation helpers for email, contact, and password
export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
};

export const normalizeEmail = (email: string) => String(email || '').trim().toLowerCase();

export const extractDigits = (value: string) => String(value || '').replace(/\D/g, '');

export const isValidContact = (value: string) => {
  const digits = extractDigits(value);
  return /^\d{10}$/.test(digits);
};

// Password must contain at least one uppercase letter, one number,
// one special character, and be greater than 6 characters (min 7)
export const isValidPassword = (password: string) => {
  if (!password) return false;
  const pwd = String(password);
  const regex = /(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:'"\\|,.<>/?`~]).{7,}/;
  return regex.test(pwd);
};

export default {
  isValidEmail,
  normalizeEmail,
  extractDigits,
  isValidContact,
  isValidPassword,
};
