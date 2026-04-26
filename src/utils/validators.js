export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone) => {
  return /^[0-9+\-\s]{7,15}$/.test(phone);
};

export const isStrongPassword = (password) => {
  return password && password.length >= 6;
};
