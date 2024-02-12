export const normalizePhone = (phone: string) => {
  // if (!phone) return null;
  return ("" + phone).startsWith("995") ? phone : `995${phone}`;
};
