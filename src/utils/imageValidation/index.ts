const isValidImage = (typeImage: string): boolean => {
  return ['image/png', 'image/jpg', 'image/jpeg'].includes(typeImage);
};

export default isValidImage;