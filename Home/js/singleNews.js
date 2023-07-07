let currentUrl = new URL(window.location.href);
let eventId = currentUrl.searchParams.get("target");
const singleEventEndPoint = `https://charity-house.zezogomaa.repl.co/get-edit-news/${eventId}`;

const eventImage = document.querySelector(".event-image");
const eventTitle = document.querySelector(".event-title");
const eventDescription = document.querySelector(".event-description");

console.log(eventImage);
console.log(eventTitle);
console.log(eventDescription);

console.log(eventId);

const apiHandler = async (apiData) => {
  const apiResponse = await fetch(apiData.target);
  const result = await apiResponse.json();

  return result;
};

async function App() {
  const { news } = await apiHandler({
    target: singleEventEndPoint,
  });
  const { imgPath, title, description } = news;

  eventImage.src = `https://charity-house.zezogomaa.repl.co/${imgPath}`;
  eventTitle.textContent = title;
  eventDescription.textContent = description;
}

App();
