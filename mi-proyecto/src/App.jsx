import { useState } from "react";
import Search from "./Componentes/Search";
import PokemonCard from "./Componentes/PokemonCard";
import PokemonList from "./Componentes/PokemonList";
import { getPokemon } from "./services/api";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (value) => {
    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const data = await getPokemon(value);
      setPokemon(data);
    } catch (err) {
      setError("No se encontró el Pokémon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Mini Pokédex</h1>

      <Search onSearch={handleSearch} />

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <PokemonCard pokemon={pokemon} />

      <h2>Lista</h2>
      <PokemonList />
    </div>
  );
}
<div className="container"></div>
export default App;