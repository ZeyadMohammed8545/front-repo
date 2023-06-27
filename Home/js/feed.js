const feedSubject = document.querySelector(".feed-subject");
const feedMessage = document.querySelector(".feed-message");
const feedSubmit = document.querySelector(".feed-submit");
const requestStatus = document.querySelector(".request-status");

console.log(feedSubject);
console.log(feedMessage);
console.log(feedSubmit);
console.log(requestStatus);

const clearInput = () => {
  feedSubject.value = "";
  feedMessage.value = "";
};

feedSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const userData = JSON.parse(window.localStorage.getItem("loginUserToken"));
  const { token } = userData;

  const formData = new FormData();

  formData.append("subject", feedSubject.value);
  formData.append("message", feedMessage.value);

  const response = await fetch("http://localhost:4000/add-feed", {
    method: "POST",
    body: formData,
    headers: {
      Authorized: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (response.status === 200 || response.status === 201) {
    requestStatus.classList.remove("err");
    requestStatus.classList.add("success");
    requestStatus.textContent = result.message;
  } else {
    requestStatus.classList.remove("success");
    requestStatus.classList.add("err");
    requestStatus.textContent = result.message;
  }

  clearInput();
});
