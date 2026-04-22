export default function PokemonList({ list }) {
  if (!list || list.length === 0) return null;

  return (
    <div className="lista-wrapper">
      <h2>Resultados</h2>

      <div className="grid">
        {list.map((p, i) => (
          <div className="card" key={i}>
            <h2>{p.name}</h2>

            <img
              src={p.sprites?.front_default}
              alt={p.name}
            />

            <p>
              Tipos: {p.types?.map(t => t.type.name).join(", ")}
            </p>
            <p>Peso: {p.weight}</p>
            <p>Altura: {p.height}</p>
          </div>
        ))}
      </div>
    </div>
  );
}