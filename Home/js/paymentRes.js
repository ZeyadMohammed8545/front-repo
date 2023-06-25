const responseContainer = document.querySelector(".container-response");
const responseName = document.querySelector(".response-user-name .item-value");
const userEmail = document.querySelector(".response-email .item-value");
const responseStatus = document.querySelector(".response-status .item-value");
const transId = document.querySelector(".response-trans-id .item-value");
const transPrice = document.querySelector(".response-price .item-value");
const orderId = document.querySelector(".response-order-id .item-value");
const transactionStatus = document.querySelector(".transaction-status");

const apiHandler = async (config) => {
  const apiResponse = await fetch(config.destination, {
    method: config.method || "GET",
    body: JSON.stringify(config.body) || null,
    headers: config.headers || {},
  });
  console.log(apiResponse);
  const targetData = await apiResponse.json();
  console.log(targetData);
  return targetData;
};

async function App() {
  const userData = JSON.parse(window.localStorage.getItem("loginUserToken"));
  const { email, name, userId } = userData;

  const current = window.location.href;
  const paramsObj = new URLSearchParams(new URL(current).search);
  const paramsArr = Array.from(paramsObj.keys());
  let allParams = {};

  paramsArr.forEach((el) => {
    allParams[el] = paramsObj.get(el);
  });
  allParams["userId"] = userId;
  allParams["programId"] = window.localStorage.getItem("program_id");
  console.log(allParams);
  const { id, success, amount_cents, order } = allParams;
  if (success == "true") {
    responseContainer.classList.remove("err-response");
    responseContainer.classList.add("success-response");
    transactionStatus.classList.add("visible");
    transactionStatus.textContent = "عملية ناجحة";
    responseStatus.textContent = "عملية ناجحة";

    // post the Order to it's endpoint

    const addOrderResponse = await apiHandler({
      destination: "http://localhost:4000/add-order",
      method: "POST",
      body: allParams,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else if (success == "false") {
    responseContainer.classList.remove("success-response");
    responseContainer.classList.add("err-response");
    transactionStatus.classList.add("visible");
    transactionStatus.textContent = "عملية فاشلة الرجاء اعادة المحاولة";
    responseStatus.textContent = "عملية فاشلة ";
  }

  responseName.textContent = name;
  userEmail.textContent = email;
  transId.textContent = id;
  transPrice.textContent = amount_cents / 100 + " EGP";
  orderId.textContent = order;
}

App();
