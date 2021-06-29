export function getPokemon(data) {
  return new Promise((resolve, reject) => {
    fetch(data.url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data)
      })
  })
}

export function getStoredPokemon(data) {
  return new Promise((resolve, reject) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${data}`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data)
      })
  })
}

export async function getAllPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data)
      })
  })
}
