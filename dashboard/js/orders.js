const totalOrdersElement = document.querySelector(".statistic-info.total");
const deliveredOrdersElement = document.querySelector(
  ".statistic-info.delivered"
);
const pendingOrdersElement = document.querySelector(".statistic-info.pending");
const tableBody = document.querySelector(".table-body");
const adminName = document.querySelector(".admin-name");
const adminImage = document.querySelector(".admin-image");
const signOutBtn = document.querySelector(".sign-out");

const parseUserData = () => {
  const userData = JSON.parse(window.localStorage.getItem("loginUserToken"));
  return userData;
};

const apiHandler = async (options) => {
  const apiResponse = await fetch(options.destination, {
    method: options.method || "GET",
    body: options.body || null,
    headers: options.headers || {},
  });

  const received = await apiResponse.json();
  return received;
};

const writeStatistics = async () => {
  const ordersStatistics = await apiHandler({
    destination: "http://localhost:4000/orders-statistics",
  });
  const { totalOrders, pendingOrders, deliveredOrders } = ordersStatistics;
  totalOrdersElement.textContent = totalOrders;
  pendingOrdersElement.textContent = pendingOrders;
  deliveredOrdersElement.textContent = deliveredOrders;
};

const markDownHandler = async (orderId, token) => {
  console.log(orderId);
  console.log(token);
};

const writeOrders = async (token) => {
  const ordersData = await apiHandler({
    destination: "http://localhost:4000/all-orders",
    headers: {
      Authorized: `Bearer ${token}`,
    },
  });
  const { orders } = ordersData;
  console.log(orders);
  tableBody.innerHTML = "";
  orders.forEach((order, ind) => {
    tableBody.innerHTML += ` 
    <tr>
        <th scope="row">${ind + 1}</th>
        <td>${order.transactionId}</td>
        <td>${order.price}</td>
        <td>${order.orderId}</td>
        <td>${order.user.name}</td>
        <td>${order.program.title}</td>
        <td class=actions-cell>
            <button type="button" class="btn btn-success" onclick = "markDownHandler('${encodeURIComponent(
              order._id
            )}', '${encodeURIComponent(token)}')">Mark as done</button>
            <a href = "./order.html?orderId=${
              order._id
            }" class="btn btn-primary">Discover<a/>
        </td>
    </tr>`;
  });
};

const signOutHandler = () => {
  window.localStorage.removeItem("loginUserToken");
  window.location.href = "../Auth/Form.html";
};

const loginInfoHandler = (userData) => {
  adminName.textContent = userData.name;
  adminImage.src = `http://localhost:4000/${userData.userImage}`;
  signOutBtn.addEventListener("click", signOutHandler);
};

async function App() {
  const userData = parseUserData();
  loginInfoHandler(userData);
  writeStatistics();
  writeOrders(userData.token);
}

App();
