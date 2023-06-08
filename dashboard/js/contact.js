const contactContainer = document.querySelector(".contact-container");

const { name, userImage } = userData;
const adminName = document.querySelector(".icons h5");
const adminImage = document.querySelector(".icons img");
adminName.textContent = name;
adminImage.src = `http://localhost:4000/${userImage}`;

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

fetch("http://localhost:4000/contacts")
  .then((contacts) => {
    return contacts.json();
  })
  .then((data) => {
    if (data.Requests) {
      if (data.Requests.length > 0) {
        console.log(data.Requests);
        data.Requests.forEach((request) => {
          contactContainer.innerHTML += `<div class="feed-card overview bg-white rad-10 d-flex align-center">
          <div class="avatar-box txt-c p-20">
            <img class="rad-half mb-10" src="imgs/avatar.png" alt="" />
            <h3 class="m-0">${request.firstName} ${request.lastName}</h3>
            <p class="c-grey mt-10">${request.email}</p>
          </div>
          <div class="info-box w-full txt-c-mobile">
            <!-- Start Information Row -->
            <div class="box p-20 d-flex align-center">
              <h4 class="c-grey fs-15 m-0 w-full">General Information</h4>
              <div class="fs-14">
                <span class="c-grey">First Name</span>
                <span>${request.firstName}</span>
              </div>
              <div class="fs-14">
                <span class="c-grey">Last Name</span>
                <span>${request.lastName}</span>
              </div>
            </div>
            <!-- End Information Row -->
            <!-- Start Information Row -->
            <div class="box p-20 d-flex align-center">
              <h4 class="c-grey w-full fs-15 m-0">Personal Information</h4>
              <div class="fs-14">
                <span class="c-grey">Email: ${request.email}</span>
                <span>o@nn.sa</span>
              </div>
              <div class="fs-14">
                <span class="c-grey">Post Date</span>
                <span>Date: ${DateHandler(request.date)}</span>
              </div>
            </div>
            <!-- End Information Row -->

            <!-- Start Information Row -->
            <div class="box p-20 d-flex align-center">
              <h4 class="c-grey w-full fs-15 m-2">Message</h4>
              <h5>${request.message}</h5>
              <div class="btn-holder"><button class="delete-btn" onclick = "deleteClickHandler(${
                request.id
              })">Delete</button></div>
            </div>
            <!-- End Information Row -->
          </div>
        </div>`;
        });
      } else {
        contactContainer.innerHTML = `<p class = "err-txt">No Contacts Found</p>`;
      }
    } else {
      contactContainer.innerHTML = `<p class = "err-txt">${data.message}</p>`;
    }
  })
  .catch((err) => {
    console.log(err);
  });

const deleteClickHandler = async (id) => {
  const response = await fetch(`http://localhost:4000/delete-contact/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  location.reload();
};

document.querySelector(".sign-out").addEventListener("click", () => {
  window.localStorage.removeItem("loginUserToken");
  window.location.href = "../Auth/Form.html";
});
