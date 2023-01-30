import React from 'react'
import Button from '@mui/material/Button'

export default function PokemonDetails({pokemon, promiseInProgress,removeDTV, loadingDetail, setLoadingDetail}) {

  function imageLoaded() {
    setLoadingDetail(false)
  }

  function printStats(p) {
    return (
      <div key={p.stat.name}>
        <span>{p.stat.name}: </span>
        <span>{p.base_stat}</span>
      </div>
    )
  }

  function detailsOfPokemon(pokemon) {
    return (
      <div>
        <div className='gridText'>Stats: 
          <br/>
          Height: {pokemon.height} dm
          <br/>
          Weight: {pokemon.weight} hg
          {pokemon.stats.map(printStats)}</div>
      </div>
    )
  }
  function removePokemon(){
    setLoadingDetail(true)
    removeDTV()
  }

  if((pokemon === "Not Found"))
    return (
      promiseInProgress ? <img src="https://i.imgur.com/VexuoSc.gif"/> :
      <div className="pokeDetails" >
          <div>
              You must have misspelt the pokémon name or left the searchbar empty!
          </div>
          <Button variant="contained" margin="normal" onClick={removePokemon}>Press here to try again</Button>
      </div>)
  return (
    promiseInProgress ? <img height="140" width="140" src="https://i.imgur.com/VexuoSc.gif"/> :
    <div className ="pokeDetails">
        <Button variant="contained" onClick={removePokemon} className="detailsButton">X</Button>
        <div className ="pokeDexDetailsView">
            <div className='detailsImage zoom2'> 
            <div 
                style={{display: loadingDetail ? "block" : "none"}} 
                className="forAni loading">    
              </div>

              <div style={{display: loadingDetail ? "none" : "block"}}>
                <img id = "pokeImg" 
                   onLoad = {imageLoaded} src={pokemon.sprites.front_default} 
                   height="140" width="140"/> 
              </div>
              
              <div className='gridText typewriter' key={pokemon.name}>
                {pokemon.id}. 
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </div>
            </div>
            <div className='statsText typewriter'> 
            {detailsOfPokemon(pokemon)}
            </div>
          </div>
    </div>
  )
}




