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

fetch("https://charity-house.zezogomaa.repl.co/statistics", {
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
    programsCount.textContent = `Programs Count : ${ProgramCount}`;
    usersCount.textContent = `Users Count : ${UserCount}`;
    newsCount.textContent = `News Count : ${NewsCount}`;
    contactsCount.textContent = `Contacts Counts : ${ContactCount}`;
    feedsCount.textContent = `Feeds Count : ${FeedCount}`;
  });

const adminName = document.querySelector(".icons h5");
const adminImage = document.querySelector(".icons img");
adminName.textContent = name;
adminImage.src = `https://charity-house.zezogomaa.repl.co/${userImage}`;

document.querySelector(".sign-out").addEventListener("click", () => {
  window.localStorage.removeItem("loginUserToken");
  window.location.href = "../Auth/Form.html";
});
