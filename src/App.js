import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { PokeSingolo } from './screens/PokeSingolo'
import PokeDeck from './screens/PokeDeck'

import Navbar from './components/Navbar'
import Card from './components/Card'
import { getPokemon, getAllPokemon } from './services/pokemon'
import { Message } from './helpers/timeoutFunc'

import './App.css'

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'
  const [queryResult, setQueryResult] = useState({})
  const [query, setQuery] = useState('')
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(false)
  const [searchLoad, setSearchLoad] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        let resData = await response.json()
        setQueryResult(resData)
      } catch (error) {
        setError(true)
      }
    }

    fetchData()

    return () => {
      setError(false)
      setSubmit(false)
      setSearchLoad(false)
    }
  }, [submit])

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next)
      setPrevUrl(response.previous)
      await loadPokemon(response.results)
      setLoading(false)
      setError(false)
    }
    fetchData()
  }, [])

  const next = async () => {
    setLoading(true)
    let data = await getAllPokemon(nextUrl)
    await loadPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
    setLoading(false)
    setError(false)
  }

  const prev = async () => {
    if (!prevUrl) return
    setLoading(true)
    let data = await getAllPokemon(prevUrl)
    await loadPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
    setLoading(false)
    setError(false)
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon)
        return pokemonRecord
      }),
    )
    setPokemonData(_pokemonData)
  }

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/ThePokemonAPIChallenge/">
              <div>
                <form
                  className="btn"
                  onSubmit={(e) => (e.preventDefault(), setSubmit(true))}
                >
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button type="submit">cerca</button>
                </form>
                {searchLoad ? <h2>loading</h2> : null}
                {loading ? (
                  <h1 style={{ textAlign: 'center' }}>Loading...</h1>
                ) : (
                  <>
                    {error ? (
                      <Message>
                        Hai sbagliato nome del pokemon oppure ci sono stati
                        altri errori
                      </Message>
                    ) : null}
                    <div className="btn">
                      {!queryResult.game_indices && (
                        <>
                          <button onClick={prev}>Prev</button>
                          <button onClick={next}>Next</button>
                        </>
                      )}
                    </div>
                    <div className="grid-container">
                      {queryResult.game_indices ? (
                        <Card pokemon={queryResult} />
                      ) : (
                        pokemonData.map((pokemon, i) => {
                          return <Card key={i} pokemon={pokemon} />
                        })
                      )}
                    </div>
                    <div className="btn">
                      {!queryResult.game_indices && (
                        <>
                          <button onClick={prev}>Prev</button>
                          <button onClick={next}>Next</button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </Route>
            <Route exact path="/ThePokemonAPIChallenge/pokemon/:slug">
              <PokeSingolo />
            </Route>
            <Route path="/ThePokemonAPIChallenge/deck">
              <PokeDeck />
            </Route>
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  )
}

export default App
