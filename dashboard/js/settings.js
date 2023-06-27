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

let hiddenImgPath = "";
let hiddenPass = "";
let adminId = "";
//fetch All Admins
let mode = "add";

const { name, userImage, token } = userData;
const adminName = document.querySelector(".icons h5");
const adminImage = document.querySelector(".icons img");
adminName.textContent = name;
adminImage.src = `http://localhost:4000/${userImage}`;

const clearInput = () => {
  mode = "add";
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  addressInput.value = "";
  passInput.value = "";
  confPassInput.value = "";
  adminImageInput.value = "";
};

adminReset.addEventListener("click", () => {
  ev.preventDefault();
  clearInput();
});

fetch("http://localhost:4000/get-admins", {
  headers: {
    Authorized: `Bearer ${token}`,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    result.admins.forEach((admin) => {
      adminCardContainer.innerHTML += `  <div class="col-12 col-md-6 col-lg-4 col-xl-4 mb-3">
              <div class="card" style="width: 25rem">
                <img
                  class="card-img-top"
                  src="http://localhost:4000/${admin.imgPath}" 
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
  });

// const deleteHandler = async (id) => {
//   const response = await fetch(`http://localhost:4000/delete-admin/${id}`, {
//     method: "DELETE",
//   });
//   location.reload();
// };

// const updateHandler = async (id) => {
//   mode = "edit";
//   const response = await fetch(`http://localhost:4000/get-admin-edit/${id}`);
//   const result = await response.json();
//   userNameInput.value = result.admin.name;
//   emailInput.value = result.admin.email;
//   phoneInput.value = result.admin.phone;
//   addressInput.value = result.admin.address;
//   adminId = result.admin._id;
//   hiddenImgPath = result.admin.imgPath;
//   hiddenPass = result.admin.password;
//   formImage.src = `http://localhost:4000/${result.admin.imgPath}`;
// };

adminSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const formData = new FormData();
  formData.append("name", userNameInput.value);
  formData.append("email", emailInput.value);
  formData.append("phone", phoneInput.value);
  formData.append("address", addressInput.value);
  if (passInput.value) {
    formData.append("password", passInput.value);
  } else {
    formData.append("password", hiddenPass);
  }
  if (confPassInput.value) {
    formData.append("confPass", confPassInput.value);
  } else {
    formData.append("confPass", hiddenPass);
  }
  if (adminImageInput.files[0]) {
    formData.append("image", adminImageInput.files[0]);
  } else {
    formData.append("image", hiddenImgPath);
  }

  if (mode == "add") {
    const response = await fetch("http://localhost:4000/add-admin", {
      method: "POST",
      body: formData,
      headers: {
        Authorized: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    location.reload();
  } else if (mode == "edit") {
    const response = await fetch(
      `http://localhost:4000/edit-admin/${adminId}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorized: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    location.reload();
  }
});

document.querySelector(".sign-out").addEventListener("click", () => {
  window.localStorage.removeItem("loginUserToken");
  window.location.href = "../Auth/Form.html";
});
