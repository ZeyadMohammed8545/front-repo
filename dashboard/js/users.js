const usersContainer = document.querySelector(".users-container");
console.log(usersContainer);
fetch("http://localhost:4000/get-users")
  .then((users) => {
    return users.json();
  })
  .then((data) => {
    // console.log(data.users);
    data.users.forEach((user) => {
      usersContainer.innerHTML += ` <div class="overview bg-white rad-10 d-flex align-center user-card">
            <div class="avatar-box txt-c p-20">
              <img class="rad-half mb-10" src="${
                user.imgPath
                  ? `http://localhost:4000/${user.imgPath}`
                  : "imgs/avatar.png"
              }" alt="" />
              <h3 class="m-0">${user.name}</h3>
              <p class="c-grey mt-10">${user.email}</p>
            </div>
            <div class="info-box w-full txt-c-mobile">
              <!-- Start Information Row -->
              <div class="box p-20 d-flex align-center">
                <h4 class="c-grey fs-15 m-0 w-full">General Information</h4>
                <div class="fs-14">
                  <span class="c-grey">Full Name</span>
                  <span>${user.name}</span>
                </div>
                <div class="fs-14">
                  <span class="c-grey">Country:</span>
                  <span>Egypt</span>
                </div>
              </div>
              <!-- End Information Row -->
              <!-- Start Information Row -->
              <div class="box p-20 d-flex align-center">
                <h4 class="c-grey w-full fs-15 m-0">Personal Information</h4>
                <div class="fs-14">
                  <span class="c-grey">Email:</span>
                  <span>${user.email}</span>
                </div>
                <div class="fs-14">
                  <span class="c-grey">Phone:</span>
                  <span>${user.phone}</span>
                </div>
                <div class="fs-14">
                  <span class="c-grey">Date Of Birth:</span>
                  <span>25/10/1982</span>
                </div>
              </div>
              <!-- End Information Row -->

              <!-- Start Information Row -->
              <div class="buttonsUsers p-20 d-flex align-center">
                <input type="button" value="Delete" class="btn btn-primary" onclick = "userDeleteHandler(${
                  user.id
                })"/>
              </div>
              <!-- End Information Row -->
            </div>
          </div>`;
    });
  });

const userDeleteHandler = async (id) => {
  //   console.log(id);
  const response = await fetch(
    `http://localhost:4000/delete-user/${id}`,
    {
      method: "DELETE",
    }
  );
  const result = await response.json();
  location.reload();
  console.log(result);
};
