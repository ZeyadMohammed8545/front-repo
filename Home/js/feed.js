const feedFirst = document.querySelector(".feed-first-name");
const feedLast = document.querySelector(".feed-last-name");
const feedEmail = document.querySelector(".feed-email");
const feedSubject = document.querySelector(".feed-subject");
const feedMessage = document.querySelector(".feed-message");
const feedSubmit = document.querySelector(".feed-submit");
const requestStatus = document.querySelector(".request-status");

console.log(feedFirst);
console.log(feedLast);
console.log(feedEmail);
console.log(feedSubject);
console.log(feedMessage);
console.log(feedSubmit);
console.log(requestStatus);

const clearInput = () => {
  feedFirst.value = "";
  feedLast.value = "";
  feedEmail.value = "";
  feedSubject.value = "";
  feedMessage.value = "";
};

// console.log(feedFirst);
// console.log(feedLast);

feedSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  console.log(feedFirst.value);

  const formData = new FormData();
  formData.append("firstName", feedFirst.value);
  formData.append("lastName", feedLast.value);
  formData.append("email", feedEmail.value);
  formData.append("subject", feedSubject.value);
  formData.append("message", feedMessage.value);

  const response = await fetch("http://localhost:4000/add-feed", {
    method: "POST",
    body: formData,
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
