import { useEffect, useState } from "react";
import { getPokemonList } from "../services/api";

export default function PokemonList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const data = await getPokemonList(20);
        setList(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, []);

  if (loading) return <p>Cargando lista...</p>;

  <h2>Lista</h2>
   return (
    <ul>
      {list.map((p, i) => (
        <li key={i}>{p.name}</li>
      ))}
    </ul>
  );

}