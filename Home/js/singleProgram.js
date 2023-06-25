console.log("start");
const currentUrl = new URL(window.location.href);
const programId = currentUrl.searchParams.get("target");
const singleProgramEndpoint = `http://localhost:4000/edit-program/${programId}`;
const authLink = "https://accept.paymob.com/api/auth/tokens";
const apiKey =
  "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T0RFeE1qUTJMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuaTA0SG1QTExHT20zeXdGOFVBR19Fc0MxY1B2OTBzcEE3em04cFREMEJTNFdaVXZZWnJ3UngtWHBUcmlPazBMVjdLNFdqeHY2VjdaN3Q1X0pUTzR1QkE=";
const orderRegesterationLink = "https://accept.paymob.com/api/ecommerce/orders";
const paymentKeyLink = "https://accept.paymob.com/api/acceptance/payment_keys";

const verifyLoggedEndPoint = "http://localhost:4000/verify-user";

const programImage = document.querySelector(".event-image");
const programTitle = document.querySelector(".event-title");
const programDescription = document.querySelector(".event-description");
const programPrice = document.querySelector(".event-price");
const programBtn = document.querySelector(".donate-btn");

const apiHandler = async (requestData) => {
  const { apiLink, apiMethod, apiHeaders, apiBody, verificationToken } =
    requestData;
  const apiResponse = await fetch(apiLink, {
    method: apiMethod || "GET",
    body: JSON.stringify(apiBody) || null,
    headers: apiHeaders || {},
  });
  const data = await apiResponse.json();
  return data;
};

async function App() {
  const userData = JSON.parse(window.localStorage.getItem("loginUserToken"));
  console.log(userData);
  const programData = await apiHandler({ apiLink: singleProgramEndpoint });
  const { program } = programData;
  const { imgPath, title, price, description } = program;
  console.log("the Program Id is ==>>  " + programId);
  window.localStorage.setItem("program_id", programId);

  programImage.src = `http://localhost:4000/${imgPath}`;
  programTitle.textContent = title;
  programDescription.textContent = description;
  programPrice.textContent = ` السعر: ${price}.EGP`;
  programBtn.addEventListener("click", async (ev) => {
    //check Logged
    if (userData !== undefined && userData !== null && userData !== "") {
      const { token: verificationToken } = userData;
      const response = await apiHandler({
        apiLink: verifyLoggedEndPoint,
        apiMethod: "GET",
        apiHeaders: {
          Authorized: `Bearer ${verificationToken}`,
        },
      });

      if (response.status === true) {
        const { token } = await apiHandler({
          apiLink: authLink,
          apiMethod: "POST",
          apiHeaders: { "Content-Type": "application/json" },
          apiBody: { api_key: apiKey },
        });
        console.log(token);
        const { id } = await apiHandler({
          apiLink: orderRegesterationLink,
          apiMethod: "POST",
          apiHeaders: { "Content-Type": "application/json" },
          apiBody: {
            auth_token: token,
            delivery_needed: false,
            amount_cents: price * 100,
            currency: "EGP",
            item: programData,
          },
        });
        console.log(id);
        const { token: lastKey } = await apiHandler({
          apiLink: paymentKeyLink,
          apiMethod: "POST",
          apiHeaders: { "Content-Type": "application/json" },
          apiBody: {
            auth_token: token,
            amount_cents: price * 100,
            expiration: 3600,
            order_id: id,
            billing_data: {
              email: "claudette09@exa.com",
              first_name: "Clifford",
              phone_number: "+86(8)9135210487",
              country: "Egypt",
              last_name: "Nicolas",
              street: "testStreet",
              building: "test Building",
              floor: "test Floor",
              apartment: "test Apartment",
              city: "test City",
            },
            currency: "EGP",
            integration_id: 3876616,
          },
        });
        window.location.href = `https://accept.paymob.com/api/acceptance/iframes/764189?payment_token=${lastKey}`;
      } else {
        window.location.href = "../Auth/Form.html";
      }
    } else {
      window.location.href = "../Auth/Form.html";
    }
  });
}

App();
