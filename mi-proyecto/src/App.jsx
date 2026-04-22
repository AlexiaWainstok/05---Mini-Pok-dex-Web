import { useState, useEffect } from "react";
import Search from "./Componentes/Search";
import PokemonCard from "./Componentes/PokemonCard";
import PokemonList from "./Componentes/PokemonList";
import { getPokemon, getPokemonByType, getPokemonList } from "./services/api";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const data = await getPokemonList(10);

        const pokemons = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return res.json();
          })
        );

        setList(pokemons);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInitial();
  }, []);

  const handleSearch = async (value) => {
    setLoading(true);
    setError("");
    setPokemon(null);
    setList([]);

    try {
  
      const data = await getPokemon(value);
      setPokemon(data);
      setList([]);
    } catch {
      try {

        const data = await getPokemonByType(value);

        const pokemons = await Promise.all(
          data.pokemon.slice(0, 12).map(async (p) => {
            const res = await fetch(p.pokemon.url);
            return res.json();
          })
        );

        setList(pokemons);
        setPokemon(null);
      } catch {
        setError("No se encontró el Pokémon o tipo");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Mini Pokédex</h1>

      <Search onSearch={handleSearch} />

      {loading && <p className="loading">Cargando Pokémon...</p>}
      {error && <p className="error">{error}</p>}

     
      {!loading && pokemon && <PokemonCard pokemon={pokemon} />}
      {!loading && list.length > 0 && <PokemonList list={list} />}
    </div>
  );
}

export default App;