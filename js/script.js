fetch("https://rickandmortyapi.com/api/character/?page=1")
.then(response => response.json())
.then(data => {
    const characters = data.results.map(character =>{
        
    })
})