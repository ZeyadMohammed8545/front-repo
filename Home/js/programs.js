console.log("start");
const programsContainer = document.querySelector(".programs-container");
const programsEndPoint = "https://charity-house.zezogomaa.repl.co/programs";

const apiHandler = async (apiData) => {
  const apiResponse = await fetch(apiData.target);
  const result = await apiResponse.json();
  return result;
};

async function App() {
  const { programs } = await apiHandler({ target: programsEndPoint });
  programs.forEach((program) => {
    programsContainer.innerHTML += ` <div class="col-12 mb-4 col-md-6 col-lg-4 data-aos="fade-up" data-aos-duration="1000">
        <div class="card">
          <img src="https://charity-house.zezogomaa.repl.co/${
            program.imgPath
          }" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${program.title}</h5>
            <p class="card-text">${program.description.slice(0, 120)}...</p>
            <p class="card-text">السعر :${program.price}.EGP</p>
          </div>
          <a href="./singleProgram.html?target=${
            program.id
          }" class="btn btn-primary">عرض المزيد</a>
        </div>
      </div>`;
  });

  console.log(programs);
}

App();
