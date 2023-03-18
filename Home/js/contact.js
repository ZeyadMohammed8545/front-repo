const firstName = document.querySelector(".contact-first-name");
const lastName = document.querySelector(".contact-last-name");
const email = document.querySelector(".contact-email");
const address = document.querySelector(".contact-address");
const phone = document.querySelector(".contact-phone");
const message = document.querySelector(".contact-message");
const contactSubmit = document.querySelector(".contact-submit");

const clearInput = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  address.value = "";
  phone.value = "";
  message.value = "";
};

contactSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const formData = new FormData();
  formData.append("firstName", firstName.value);
  formData.append("lastName", lastName.value);
  formData.append("email", email.value);
  formData.append("address", address.value);
  formData.append("phone", phone.value);
  formData.append("message", message.value);

  const result = await fetch("http://localhost:4000/add-contact", {
    method: "POST",
    body: formData,
  });
  const response = await result.json();
  clearInput();
  location.reload();
});
