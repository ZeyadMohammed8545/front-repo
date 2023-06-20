const newsContainer = document.querySelector(".news-container");
const programsContainer = document.querySelector(".programs-container");

const newsEndPoint = "http://localhost:4000/news";
const programsEndPoint = "http://localhost:4000/programs";

// console.log(newsContainer);
// console.log(programsContainer);

const apiHandler = async (apiData) => {
  const apiResponse = await fetch(apiData.target);
  const result = await apiResponse.json();
  console.log(result);
  return result;
};

const app = async function () {
  const { news } = await apiHandler({ target: newsEndPoint });
  const { programs } = await apiHandler({ target: programsEndPoint });

  for (let i = 0; i < 3; i++) {
    newsContainer.innerHTML += ` <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-duration="1000">
    <div class="card">
      <img src="http://localhost:4000/${
        news[i].imgPath
      }" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${news[i].title}</h5>
        <p class="card-text">${news[i].description.slice(0, 200)}...</p>
      </div>
      <a href = "./singlenews.html?target=${
        news[i].id
      }" class = "btn btn-primary">عرض المزيد</a>
    </div>
  </div>`;

    programsContainer.innerHTML += `  <div class="col-12 col-md-6 col-lg-4" data-aos="fade-down">
  <div class="card">
    <img src="http://localhost:4000/${
      programs[i].imgPath
    }" class="card-img-top w-100" alt="...">
    <div class="card-body">
      <h5 class="card-title mt-3 mb-3">${programs[i].title}</h5>
      <p class="card-text">${programs[i].description.slice(0, 200)}</p>
      <p class="card-text">السعر:  ${programs[i].price}</p>
    </div>
    <a href = "./singleProgram.html?target=${
      programs[i].id
    }" class = "btn btn-danger">عرض المزيد</a>
  </div>
</div>`;
  }

  newsContainer.innerHTML += `<div class="col-12 d-flex justify-between">
  <a href="./News.html" class="btn btn-danger more-news w-25 ">ألمزيد من الاخبار</a>
</div>
`;

  programsContainer.innerHTML += `<div class="programs-page-btn">
  <a href="./service.html" class="btn btn-primary w-25">المزيد من ألبرامج</a>
</div>`;
};

app();
