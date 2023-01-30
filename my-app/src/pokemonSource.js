import axios from 'axios'

const BASE_URL = "https://pokeapi.co/api/v2/";

async function getPokemonDetails(URL,aFunc) {
    const res = await axios.get(URL);
    const data = res;
    return aFunc(data.results.map(p => p));
}

async function getPokemonList(cpUrl, cancel) {
    return await axios.get(cpUrl, new axios.CancelToken(c => cancel = c))
}

async function getPokeDetailsFromURL(pokemonURL) {
    return await axios.get(pokemonURL)
}

async function getPokeURL(URL) {
    return await axios.get(URL).then((p)=>{return p.data})
}

function catchWrongPokemonACB(error) {
    if (error.response) {

        return error.response
      } else if (error.request) {

        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
}

async function fetchPokemonDetails(pokemon) {
    return  await axios.get(BASE_URL + "pokemon/" + pokemon).catch(catchWrongPokemonACB);
}

async function bigPromise(URL) {
    function makeBigPromiseACB(res) {

        function makePokemonPromiseCB(p) {
            return axios.get(p.url)
        }

        function getData(p) {
            return p.map((poke)=>{return poke.data})
        }
        const pokemonPromiseArray = res.data.results.map(makePokemonPromiseCB)
        return [Promise.all(pokemonPromiseArray).then(getData), res.data.next, res.data.previous]
        
    }
    const res_1 = await axios.get(URL);
    return makeBigPromiseACB(res_1);
}


export { getPokemonDetails, fetchPokemonDetails, getPokemonList, getPokeDetailsFromURL, bigPromise, getPokeURL }
