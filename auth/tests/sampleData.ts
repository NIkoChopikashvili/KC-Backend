const generateNumber = (length: number) => {
  var digits = "0123456789";
  let number = "";
  for (let i = 0; i < length; i++) {
    number += digits[Math.floor(Math.random() * 10)];
  }
  return number;
};

export const sampleUser = {
  phone: generateNumber(9),
};
