const resetEmail = document.querySelector(".reset-email");
const resetSubmit = document.querySelector(".serach-submit");
const serachStatus = document.querySelector(".feed-status");



resetSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const formData = new FormData();
  formData.append("searchEmail", resetEmail.value);

  const response = await fetch("http://localhost:4000/post-search", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  if (response.status === 200 || response.status === 201) {
    serachStatus.classList.remove("err");
    serachStatus.classList.add("success");
    serachStatus.textContent = result.message;
  } else {
    serachStatus.classList.remove("success");
    serachStatus.classList.add("err");
    serachStatus.textContent = result.message;
  }
  console.log(result);
});
