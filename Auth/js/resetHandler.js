const resetBtn = document.querySelector(".reset-pass-submit");
const resetPassInput = document.querySelector(".resetPassword");
const feedStatus = document.querySelector(".feed-status");

// console.log(resetBtn);
// console.log(resetPassInput);
// console.log(resetConfPassInput);

const curr = window.location.search;
const token = new URLSearchParams(curr).get("token");

resetBtn.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const formData = new FormData();
  formData.append("pass", resetPassInput.value);
  const response = await fetch(`http://localhost:4000/post-reset/${token}`, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  console.log(response);
  console.log(result);

  if (response.status === 200 || response.status === 201) {
    feedStatus.classList.remove("err");
    feedStatus.classList.add("success");
    feedStatus.textContent = result.message;
  } else {
    feedStatus.classList.remove("success");
    feedStatus.classList.add("err");
    feedStatus.textContent = result.message;
  }
});
