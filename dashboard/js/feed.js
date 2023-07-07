const feedContainer = document.querySelector(".feeds-container");

const { name, userImage, token } = userData;
const adminName = document.querySelector(".icons h5");
const adminImage = document.querySelector(".icons img");
adminName.textContent = name;
adminImage.src = `https://charity-house.zezogomaa.repl.co/${userImage}`;

const DateHandler = (dateStr) => {
  const date = new Date(dateStr);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let Year = date.getFullYear();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${day}-${month}-${Year}`;
};

fetch("https://charity-house.zezogomaa.repl.co/feed", {
  headers: {
    Authorized: `Bearer ${token}`,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((feeds) => {
    feeds.feeds.forEach((el) => {
      feedContainer.innerHTML += ` <div class="feed-card overview bg-white rad-10 d-flex align-center">
        <div class="avatar-box txt-c p-20">
          <img class="rad-half mb-10" src="imgs/avatar.png" alt="" />
          <h3 class="m-0">${el.user.name} </h3>
          <p class="c-grey mt-10">${el.user.email}</p>
        </div>
        <div class="info-box w-full txt-c-mobile">
          <!-- Start Information Row -->
          <div class="box p-20 d-flex align-center">
            <h4 class="c-grey fs-15 m-0 w-full">General Information</h4>
            <div class="fs-14">
              <span class="c-grey">Full Name</span>
              <span> ${el.user.name}</span>
            </div>
            <div class="fs-14">
              <span class="c-grey">Subject</span>
              <span>${el.subject}</span>
            </div>
          </div>
          <!-- End Information Row -->
          <!-- Start Information Row -->
          <div class="box p-20 d-flex align-center">
            <h4 class="c-grey w-full fs-15 m-0">Personal Information</h4>
            <div class="fs-14">
              <span class="c-grey">Email:</span>
              <span>${el.user.email}</span>
            </div>
            <div class="fs-14">
              <span class="c-grey">Post Date</span>
              <span>${DateHandler(el.id)}</span>
            </div>
          </div>
          <!-- End Information Row -->

          <!-- Start Information Row -->
          <div class="box p-20 d-flex align-center">
            <h4 class="c-grey w-full fs-15 m-2">Feedback</h4>
            <h5>${el.message}</h5>
            <div class="btn-holder"><button class = "delete-btn" onclick ="deleteClickHandler(${
              el.id
            })" >Delete</button></div>
          </div>
          <!-- End Information Row -->
        </div>
      </div>`;
    });
  })
  .catch((err) => {
    console.log(err);
  });

const deleteClickHandler = async (id) => {
  //   console.log(id);
  swal({
    title: "Are you sure you want to delete this Item !!.",
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
      const result = await fetch(
        `https://charity-house.zezogomaa.repl.co/delete-feed/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorized: `Bearer ${token}`,
          },
        }
      );
      const response = await result.json();
      location.reload();
    }
  });
};

document.querySelector(".sign-out").addEventListener("click", () => {
  window.localStorage.removeItem("loginUserToken");
  window.location.href = "../Auth/Form.html";
});
