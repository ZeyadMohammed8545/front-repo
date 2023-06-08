console.log("news Page Started");
const newsEndpoint = "http://localhost:4000/news";
const newsContainer = document.querySelector(".news-container");

const apiHandler = async (apiData) => {
  const apiResponse = await fetch(apiData.target);
  const result = await apiResponse.json();

  return result;
};

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

async function App() {
  const { news } = await apiHandler({ target: newsEndpoint });
  console.log(news);
  news.forEach((item) => {
    newsContainer.innerHTML += `  <div class="single-blog-item" data-aos="fade-up" data-aos-duration="1000">
        <div class="row align-items-center">
            <div class="col-lg-7">
                <div class="single-blog-info mb-4 mb-lg-0">
                    <h2 class="fw-bold fs-5">${item.title}</h2>
                    <span class="data-info">${DateHandler(item.date)}</span>
                    <p class="text-black">${item.description.slice(
                      0,
                      150
                    )}...</p>
                    <a class="blog-readmore-btn" href="./singlenews.html?target=${
                      item.id
                    }">
                        قراءة المزيد
                        <i class="fa fa-long-arrow-right"></i>
                    </a>
                </div>
            </div>
            <div class="col-lg-5">
                <img src="http://localhost:4000/${
                  item.imgPath
                }" alt="single-blog" class="w-100">
            </div>
        </div>
    </div>`;
  });
}

App();
