import React from 'react'
import typeColors from '../../helpers/typeColors'
import './style.css'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import {
  savePokeToLocalStorage,
  removePokeFromLocalStorage,
} from '../../helpers/localStorageFunctions'
import { useLocation } from 'react-router-dom'

// Card.propTypes = {
//   pokemon: PropTypes.shape({
//     cca2: PropTypes.string.isRequired,
//     region: PropTypes.string.isRequired,
//     name: PropTypes.shape({
//       common: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// }

function Card({ pokemon }) {
  let history = useHistory()
  let location = useLocation()
  return (
    <div className="Card">
      <div className="Card__img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className="Card__name">{pokemon.name}</div>
      <div className="Card__types">
        {pokemon.types.map((type, index) => {
          return (
            <div
              key={index}
              className="Card__type"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {type.type.name}
            </div>
          )
        })}
      </div>
      <div className="Card__info">
        <div className="Card__data Card__data--weight">
          <p className="title">Weight</p>
          <p>{pokemon.weight}</p>
        </div>
        <div className="Card__data Card__data--weight">
          <p className="title">Height</p>
          <p>{pokemon.height}</p>
        </div>
        <div className="Card__data Card__data--ability">
          <p className="title">Ability</p>
          <p>{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>

      <div className="info-container">
        <button onClick={() => history.push(`pokemon/${pokemon.name}`)}>
          piu' info
        </button>
        {!location.pathname.includes('deck') && (
          <button onClick={() => savePokeToLocalStorage(pokemon.name)}>
            aggiungi al deck
          </button>
        )}
        {location.pathname.includes('deck') && (
          <button
            onClick={() =>
              removePokeFromLocalStorage(pokemon.name).then(() =>
                window.location.reload(),
              )
            }
          >
            rimuovi
          </button>
        )}
      </div>
    </div>
  )
}

export default Card
