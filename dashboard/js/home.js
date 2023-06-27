const programsCount = document.querySelector(".programs-count");
const usersCount = document.querySelector(".users-count");
const newsCount = document.querySelector(".news-count");
const feedsCount = document.querySelector(".feeds-count");
const contactsCount = document.querySelector(".contacts-count");

const { name, userImage, token } = userData;

console.log(programsCount);
console.log(usersCount);
console.log(newsCount);
console.log(feedsCount);
console.log(contactsCount);

fetch("http://localhost:4000/statistics", {
  headers: {
    Authorized: `Bearer ${token}`,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((finalResult) => {
    console.log(finalResult);
    const { NewsCount, ContactCount, FeedCount, ProgramCount, UserCount } =
      finalResult;
    programsCount.textContent = `Available Programs : ${ProgramCount}`;
    usersCount.textContent = `Available Programs : ${UserCount}`;
    newsCount.textContent = `Available Programs : ${NewsCount}`;
    contactsCount.textContent = `Available Programs : ${ContactCount}`;
    feedsCount.textContent = `Available Programs : ${FeedCount}`;
  });

const adminName = document.querySelector(".icons h5");
const adminImage = document.querySelector(".icons img");
adminName.textContent = name;
adminImage.src = `http://localhost:4000/${userImage}`;

document.querySelector(".sign-out").addEventListener("click", () => {
  window.localStorage.removeItem("loginUserToken");
  window.location.href = "../Auth/Form.html";
});
