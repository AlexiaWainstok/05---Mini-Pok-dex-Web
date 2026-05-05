import { useState, useEffect } from "react"; // hooks para estado y efectos
import Search from "./Componentes/Search"; // componente buscador
import PokemonCard from "./Componentes/PokemonCard"; // componente para 1 pokemon
import PokemonList from "./Componentes/PokemonList"; // componente para lista
import { getPokemon, getPokemonByType, getPokemonList } from "./services/api"; // funciones para API

function App() {
  const [pokemon, setPokemon] = useState(null); 
  const [list, setList] = useState([]); 
  const [loading, setLoading] = useState(false); // estado de carga
  const [error, setError] = useState(""); 

  useEffect(() => { 
    const fetchInitial = async () => {
      try {
        const data = await getPokemonList(10); 

        const pokemons = await Promise.all( // espera las peticiones todas
          data.results.map(async (p) => { // recorre cada pokemon
            const res = await fetch(p.url); // pide info completa
            return res.json(); 
          })
        );

        setList(pokemons); // guarda la lista en el estado
      } catch (err) {
        console.error(err); // muestra error en consola
      }
    };

    fetchInitial(); // ejecuta la función
  }, []); // [] = solo se ejecuta una vez

  const handleSearch = async (value) => { // función de búsqueda
    setLoading(true); // activa loading
    setError(""); // limpia errores
    setPokemon(null); // limpia pokemon individual
    setList([]); // limpia lista

    try {
      const data = await getPokemon(value); // busca por nombre
      setPokemon(data); // guarda el pokemon encontrado
      setList([]); // limpia lista
    } catch {
      try {
        const data = await getPokemonByType(value); // busca por tipo

        const pokemons = await Promise.all( // obtiene info completa
          data.pokemon.slice(0, 12).map(async (p) => { // limita a 12
            const res = await fetch(p.pokemon.url); // fetch de cada uno
            return res.json();
          })
        );

        setList(pokemons); 
        setPokemon(null); // limpia pokemon individual
      } catch {
        setError("No se encontró el Pokémon o tipo"); 
      }
    } finally {
      setLoading(false); // termina loading
    }
  };

  return (
    <div className="container"> 
      <h1>Mini Pokédex</h1>

      <Search onSearch={handleSearch} /> {/* buscador */}

      {loading && <p className="loading">Cargando Pokémon...</p>} {/* mensaje carga */}
      {error && <p className="error">{error}</p>}

      {!loading && pokemon && <PokemonCard pokemon={pokemon} />} {/* muestra 1 pokemon */}
      {!loading && list.length > 0 && <PokemonList list={list} />} {/* muestra lista */}
    </div>
  );
}

export default App; 