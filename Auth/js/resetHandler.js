const resetBtn = document.querySelector(".reset-pass-submit");
const resetPassInput = document.querySelector(".resetPassword");

// console.log(resetBtn);
// console.log(resetPassInput);
// console.log(resetConfPassInput);

const curr = window.location.search;
const token = new URLSearchParams(curr).get("token");

resetBtn.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const formData = new FormData();
  formData.append("pass", resetPassInput.value);
  fetch(
    `https://Charity-House-Server.mohamed-abdelh2.repl.co/post-reset/${token}`,
    {
      method: "POST",
      body: formData,
    }
  );
});
