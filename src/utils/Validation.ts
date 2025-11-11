export function validateLoginInput(email: string, password: string): string[] {
  const errors: string[] = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Email must be a valid email address');
  }

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  return errors;
}

export function validateRegisterInput(username: string, email: string, password: string): string[] {
  const errors: string[] = [];

  const usernameRegex = /^[a-zA-Z0-9]{3,30}$/;
  if (!username || !usernameRegex.test(username)) {
    errors.push('Username must be alphanumeric and 3-30 characters long');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Email must be a valid email address');
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    errors.push('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character');
  }

  return errors;
}
