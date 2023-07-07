const submitForm = document.querySelector(".program-submit");
const titleInput = document.querySelector(".program-title");
const priceInput = document.querySelector(".program-price");
const imageInput = document.querySelector(".program-image");
const descriptionInput = document.querySelector(".program-description");
const cardsParent = document.querySelector(".cards-parent");
const formImage = document.querySelector(".form-image");
const resetBtn = document.querySelector(".reset-btn");
const { name, userImage, token } = userData;
const adminName = document.querySelector(".icons h5");
const adminImage = document.querySelector(".icons img");
adminName.textContent = name;
adminImage.src = `https://charity-house.zezogomaa.repl.co/${userImage}`;

resetBtn.addEventListener("click", (ev) => {
  mode = "add";
  titleInput.value = "";
  priceInput.value = "";
  imageInput.files[0] = "";
  descriptionInput.value = "";
  document.querySelector(".hidden_id").value = "";
  document.querySelector(".hidden_path").value = "";
});

let mode = "add";
fetch("https://charity-house.zezogomaa.repl.co/programs")
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    data.programs.forEach((el) => {
      cardsParent.innerHTML += ` <div class="col-md-6">
                <div class="program-card d-flex flex-column">
                  <h2 class="">${el.title}</h2>
                  <p class="">${el.description}</p>
                  <p>${el.price}</p>
                  <img src="https://charity-house.zezogomaa.repl.co/${el.imgPath}" alt="not Available" />
                  <div class="buttons">
                    <input
                      type="button"
                      value="Delete"
                      class="btn btn-danger delete-btn"
                      onclick = "deleteHandler(${el.id})"
                    />
                    
                    <a href = "#programs-form"><input
                      type="button"
                      value="Edit"
                      class="btn btn-primary"
                      onclick = "editHandler(${el.id})"
                    /></a>
                  </div>
                </div>
              </div>`;
    });
  })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

function deleteHandler(id) {
  swal({
    title: "Are you sure you want to delete this Program !!.",
    buttons: {
      confirm: {
        text: "Confirm",
        value: true,
        visible: true,
        className: "btn-success",
      },
      cancel: {
        text: "Cancel",
        value: false,
        visible: true,
        className: "btn-danger",
      },
    },
  }).then(async (isConfirmed) => {
    if (isConfirmed) {
      fetch(`https://charity-house.zezogomaa.repl.co/delete-program/${id}`, {
        method: "DELETE",
        headers: {
          Authorized: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

function editHandler(prod_id) {
  mode = "edit";
  fetch(`https://charity-house.zezogomaa.repl.co/edit-program/${prod_id}`, {
    headers: {
      Authorized: `Bearer ${token}`,
    },
  })
    .then((program) => {
      return program.json();
    })
    .then((programData) => {
      titleInput.value = programData.program[0].title;
      priceInput.value = programData.program[0].price;
      descriptionInput.value = programData.program[0].description;
      document.querySelector(".hidden-path").value =
        programData.program[0].imgPath;
      formImage.src = `https://charity-house.zezogomaa.repl.co/${programData.program[0].imgPath}`;
      document.querySelector(".hidden_id").value = programData.program[0]._id;
    });
}

submitForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = new FormData();
  formData.append("title", titleInput.value);
  formData.append("price", priceInput.value);
  if (imageInput.files[0]) {
    formData.append("image", imageInput.files[0]);
  } else {
    formData.append("image", document.querySelector(".hidden-path").value);
  }
  formData.append("description", descriptionInput.value);
  if (mode == "add") {
    fetch("https://charity-house.zezogomaa.repl.co/add-program", {
      method: "POST",
      body: formData,
      headers: {
        Authorized: `Bearer ${token}`,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (mode == "edit") {
    const program_id = document.querySelector(".hidden_id").value;
    fetch(
      `https://charity-house.zezogomaa.repl.co/edit-program/${program_id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorized: `Bearer ${token}`,
        },
      }
    )
      .then((result) => {
        console.log(result);
      })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

document.querySelector(".sign-out").addEventListener("click", () => {
  window.localStorage.removeItem("loginUserToken");
  window.location.href = "../Auth/Form.html";
});
