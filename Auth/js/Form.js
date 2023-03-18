// ui Elements
const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");
const errorContainer = document.querySelector(".err-container");
const errText = document.querySelector(".err-text");
//input Items
const nameInput = document.querySelector(".signUpName");
const emailInput = document.querySelector(".signUpEmail");
const phoneInput = document.querySelector(".signUpNumber");
const addressInput = document.querySelector(".signUpAddress");
const passInput = document.querySelector(".signUpPassword");
const confPassInput = document.querySelector(".signUpConfPassword");
const loginEmail = document.querySelector(".loginEmail");
const loginPass = document.querySelector(".loginPass");
//submit buttons
const signUpSubmit = document.querySelector(".sign-up-submit");
const signInSubmit = document.querySelector(".sign-in-submit");

// ===================================================

const clearInput = () => {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  addressInput.value = "";
  passInput.value = "";
  confPassInput.value = "";
};

signInBtn.addEventListener("click", (ev) => {
  container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", (ev) => {
  container.classList.add("right-panel-active");
});
// ===================================================
signUpSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const formData = new FormData();
  formData.append("name", nameInput.value);
  formData.append("email", emailInput.value);
  formData.append("phone", phoneInput.value);
  formData.append("address", addressInput.value);
  formData.append("password", passInput.value);
  formData.append("confPass", confPassInput.value);
  const response = await fetch(
    "https://Charity-House-Server.mohamed-abdelh2.repl.co/sign-up",
    {
      method: "POST",
      body: formData,
    }
  );
  const result = await response.json();
  clearInput();
  if (response.status !== 201 && response.status !== 200) {
    errorContainer.style.display = "flex";
    errText.textContent = result.message;
  }
});
// ===================================================

signInSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const formData = new FormData();
  formData.append("email", loginEmail.value);
  formData.append("password", loginPass.value);
  const response = await fetch(
    `https://Charity-House-Server.mohamed-abdelh2.repl.co/login`,
    {
      method: "POST",
      body: formData,
    }
  );
  const result = await response.json();
  localStorage.setItem("loginUserToken", result.token);
  window.location.href = "../home.html";
  console.log(result);
});
