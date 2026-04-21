export default function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  return (
    <div className="card">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

     <p>Tipos: {pokemon.types.map(t => t.type.name).join(", ")}</p>
      <p>Peso: {pokemon.weight}</p>
      <p>Altura: {pokemon.height}</p>
    </div>
  );
}

