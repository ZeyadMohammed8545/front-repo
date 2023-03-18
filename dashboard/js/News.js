// import { DateHandler } from "./helper.js";

const newsTitleInput = document.querySelector(".news-title");
const newsDescriptionInput = document.querySelector(".news-description");
const newsImageInput = document.querySelector(".news-image");
const newsFormSubmit = document.querySelector(".news-form-submit");
const newsFormReset = document.querySelector(".news-form-reset");
const newsContainer = document.querySelector(".news-container");
const formImage = document.querySelector(".form-img");
let mode = "add";
let NewsId;

const clearInput = () => {
  newsTitleInput.value = "";
  newsDescriptionInput.value = "";
  newsImageInput.value = "";
  formImage.src = "imgs/activity-01.png";
};

newsFormReset.addEventListener("click", (ev) => {
  ev.preventDefault();
  mode = "add";
  clearInput();
});

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

fetch("http://localhost:4000/news")
  .then((news) => {
    return news.json();
  })
  .then((data) => {
    data.news.forEach((el) => {
      newsContainer.innerHTML += `  <div class="col-12 mb-4">
              <div class="card d-flex flex-row">
                <img
                  class="card-img-top"
                  src="http://localhost:4000/${el.imgPath}"
                  style="width: 250px"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title mt-4 mb-4">
                    Title:-
                    <span class="text-secondary h5">
                        ${el.title}  
                    </span
                    >
                  </h5>
                  <hr />
                  <h5 class="card-title mt-4 mb-4">
                    description:-
                    <span class="text-secondary h5">${el.description}</span
                    >
                  </h5>
                  <hr />
                  <h5 class="card-title mt-4 mb-4">
                    Date:- <span class="text-secondary h5">${DateHandler(
                      el.date
                    )}</span>
                  </h5>
                  <hr />

                  <button class="btn btn-danger" onclick = "newsDeleteHandler(${
                    el.id
                  })">Delete</button>
                 <a href = "#connect-form"> <button class="btn btn-primary" onclick = "newsEditHandler(${
                   el.id
                 })">Edit</button></a>
                </div>
              </div>
            </div>`;
    });
  });

const newsDeleteHandler = async (id) => {
  const response = await fetch(`http://localhost:4000/delete-news/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  location.reload();
};

const newsEditHandler = async (id) => {
  mode = "edit";
  const response = await fetch(`http://localhost:4000/get-edit-news/${id}`);
  const result = await response.json();
  newsTitleInput.value = result.news.title;
  newsDescriptionInput.value = result.news.title;
  formImage.src = `http://localhost:4000/${result.news.imgPath}`;
  NewsId = result.news._id;
};

newsFormSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const formData = new FormData();
  formData.append("title", newsTitleInput.value);
  formData.append("description", newsDescriptionInput.value);
  formData.append("image", newsImageInput.files[0]);

  if (mode == "add") {
    const response = await fetch("http://localhost:4000/add-news", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    clearInput();
    location.reload();
  } else {
    const response = await fetch(
      `http://localhost:4000/post-news-edit/${NewsId}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    const result = await response.json();
    clearInput();
    location.reload();
  }
});
