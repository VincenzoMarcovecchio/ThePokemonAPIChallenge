import React, { useEffect, useState } from 'react'
import { getPokeFromLocalStorage } from '../helpers/localStorageFunctions'
import Card from '../components/Card'

function PokeDeck() {
  const [pokemonData, setPokemonData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [arrays, setArrays] = useState([])

  console.log(pokemonData)

  useEffect(() => {
    async function fetchData() {
      let pokestorage = await getPokeFromLocalStorage()
      setArrays(pokestorage)
      setLoading(false)
      setError(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    let store = []
    arrays.map((lol) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${lol}`)
        .then((res) => res.json())
        .then((dat) => store.push(dat))
    })
    setPokemonData(store)
  }, [arrays])

  return (
    <div>
      {pokemonData.map((data) => {
        return <Card key={data.id} pokemon={data} />
      })}
    </div>
  )
}

export default PokeDeck
