export const savePokeToLocalStorage = async (data) => {
  let a = []

  a = (await JSON.parse(localStorage.getItem('pokemon'))) || []

  await a.push(data)
  a = [...new Set(a)]
  localStorage.setItem('pokemon', JSON.stringify(a))
}

export const getPokeFromLocalStorage = async () => {
  let b

  b = [...new Set(await JSON.parse(localStorage.getItem('pokemon')))]

  return b
}

export const removePokeFromLocalStorage = async (name) => {
  console.log(name)
  var poke = JSON.parse(localStorage.getItem('pokemon'))

  for (var i = 0; i < poke.length; i++) {
    //loop over the collection
    if (poke[i] === name) {
      poke.splice(i, 1) //remove item from array
      break //exit loop
    }
  }

  poke.filter((pok) => pok[name] !== name)
  console.log(poke)
  localStorage.setItem('pokemon', JSON.stringify(poke))
}
