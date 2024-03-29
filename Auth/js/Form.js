// ui Elements
const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const fistForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");
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

const signupStatus = document.querySelector(".feed-status.signup-status");
const loginStatus = document.querySelector(".feed-status.login-status");
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
  signupStatus.classList.remove("err");
  signupStatus.classList.remove("success");
  loginStatus.classList.remove("err");
  loginStatus.classList.remove("success");
  container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", (ev) => {
  signupStatus.classList.remove("err");
  signupStatus.classList.remove("success");
  loginStatus.classList.remove("err");
  loginStatus.classList.remove("success");
  container.classList.add("right-panel-active");
});
// ===================================================
// events

const nameChangeHandler = (targetValue) => {
  const valueIsValid = validateInput(targetValue, validateName);
  if (valueIsValid) {
    nameInput.classList.remove("invalid");
  } else {
    nameInput.classList.add("invalid");
  }
};
const emailChangeHandler = (targetValue) => {
  const valueIsValid = validateInput(targetValue, validateEmail);
  if (valueIsValid) {
    emailInput.classList.remove("invalid");
  } else {
    emailInput.classList.add("invalid");
  }
};
const addressChangeHandler = (targetValue) => {
  const valueIsValid = validateInput(targetValue, validateAddress);
  if (valueIsValid) {
    addressInput.classList.remove("invalid");
  } else {
    addressInput.classList.add("invalid");
  }
};
const phoneChangeHandler = (targetValue) => {
  const valueIsValid = validateInput(targetValue, validatePhone);
  if (valueIsValid) {
    phoneInput.classList.remove("invalid");
  } else {
    phoneInput.classList.add("invalid");
  }
};
const passwordChangeHandler = (targetValue) => {
  const valueIsValid = validateInput(targetValue, validatePassword);
  if (valueIsValid) {
    passInput.classList.remove("invalid");
  } else {
    passInput.classList.add("invalid");
  }
};
const confPassChangeHandler = (targetValue) => {
  const isValid = validateInput(targetValue, validatePassword);
  const valueIsValid =
    validateConfPass(targetValue, passInput.value) && isValid;
  if (valueIsValid) {
    confPassInput.classList.remove("invalid");
  } else {
    confPassInput.classList.add("invalid");
  }
};

const loginEmailChange = (targetValue) => {
  const valueIsValid = validateInput(targetValue, validateEmail);
  if (valueIsValid) {
    loginEmail.classList.remove("invalid");
  } else {
    loginEmail.classList.add("invalid");
  }
};

const loginPassChange = (targetValue) => {
  const valueIsValid = validateInput(targetValue, validatePassword);
  if (valueIsValid) {
    loginPass.classList.remove("invalid");
  } else {
    loginPass.classList.add("invalid");
  }
};

signUpSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();

  const nameIsValid = validateInput(nameInput.value, validateName);
  const emailIsValid = validateInput(emailInput.value, validateEmail);
  const addressIsValid = validateInput(addressInput.value, validateAddress);
  const phoneIsValid = validateInput(phoneInput.value, validatePhone);
  const passIsValid = validateInput(passInput.value, validatePassword);
  const confPassIsValid =
    validateConfPass(confPassInput.value, confPassInput.value) &&
    confPassInput.value.trim() == passInput.value.trim();

  const formIsValid =
    nameIsValid &&
    emailIsValid &&
    addressIsValid &&
    phoneIsValid &&
    passIsValid &&
    confPassIsValid;

  if (formIsValid) {
    const formData = new FormData();
    formData.append("name", nameInput.value);
    formData.append("email", emailInput.value);
    formData.append("phone", phoneInput.value);
    formData.append("address", addressInput.value);
    formData.append("password", passInput.value);
    formData.append("confPass", confPassInput.value);
    const response = await fetch(
      "https://charity-house.zezogomaa.repl.co/sign-up",
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    console.log(result);
    if (response.status === 200 || response.status === 201) {
      signupStatus.classList.remove("err");
      signupStatus.classList.add("success");
      signupStatus.textContent = result.message;
    } else {
      signupStatus.classList.remove("success");
      signupStatus.classList.add("err");
      signupStatus.textContent = result.message;
    }
    clearInput();
  } else {
    swal({
      title: "invalid Inputs",
    });
  }
});
// ===================================================

signInSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const emailIsValid = validateInput(loginEmail.value, validateEmail);
  const passIsValid = validateInput(loginPass.value, validatePassword);

  const formIsValid = emailIsValid && passIsValid;

  if (formIsValid) {
    console.log(loginEmail.value);
    console.log(loginPass.value);
    const formData = new FormData();
    formData.append("email", loginEmail.value);
    formData.append("password", loginPass.value);
    const response = await fetch(
      `https://charity-house.zezogomaa.repl.co/login`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    console.log(response);

    if (response.status === 200 || response.status === 201) {
      console.log(result);
      const { userType } = result.userData;
      localStorage.setItem("loginUserToken", JSON.stringify(result.userData));
      if (userType == "admin") {
        //redirect to dashboard
        console.log("redirected to DashBoard");
        window.location.href = "../dashboard/index.html";
      } else {
        //redirect to Home
        console.log("redirected To Home");
        window.location.href = "../Home/index.html";
      }
      console.log(result);
    } else {
      loginStatus.classList.add("err");
      loginStatus.textContent = result.message;
    }
    loginEmail.value = "";
    loginPass.value = "";
  } else {
    swal({ title: "invalid inputs" });
  }
});
