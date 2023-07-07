const totalOrdersElement = document.querySelector(".statistic-info.total");
const deliveredOrdersElement = document.querySelector(
  ".statistic-info.delivered"
);
const pendingOrdersElement = document.querySelector(".statistic-info.pending");
const tableBody = document.querySelector(".table-body");
const adminName = document.querySelector(".admin-name");
const adminImage = document.querySelector(".admin-image");
const signOutBtn = document.querySelector(".sign-out");
let markBtns;

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
    destination: "https://charity-house.zezogomaa.repl.co/orders-statistics",
  });
  const { totalOrders, pendingOrders, deliveredOrders } = ordersStatistics;
  totalOrdersElement.textContent = totalOrders;
  pendingOrdersElement.textContent = pendingOrders;
  deliveredOrdersElement.textContent = deliveredOrders;
};

const markDownHandler = async (orderId, token, ind) => {
  const isConfirmed = await swal({
    text: "Are you Sure you Want to Mark the Order As Done !",
    buttons: {
      confirm: {
        text: "confirm",
        visible: true,
        value: true,
      },
      cancel: {
        text: "Cancel",
        visible: true,
        value: false,
      },
    },
  });
  if (isConfirmed) {
    const markDownResponse = await apiHandler({
      destination: `https://charity-house.zezogomaa.repl.co/mark-done/${orderId}`,
      method: "PUT",
      headers: {
        Authorized: `Bearer ${token}`,
      },
    });

    console.log(markDownResponse);

    if (markDownResponse.success == true) {
      console.log("condition is true");
      document.querySelector(`.status-cell-${ind}`).textContent = "Delivered";
    }
  }
};

const writeOrders = async (token) => {
  const ordersData = await apiHandler({
    destination: "https://charity-house.zezogomaa.repl.co/all-orders",
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
        <td class = "status-cell-${ind}">${order.status}</td>
        <td>${order.transactionId}</td>
        <td>${order.price}</td>
        <td>${order.orderId}</td>
        <td>${order.user.name}</td>
        <td>${order.program.title}</td>
        <td class=actions-cell>
            <button type="button" class="btn btn-success mark-btn" onclick = "markDownHandler('${encodeURIComponent(order._id)}', '${encodeURIComponent(token)}', '${ind}')">Mark as done</button>
            <a href = "./order.html?orderId=${order._id}" class="btn btn-primary">Discover<a/>
        </td>
    </tr>`;
  });

  markBtns = document.querySelectorAll(".mark-btn");
};

const signOutHandler = () => {
  window.localStorage.removeItem("loginUserToken");
  window.location.href = "../Auth/Form.html";
};

const loginInfoHandler = (userData) => {
  adminName.textContent = userData.name;
  adminImage.src = `https://charity-house.zezogomaa.repl.co/${userData.userImage}`;
  signOutBtn.addEventListener("click", signOutHandler);
};

async function App() {
  const userData = parseUserData();
  loginInfoHandler(userData);
  await writeStatistics();
  await writeOrders(userData.token);
}

App();
