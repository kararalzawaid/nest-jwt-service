import CryptoJS from 'crypto-js';

export const encryptPassword = el => CryptoJS.AES.encrypt(el, process.env.APP_SECRET).toString();

export const decryptPassword = password => {
  const decryptedPassword = CryptoJS.AES.decrypt(password, process.env.APP_SECRET);

  return decryptedPassword.toString(CryptoJS.enc.Utf8);
}; 