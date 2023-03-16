const hotels = document.getElementById("hotels");

async function appendHotels() {
  const data = await fetch("http://localhost:3004/admindata")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  console.log(data);
  data.map((el) => {
    const div = document.createElement("div");
    div.id = "hotel_card";
    const img = document.createElement("img");
    img.src = el.file;
    const leftdiv = document.createElement("div");
    leftdiv.append(img);
    const rightdiv = document.createElement("div");
    const category = document.createElement("h2");
    category.innerHTML = el.category;
    const hr = document.createElement("hr");
    const adults = document.createElement("p");
    adults.innerHTML = `Adults : ${el.adults}`;
    const max = document.createElement("p");
    max.innerHTML = `Max Capacity : ${el.max}`;
    const cost = document.createElement("p");
    cost.innerHTML = `Price : ${el.cost}`;
    const facilities = document.createElement("p");
    facilities.innerHTML = "Closet with hangers, HD TV";
    const bed = document.createElement("p");
    bed.innerHTML = `Bed Type : ${el.bed}`;
    const button = document.createElement("button");
    button.innerText = "Book Now";
    button.id = "book";
    rightdiv.append(category, hr, adults, max, facilities, bed, cost, button);
    div.append(leftdiv, rightdiv);
    hotels.append(div);
  });
}

appendHotels();
