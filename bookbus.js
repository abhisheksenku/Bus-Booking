function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    name: event.target.name.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
    carnumber: event.target.carnumber.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/fa9f95f82c094fc187837b4ec7c55f6d/bookingdata",
      userDetails
    )
    .then((response) => displayUserOnScreen(response.data))
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("carnumber").value = "";
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.name} - ${userDetails.email} - ${userDetails.phone} -${userDetails.carnumber}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    const userId = userDetails._id; // Unique identifier for the user
    axios
      .delete(`https://crudcrud.com/api/fa9f95f82c094fc187837b4ec7c55f6d/bookingdata/${userId}`)
      .then(() => {
        userList.removeChild(userItem); // Remove the user from the screen
      })
      .catch((error) => console.error(error));
  });

  editBtn.addEventListener("click", function (event) {
    document.getElementById("name").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
    document.getElementById("carnumber").value = userDetails.carnumber;


    userList.removeChild(userItem);

    localStorage.removeItem(userDetails.email);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  axios
    .get("https://crudcrud.com/api/fa9f95f82c094fc187837b4ec7c55f6d/bookingdata")
    .then((response) => {
      const users = response.data;
      users.forEach((user) => displayUserOnScreen(user));
    })
    .catch((error) => console.error(error));
});

document.getElementById('filter').addEventListener('change', function() {
    const selectedBus = this.value;
    const lis = document.querySelectorAll('ul li');

    // Show or hide <li> elements based on the selected bus
    lis.forEach(li => {
        if (selectedBus === 'all' || li.classList.contains('bus-' + selectedBus)) {
            li.style.display = 'block';
        } else {
            li.style.display = 'none';
        }
    });
});