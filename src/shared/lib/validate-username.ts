export const validateUsername = (value: string) =>
  !/^[A-Za-z0-9_]{3,30}$/.test(value)
    ? "Username must be 3 <= length < 30, contains only a-z, A-Z, 0-9, _"
    : null;
