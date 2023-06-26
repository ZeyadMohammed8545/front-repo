const userData = JSON.parse(window.localStorage.getItem("loginUserToken"));
if (userData) {
  const verifyEndpoint = "http://localhost:4000/verify-user";
  const { token } = userData;
  fetch(verifyEndpoint, {
    method: "GET",
    headers: {
      Authorized: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status !== 200 && response.status !== 201) {
      window.location.href = "../Auth/Form.html";
    }
  });
} else {
  window.location.href = "../Auth/Form.html";
}
