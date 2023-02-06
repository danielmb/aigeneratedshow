export const isValidJSON = (str: string) => {
  let json;
  try {
    json = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return json;
};

export const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
