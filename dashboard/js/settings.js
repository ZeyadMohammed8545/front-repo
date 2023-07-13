const userNameInput = document.querySelector(".user-name-input");
const emailInput = document.querySelector(".email-input");
const phoneInput = document.querySelector(".phone-input");
const addressInput = document.querySelector(".address-input");
const passInput = document.querySelector(".pass-input");
const confPassInput = document.querySelector(".conf-pass-input");
const adminImageInput = document.querySelector(".admin-image");
const adminSubmit = document.querySelector(".admin-submit");
const adminReset = document.querySelector(".admin-reset");
const adminCardContainer = document.querySelector(".admin-cards-container");
const formImage = document.querySelector(".formImg img");
const adminName = document.querySelector(".icons h5");
const adminImage = document.querySelector(".icons img");
const formInputs = Array.from(document.querySelectorAll(".form-control"));
const mainForm = document.querySelector(".admins-form");

const init = () => {
  let hiddenImgPath = "";

  let adminId = "";

  return { hiddenImgPath, adminId };
};

const writeUserData = (name, userImage) => {
  adminName.textContent = name;
  adminImage.src = `https://charity-house.zezogomaa.repl.co/${userImage}`;
};

const getAdminsData = async (token) => {
  const adminsData = await apiHandler({
    destination: "https://charity-house.zezogomaa.repl.co/get-admins",
    headers: {
      Authorized: `Bearer ${token}`,
    },
  });

  return adminsData;
};

const writeAdminsData = async (adminsData) => {
  adminsData.admins.forEach((admin) => {
    adminCardContainer.innerHTML += `  <div class="col-12 col-md-6 col-lg-4 col-xl-4 mb-3">
            <div class="card" style="width: 25rem">
              <img
                class="card-img-top target-image"
                src="https://charity-house.zezogomaa.repl.co/${admin.imgPath}"  
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title mt-4 mb-4">
                  FullName:-
                  <span class="text-secondary h5"> ${admin.name}</span>
                </h5>
                <hr />
                <h5 class="card-title mt-4 mb-4">
                  Email:-<span class="text-secondary h5">
                    ${admin.email}
                  </span>
                </h5>
                <hr />
               
              </div>
              </div>
              </div>`;
  });
};

const getFormValues = () => {
  const name = userNameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const address = addressInput.value;
  const password = passInput.value;
  const confPass = confPassInput.value;
  const image = adminImageInput.files[0];
  return { name, email, phone, address, password, confPass, image };
};

const getFormData = () => {
  const { name, email, phone, address, password, confPass, image } =
    getFormValues();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("address", address);
  formData.append("password", password);
  formData.append("confPass", confPass);
  formData.append("image", image);
  return formData;
};

const addAdmin = async (formData, token) => {
  const result = await apiHandler({
    destination: "https://charity-house.zezogomaa.repl.co/add-admin",
    method: "POST",
    parse: false,
    body: formData,
    headers: {
      Authorized: `Bearer ${token}`,
    },
  });

  return result;
};

const clearInput = () => {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  addressInput.value = "";
  passInput.value = "";
  confPassInput.value = "";
  adminImageInput.value = "";
};

const setEvents = (token) => {
  adminReset.addEventListener("click", () => {
    ev.preventDefault();
    clearInput();
  });

  document.querySelector(".sign-out").addEventListener("click", () => {
    window.localStorage.removeItem("loginUserToken");
    window.location.href = "../Auth/Form.html";
  });
};

const nameChange = (ev) => {
  const valueValid = validateInput(ev, validateName);
  if (valueValid) {
    userNameInput.classList.remove("invalid");
  } else {
    userNameInput.classList.add("invalid");
  }
};

const emailChange = (ev) => {
  const valueValid = validateInput(ev, validateEmail);
  if (valueValid) {
    emailInput.classList.remove("invalid");
  } else {
    emailInput.classList.add("invalid");
  }
};

const phoneChange = (ev) => {
  const valueValid = validateInput(ev, validatePhone);
  if (valueValid) {
    phoneInput.classList.remove("invalid");
  } else {
    phoneInput.classList.add("invalid");
  }
};

const addressChange = (ev) => {
  const valueValid = validateInput(ev, validateAddress);
  if (valueValid) {
    addressInput.classList.remove("invalid");
  } else {
    addressInput.classList.add("invalid");
  }
};

const passwordChange = (ev) => {
  const valueValid = validateInput(ev, validatePassword);
  if (valueValid) {
    passInput.classList.remove("invalid");
  } else {
    passInput.classList.add("invalid");
  }
};

const confPassChange = (ev) => {
  const valueValid =
    validateInput(ev, validatePassword) && ev == passInput.value;
  if (valueValid) {
    confPassInput.classList.remove("invalid");
  } else {
    confPassInput.classList.add("invalid");
  }
};

async function App() {
  const { userName, userImage, token } = userData;
  const { hiddenImgPath, adminId } = init();
  setEvents(token);
  writeUserData(userName, userImage);
  const adminsData = await getAdminsData(token);
  writeAdminsData(adminsData);
  mainForm.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const { name, email, phone, address, password, confPass, image } =
      getFormValues();

    const nameIsValid = validateInput(name, validateName);
    const emailIsValid = validateInput(email, validateEmail);
    const phoneIsValid = validateInput(phone, validatePhone);
    const addressIsValid = validateInput(address, validateAddress);
    const passwordIsValid = validateInput(password, validatePassword);
    const confPassIsValid =
      validateConfPass(confPass, password) && passwordIsValid;
    const formIsValid =
      nameIsValid &&
      emailIsValid &&
      phoneIsValid &&
      addressIsValid &&
      passwordIsValid &&
      confPassIsValid;
    if (formIsValid) {
      console.log("we are not reloading ");
      // submitHandler(token);
      const formData = getFormData();
      const response = await addAdmin(formData, token);
      location.reload();
    } else {
      swal({
        title: "Invalid Inputs",
      });
    }
  });
}

App();
