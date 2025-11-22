const characterList = document.getElementById("character-list");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");

let currentPage = 1;

function getCharacters() {
  fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      finalPage = data.info.pages
      const characters = data.results
        .map(character => {
          const template = `
            <li>
              <img src="${character.image}" alt="${character.name}" />
              <h2><strong>Nombre:</strong> ${character.name}</h2>
              <p><strong>Especie:</strong> ${character.species}</p>
            </li>
          `;
          return template;
        })
        .join("");

      characterList.innerHTML = characters;
      removeButton();
    })
    .catch(err => console.log(err));
}

function removeButton() {
  currentPage === 1
    ? prevPage.classList.add("disabled")
    : prevPage.classList.remove("disabled");

  currentPage === finalPage
    ? nextPage.classList.add("disabled")
    : nextPage.classList.remove("disabled");
}

nextPage.addEventListener("click", () => {
  if (currentPage < finalPage) {
    currentPage++;
    getCharacters();
  }
});

prevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getCharacters();
  }
});

getCharacters();
