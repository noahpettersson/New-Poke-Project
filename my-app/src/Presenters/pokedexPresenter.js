import React, { useEffect } from "react";
import PokedexView from '../Views/pokedexView';
import SearchView from "../Views/searchView";
import {fetchPokemonDetails} from '../pokemonSource';
import PokemonDetails from '../Views/pokemonDetailsView';
import { bigPromise } from "../pokemonSource";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import { useNavigate } from 'react-router-dom'
import searchSound from "../Assets/Search.wav"

function Pokedex() {

  const [pokeData, setPokeData] = React.useState([]);//
  const [search, setSearch] = React.useState('');
  const [pokeDetails, setPokemonDetails] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [loadingDetail, setLoadingDetail] = React.useState(true);

  const [nextPage, setNextPage] = React.useState();
  const [previousPage, setPreviousPage] = React.useState();
  const { promiseInProgress } = usePromiseTracker();
  const navigation = useNavigate()

  function searchPokemonACB(pokemonSearched) {setSearch(pokemonSearched);}

  async function getPokemon() {
    if(search === "") return setPokemonDetails("Not Found");
    const response = await trackPromise(fetchPokemonDetails(search.toLowerCase()))
    setPokemonDetails(response.data)
  }

  function pokeUndefined(poke) {
    if(!poke) {
      return <div></div>
    }
  }
  
  function pokemonTBR() {setPokemonDetails(null)}
  function pokemonPressed(pokemon) {setPokemonDetails(pokemon)}

  async function nextPrevPokemon(param) {
    const response = await bigPromise(param === 1 ? nextPage : previousPage)
    setPokeData(await response[0])
    setNextPage(response[1])
    setPreviousPage(response[2])
    setLoading(true)
  }

  function getGrid(param) {
    let num = param % 20;
    if (num >= 1 && num <= 5) {
      return 1;
    } else if (num >= 6 && num <= 10) {
      return 2;
    } else if (num >= 11 && num <= 15) {
      return 3;
    } else if (num >= 16 && num <= 20) {
      return 4;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    async function setup() {
      const response = await bigPromise("https://pokeapi.co/api/v2/pokemon")
      setPokeData(await response[0])
      setNextPage(response[1])
      setPreviousPage(response[2])
    }
    setup()
  }, []);

  function navigateMenu() {
    navigation("/Menu");
  }

  function nav() {
    navigation("/quizmenu")
  }

  function handlePress(param) {
    if (param.key === 'Enter') {
      new Audio(searchSound).play();
      getPokemon();
      setSearch('');
    }
  }

  return (
      <div className="pokeDexView">
          {!pokeUndefined(pokeDetails) || <div className ="viewBorder">
            {<PokedexView pokemon = {pokeData} setPokeDetail={pokemonPressed} getGrid={getGrid}
            loading={loading} setLoading={(param) => setLoading(param)}/>}
            <SearchView handlePress={handlePress} navigation={navigateMenu} nextPokemon = {nextPrevPokemon} 
            previousPokemon = {nextPrevPokemon} searchPokemon ={searchPokemonACB} 
            findPokemon={getPokemon} setSearch={() => {setSearch('')}} nav={nav} next={nextPage}
            prev={previousPage}/>
          </div>}
            { pokeUndefined(pokeDetails) || <PokemonDetails removeDTV={pokemonTBR} pokemon = {pokeDetails} 
            loadingDetail={loadingDetail} setLoadingDetail={(param) => setLoadingDetail(param)} promiseInProgress={promiseInProgress}
            />}
      </div>
    );
}

export default Pokedex;

