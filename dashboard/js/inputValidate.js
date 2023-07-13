const emailForm = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneForm = /[0-9]{11}/;
const passwordForm = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const validateName = (input) => {
  if (input.length >= 3) return true;
  else return false;
};

const validateEmail = (input) => {
  if (emailForm.test(input)) return true;
  else return false;
};

const validatePhone = (input) => {
  if (phoneForm.test(input)) return true;
  else return false;
};

const validateAddress = (input) => {
  if (input.length > 5) return true;
  else return false;
};

const validatePassword = (input) => {
  if (passwordForm.test(input)) return true;
  else return false;
};

const validateConfPass = (input, password) => {
  if (input.trim() == password.trim()) return true;
  else return false;
};

const validateInput = (input, validateMethod) => {
  const result = validateMethod(input.trim());
  return result;
};
