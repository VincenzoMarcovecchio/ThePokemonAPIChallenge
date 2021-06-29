import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const PokeSingolo = () => {
  let location = useLocation()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [single, setSingle] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(
          `https://pokeapi.co/api/v2${location.pathname}`,
        )
        let resData = await response.json()
        await setSingle(resData)
        setLoading(false)
      } catch (error) {
        setError(true)
      }
    }

    fetchData()
  }, [location.pathname])

  return loading ? (
    'loading'
  ) : (
    <figure>
      <h1>{single.name} </h1>
      <figcaption>
        <p>weight:&nbsp;{single.weight}</p>

        {/* <img src={} alt={queryResult.name} /> */}
      </figcaption>
    </figure>
  )
}
