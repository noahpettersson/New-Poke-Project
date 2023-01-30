export default function PokemonList({pokmon}) {
  return (
    <div>
      {pokmon.map(p => (
        <div key = {p}>{p}</div>
      ))}
    </div>
  )
}
