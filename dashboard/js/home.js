const programsCount = document.querySelector(".programs-count");
const usersCount = document.querySelector(".users-count");
const newsCount = document.querySelector(".news-count");
const feedsCount = document.querySelector(".feeds-count");
const contactsCount = document.querySelector(".contacts-count");
const ordersCount = document.querySelector(".orders-count");
const pendingCount = document.querySelector(".pending-count");
const deliveredCount = document.querySelector(".delivered-count");
const ordersTable = document.querySelector(".table-container tbody");
const usersTable = document.querySelector(".last-users-container tbody");

const { name, userImage, token } = userData;

console.log(programsCount);
console.log(usersCount);
console.log(newsCount);
console.log(feedsCount);
console.log(contactsCount);

fetch("https://charity-house.zezogomaa.repl.co/statistics", {
  headers: {
    Authorized: `Bearer ${token}`,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((finalResult) => {
    console.log(finalResult);
    const {
      NewsCount,
      ContactCount,
      FeedCount,
      ProgramCount,
      UserCount,
      OrderCount,
      PendingOrders,
      DeliveredOrders,
    } = finalResult;
    programsCount.textContent = `Programs Count : ${ProgramCount}`;
    usersCount.textContent = `Users Count : ${UserCount}`;
    newsCount.textContent = `News Count : ${NewsCount}`;
    contactsCount.textContent = `Contacts Counts : ${ContactCount}`;
    feedsCount.textContent = `Feeds Count : ${FeedCount}`;
    ordersCount.textContent = `Orders Count : ${OrderCount}`;
    pendingCount.textContent = `Pending Count : ${PendingOrders}`;
    deliveredCount.textContent = `Delivered Count : ${DeliveredOrders}`;
  });

fetch("http://localhost:4000/last-orders", {
  method: "GET",
  headers: {
    Authorized: `Bearer ${token}`,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.orders.forEach((order, ind) => {
      ordersTable.innerHTML += ` 
      <tr>
          <th scope="row">${ind + 1}</th>
          <td class = "status-cell-${ind}">${order.status}</td>
          <td>${order.transactionId}</td>
          <td>${order.price}</td>
          <td>${order.orderId}</td>
          <td>${order.user.name}</td>
          <td>${order.program.title}</td>
          <td class=actions-cell>
              <a href = "./order.html?orderId=${
                order._id
              }" class="btn btn-primary">Discover<a/>
          </td>
      </tr>
      `;
    });
    ordersTable.innerHTML += `<tr>
    <td colspan = 8>
      <a href = "./orders.html" class="btn btn-danger">View All Orders<a/>
    </td>
  </tr>`;
  });

fetch("http://localhost:4000/last-users", {
  method: "GET",
  headers: {
    Authorized: `Bearer ${token}`,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.users.forEach((user, ind) => {
      usersTable.innerHTML += ` <tr>
      <th scope="row">${ind + 1}</th>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.address}</td>
  </tr>`;
    });
    usersTable.innerHTML += `<tr>
    <td colspan = 5>
      <a href = "./users.html" class="btn btn-danger">View All Users<a/>
    </td>
  </tr>`;
  });

const adminName = document.querySelector(".icons h5");
const adminImage = document.querySelector(".icons img");
adminName.textContent = name;
adminImage.src = `https://charity-house.zezogomaa.repl.co/${userImage}`;

document.querySelector(".sign-out").addEventListener("click", () => {
  window.localStorage.removeItem("loginUserToken");
  window.location.href = "../Auth/Form.html";
});
