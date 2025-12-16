// Черный список номеров
export const BLACKLIST_PHONES = ["+79999999999"];

// Максимум заказов в день с одного номера
export const MAX_DAILY_ORDERS = 5;

// Валидация номера телефона (10-11 цифр)
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 11;
};

// Форматирование номера в единый формат
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 11 && cleaned.startsWith("8")) {
    return "+7" + cleaned.slice(1);
  }
  if (cleaned.length === 10) {
    return "+7" + cleaned;
  }
  if (cleaned.length === 11 && cleaned.startsWith("7")) {
    return "+" + cleaned;
  }
  return "+" + cleaned;
};

// Проверка на черный список
export const isBlacklisted = (phone: string): boolean => {
  const formattedPhone = formatPhone(phone);
  return BLACKLIST_PHONES.includes(formattedPhone);
};

// Валидация имени
export const isValidName = (name: string): boolean => {
  return name.length >= 2;
};

// Валидация адреса
export const isValidAddress = (address: string): boolean => {
  return address.length >= 3;
};

// Валидация времени
export const isValidTime = (time: string): boolean => {
  return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
};
