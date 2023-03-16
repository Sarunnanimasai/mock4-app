function submitData() {
  const categories = document.getElementById("Category").value;
  const file = document.getElementById("file").value;
  const selectedValue = document.querySelector(
    'input[name="ac"]:checked'
  ).value;
  const bed = document.getElementById("bed").value;
  const adults = document.getElementById("adults").value;
  const max = document.getElementById("max_capacity").value;
  const cost = document.getElementById("cost").value;

  const adminData = {
    category: categories,
    file: file,
    type_of_room: selectedValue,
    bed: bed,
    adults: adults,
    max: max,
    cost: cost,
  };

  fetch("http://localhost:3004/admindata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(adminData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Data Added");
    })
    .catch((error) => console.error(error));
}

const table = document.getElementById("table");

async function appendTable() {
  const data = await fetch("http://localhost:3004/admindata")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  data.map((el) => {
    const tr = document.createElement("tr");
    const id = document.createElement("td");
    id.innerHTML = el.id;
    const Category = document.createElement("td");
    Category.innerHTML = el.category;
    const Type = document.createElement("td");
    Type.innerHTML = el.type_of_room;
    const bed = document.createElement("td");
    Type.innerHTML = el.bed;
    const adults = document.createElement("td");
    adults.innerHTML = el.adults;
    const max = document.createElement("td");
    max.innerHTML = el.max;
    const cost = document.createElement("td");
    cost.innerHTML = el.cost;
    const status = document.createElement("td");
    status.innerHTML = false;
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.setAttribute("id", "editBtn");
    editBtn.addEventListener("click", () => {
      onOpenModal(el);
    });
    const Delete = document.createElement("button");
    Delete.innerText = "Delete";
    Delete.addEventListener("click", () => {
      DeleteFunc(el);
    });
    tr.append(
      id,
      Category,
      Type,
      bed,
      adults,
      max,
      cost,
      status,
      editBtn,
      Delete
    );
    table.append(tr);
  });

  function onOpenModal(data) {
    console.log(data);
    let modal = document.querySelector(".modal");
    modal.innerHTML = "";
    let popModal = document.createElement("div");
    let popButton = document.createElement("button");
    popButton.innerText = "Close";
    popButton.addEventListener("click", () => {
      onCloseModal();
    });
    let category = document.createElement("input");
    category.value = data.category;
    let image_url = document.createElement("input");
    image_url.value = data.image_url;
    let type_of_room = document.createElement("input");
    type_of_room.value = data.type_of_room;
    let bed_type = document.createElement("input");
    bed_type.value = data.bed_type;
    let no_of_persons = document.createElement("input");
    no_of_persons.value = data.no_of_persons;
    let capacity = document.createElement("input");
    capacity.value = data.capacity;
    let cost = document.createElement("input");
    cost.value = data.cost;
    let Booked = document.createElement("input");
    Booked.value = data.booked;
    let submitEdit = document.createElement("button");
    submitEdit.innerText = "Close";
    submitEdit.addEventListener("click", () => {
      submitPatch();
    });

    popModal.append(
      popButton,
      category,
      image_url,
      type_of_room,
      bed_type,
      no_of_persons,
      capacity,
      cost,
      Booked,
      submitEdit
    );
    modal.append(popModal);
    modal.classList.add("db");
  }

  function onCloseModal() {
    let modal = document.querySelector(".modal");
    modal.classList.remove("db");
  }

  function DeleteFunc(el) {
    fetch(`http://localhost:3004/admindata/${el.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Data Deleted");
      })
      .catch((error) => console.error(error));
  }
}

appendTable();
