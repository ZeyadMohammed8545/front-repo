//target Dom Elements

const adminName = document.querySelector(".admin-name");
const adminImage = document.querySelector(".admin-image");
const signOutBtn = document.querySelector(".sign-out");

const userImage = document.querySelector(".user-image");
const userName = document.querySelector(".user-value.name");
const userEmail = document.querySelector(".user-value.email");
const userAddress = document.querySelector(".user-value.address");
const userPhone = document.querySelector(".user-value.phone");

const programImage = document.querySelector("img.program-Image");
const programTitle = document.querySelector(".program-value.title");
const programPrice = document.querySelector(".program-value.price");
const programDescription = document.querySelector(".program-value.description");

const orderStatus = document.querySelector(".order-value.status");
const orderTransaction = document.querySelector(".order-value.trans-id");
const orderId = document.querySelector(".order-value.order-id");
const totalPrice = document.querySelector(".order-value.total-price");

const apiHandler = async (options) => {
  const apiResponse = await fetch(options.destination, {
    method: options.method || "GET",
    body: options.body || null,
    headers: options.headers || {},
  });

  const received = await apiResponse.json();
  return received;
};

const writeUserData = (userData) => {
  console.log(userData);
  if (userData.imgPath) {
    userImage.src = `https://charity-house.zezogomaa.repl.co/${userData.imgPath}`;
  }
  userName.tetxContent = userData.name;
  userEmail.textContent = userData.email;
  userAddress.textContent = userData.address;
  userPhone.textContent = userData.phone;
};
const writeProgramData = (programData) => {
  programImage.src = `https://charity-house.zezogomaa.repl.co/${programData.imgPath}`;
  programTitle.textContent = programData.title;
  programPrice.textContent = programData.price;
  programDescription.textContent = programData.description;
};
const writeOrderData = (orderData) => {
  console.log(orderData);
  orderStatus.textContent = orderData.status;
  orderTransaction.textContent = orderData.transactionId;
  orderId.textContent = orderData.orderId;
  totalPrice.textContent = orderData.price;
};

const getOrderData = async (orderId, token) => {
  const data = await apiHandler({
    destination: `https://charity-house.zezogomaa.repl.co/order-data/${orderId}`,
    headers: { Authorized: `Bearer ${token}` },
  });

  console.log(data);

  writeUserData(data.order.user);
  writeProgramData(data.order.program);
  writeOrderData(data.order);
};

const parseUserData = () => {
  const userData = JSON.parse(window.localStorage.getItem("loginUserToken"));
  return userData;
};

const signOutHandler = () => {
  window.localStorage.removeItem("loginUserToken");
  window.location.href = "../Auth/Form.html";
};

const loginInfoHandler = (userData) => {
  adminName.textContent = userData.name;
  adminImage.src = `https://charity-house.zezogomaa.repl.co/${userData.userImage}`;
  signOutBtn.addEventListener("click", signOutHandler);
};

const parseUrl = (queryName) => {
  const queries = new URLSearchParams(new URL(window.location.href).search);
  const targetQuery = queries.get(queryName);
  return targetQuery;
};

async function App() {
  const userData = parseUserData();
  loginInfoHandler(userData);
  const orderId = parseUrl("orderId");
  getOrderData(orderId, userData.token);
}

App();
