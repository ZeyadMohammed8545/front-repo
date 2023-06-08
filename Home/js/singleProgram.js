console.log("start");

const currentUrl = new URL(window.location.href);
const programId = currentUrl.searchParams.get("target");

const singleProgramEndpoint = `http://localhost:4000/edit-program/${programId}`;

const programImage = document.querySelector(".event-image");
const programTitle = document.querySelector(".event-title");
const programDescription = document.querySelector(".event-description");
const programPrice = document.querySelector(".event-price");

const apiHandler = async (apiData) => {
  const apiResponse = await fetch(apiData.target);
  const result = await apiResponse.json();

  return result;
};

async function App() {
  const programData = await apiHandler({ target: singleProgramEndpoint });
  const { program } = programData;
  const { imgPath, title, price, description } = program;

  programImage.src = `http://localhost:4000/${imgPath}`;
  programTitle.textContent = title;
  programDescription.textContent = description;
  programPrice.textContent = ` السعر: ${price}.EGP`;

  console.log(imgPath);
  console.log(title);
  console.log(price);
  console.log(description);

  console.log(programData);
}

App();
