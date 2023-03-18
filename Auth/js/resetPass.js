const resetEmail = document.querySelector(".reset-email");
const resetSubmit = document.querySelector(".serach-submit");

// console.log(resetEmail);
// console.log(resetSubmit);

resetSubmit.addEventListener("click", async (ev) => {
  ev.preventDefault();
  const formData = new FormData();
  formData.append("searchEmail", resetEmail.value);

  const response = await fetch(
    "https://Charity-House-Server.mohamed-abdelh2.repl.co/post-search",
    {
      method: "POST",
      body: formData,
    }
  );
  const result = await response.json();
  console.log(result);
});
