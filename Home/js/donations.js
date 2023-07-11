/*

*/

// check dom Elements

const apiHandler = async (options) => {
  const apiResponse = await fetch(options.destination, {
    method: options.method || "GET",
    body: options.parse ? JSON.stringify(options.body) : options.body || null,
    headers: options.headers || {},
  });

  const response = await apiResponse.json();
  return response;
};

const parseUserData = () => {
  const userData = JSON.parse(window.localStorage.getItem("loginUserToken"));
  return userData;
};

const writeData = (orders) => {
  if (orders.length == 0) {
    document.querySelector(".app-container").textContent =
      "لا يوجد اي تبرعات بعد!.";
  } else {
    orders.forEach((order) => {
      document.querySelector(
        ".app-container"
      ).innerHTML += `  <div class="donation-card">
        <div class="card-section order-info">
          <h3 class="section-heading">معلومات الطلب</h3>
          <p class="info-item order-status">الحالة:${order.status}</p>
          <p class="info-item order-transaction">رقم التحويل:${order.transactionId}</p>
          <p class="info-item order-order-id">رقم الطلب:${order.orderId}</p>
          <p class="info-item order-price">المبلغ المدفوع:${order.price}</p>
      </div>
      <div class="card-section user-info">
          <h3 class="section-heading">معلومات المستخدم</h3>
          <p class="info-item user-name">الاسم:${order.user.name}</p>
          <p class="info-item user-email">الايميل:${order.user.email}</p>
          <p class="info-item user-phone">الهاتف:${order.user.phone}</p>
          <p class="info-item user-address">العنوان:${order.user.address}</p>
      </div>
      <div class="card-section program-info">
          <h3 class="section-heading">معلومات البرنامج</h3>
          <p class="info-item program-name">الاسم:${order.program.title}</p>
          <p class="info-item program-price">السعر:${order.program.price}</p>
          <p class="info-item program-description">الوصف:${order.program.description}</p>
      </div>
      
    </div>`;
    });
  }
};

async function App() {
  const { token } = parseUserData();
  const userOrders = await apiHandler({
    destination: "https://charity-house.zezogomaa.repl.co/user-orders",
    method: "GET",
    headers: { Authorized: `Bearer ${token}` },
  });
  writeData(userOrders.orders);
}

App();
