// const firstName = document.querySelector(".contact-first-name");
// const lastName = document.querySelector(".contact-last-name");
// const email = document.querySelector(".contact-email");
// const address = document.querySelector(".contact-address");
// const phone = document.querySelector(".contact-phone");
const message = document.querySelector(".contact-message");
const contactSubmit = document.querySelector(".contact-submit");
const requestStatus = document.querySelector(".request-status");
console.log("start contact Page");

// console.log(firstName);
// console.log(lastName);
// console.log(email);
// console.log(address);
// console.log(phone);
console.log(message);
console.log(contactSubmit);

const clearInput = () => {
  // firstName.value = "";
  // lastName.value = "";
  // email.value = "";
  // address.value = "";
  // phone.value = "";
  message.value = "";
};

const userData = JSON.parse(window.localStorage.getItem("loginUserToken"));
const { userId, token } = userData;
contactSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  console.log(ev);
  const formData = new FormData();
  // formData.append("firstName", firstName.value);
  // formData.append("lastName", lastName.value);
  // formData.append("email", email.value);
  // formData.append("address", address.value);
  // formData.append("phone", phone.value);
  formData.append("message", message.value);
  const response = await fetch("http://localhost:4000/add-contact", {
    method: "POST",
    body: formData,
    headers: {
      Authorized: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log(result);
  if (response.status === 200 || response.status === 201) {
    requestStatus.classList.remove("err");
    requestStatus.classList.add("success");
    requestStatus.textContent = result.message;
  } else {
    requestStatus.classList.remove("success");
    requestStatus.classList.add("err");
    requestStatus.textContent = result.message;
  }
  clearInput();
});
