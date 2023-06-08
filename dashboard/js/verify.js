const userData = JSON.parse(window.localStorage.getItem("loginUserToken"));
if (!userData) {
  window.location.href = "../Auth/Form.html";
} else {
  const { token } = userData;

  const AuthResponse = fetch("http://localhost:4000/verify-admin", {
    method: "GET",
    headers: {
      Authorized: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((finalRes) => {
      console.log(finalRes);
      const { success } = finalRes;
      if (!success) {
        window.location.href = "../Auth/Form.html";
      }
    });
}

