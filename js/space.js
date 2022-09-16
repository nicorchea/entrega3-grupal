"use strict";

// * ---------- DECLARACIONES ----------

//  URL inicial
let NASA_URL = "https://images-api.nasa.gov/search?q=andromeda";

// Campo busqueda
const SEARCH = document.getElementById("inputBuscar");

// Boton buscar
const BTN_SEARCH = document.getElementById("btnBuscar");

//Carta donde se cargara la informacion
const CARD_CONTAINER = document.getElementById("card-container");

// * ---------- FUNCIONES ----------

// Funcion que hace fetch a la URL y devuelve el json
let getJSONData = function (url) {
  let res = {};
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      res.status = "ok";
      res.data = response;

      return res;
    })
    .catch(function (error) {
      res.status = "error";
      res.data = error;

      return res;
    });
};

// Funcion que muestra los elementos manipulando el DOM
const showCard = (array) => {
  array.forEach((element) => {
    const img = element.links[0].href;
    const title = element.data[0].title;
    const description = element.data[0].description;
    const dataCreated = element.data[0].date_created;
    console.log(element);

    CARD_CONTAINER.innerHTML += `

    <div class="col-md-4 p-2">

      <div class="card shadow-sm">

        <img src="${img}" alt="" class="card-img-top" >

          <div class="card-body">

          <h5 class="card-title">${title}</h5>

          <p class="card-text scroll">${description}</p>

          <p class="card-text"><small class="text-muted"> ${dataCreated} </small></p>

        </div>

      </div>
      
    </div>
 
    `;
  });
};

// * ---------- EVENTOS ----------

// Evento que carga la info a la pagina
document.addEventListener("DOMContentLoaded", function () {
  getJSONData(getUrl()).then(function (resultObj) {
    if (resultObj.status === "ok") {
      const data = resultObj.data.collection.items;

      showCard(data);
    }
  });
});

// Al clickear boton buscar
BTN_SEARCH.onclick = () => {
  const value = SEARCH.value.toLowerCase();

  NASA_URL = "https://images-api.nasa.gov/search?q=" + value;

  localStorage.setItem("url", NASA_URL);
  location.reload();
};

// Getter que consigue la info del local storage
const getUrl = () => {
  const res = localStorage.getItem("url");
  return res;
};

// PARTICIPANTES
// Nicolas Silva Augustyniak, Andrea Martinez, Claudia Andrea Guevara Sánchez, Luciano Gutierrez, Milagros Hofemblatt
