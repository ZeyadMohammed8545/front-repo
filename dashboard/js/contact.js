const contactContainer = document.querySelector(".contact-container");

const DateHandler = (dateStr) => {
  const date = new Date(dateStr);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let Year = date.getFullYear();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${day}-${month}-${Year}`;
};

fetch("http://localhost:4000/contacts")
  .then((contacts) => {
    return contacts.json();
  })
  .then((data) => {
    if (data.Requests) {
      if (data.Requests.length > 0) {
        data.Requests.forEach((request) => {
          contactContainer.innerHTML += ` <div class="contact-request">
                    <div class="picture-holder">
                        <img src="./imgs/avatar.png" alt="Not Available">
                        <h2 class = "user-name">${request.firstName} ${
            request.lastName
          }</h2>
                    </div>
                    <div class="info-container">
                        <div class="general-info part">
                            <h3>Name: <span>${request.firstName} ${
            request.lastName
          }</span></h3>
                            <h3>Email: <span>${request.email}</span></h3>
                            <h3>Phone: <span>${request.phone}</span></h3>
                        </div>
                        <div class="request-info part">
                            <h3>Address: <span>${request.address}</span></h3>
                            <h3>Message: <span>${request.message}</span></h3>
                            <h3>Date: <span>${DateHandler(
                              request.date
                            )}</span></h3>
                        </div>
                        <div class="message-info part">
                            <h4>Message: <span>${request.message}</span></h3>
                            <!-- </div>      -->
                       </div>
                       <div class="btn-holder">
                        <button onclick = "deleteClickHandler(${
                          request.id
                        })">DELETE</button>
                       </div>
                    </div>
               </div>`;
        });
      } else {
        contactContainer.innerHTML = `<p class = "err-txt">No Contacts Found</p>`;
      }
    } else {
      contactContainer.innerHTML = `<p class = "err-txt">${data.message}</p>`;
    }
  })
  .catch((err) => {
    console.log(err);
  });

const deleteClickHandler = async (id) => {
  const response = await fetch(`http://localhost:4000/delete-contact/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  location.reload();
};
