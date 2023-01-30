function PokedexView({pokemon, setPokeDetail, getGrid, loading, setLoading}) {
    return (
        <div className ="forGrid">{pokemon.map(renderPokemon)}</div>
    )

    function renderPokemon(p) {

        function imageLoaded() {
            setLoading(false)
        }

        function onPressed() {
            setLoading(true)
            setPokeDetail(p)
        }
        function returnGrid(param) {
          return getGrid(param);
        }

        return  <div key={p.name} onClick={onPressed} className={"zoom2 grid gr"+ returnGrid(p.id)}>
                    <div 
                        style={{display: loading ? "block" : "none"}} 
                        className="forAni loading">    
                    </div>

                    <div style={{display: loading ? "none" : "block"}}>
                       <img 
                            id = {p.name} onLoad={imageLoaded}
                            src={p.sprites.front_default} 
                            height="110" width="110" 
                        /> 
                    </div>
                    
                    <div className="gridText typewriter">
                        {p.id}.
                        {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                    </div>
                </div>
    }
}

export default PokedexView;