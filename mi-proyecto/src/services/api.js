const BASE_URL = "https://pokeapi.co/";

export const getPokemon = async (nameOrId) => {
  const res = await fetch(`${BASE_URL}api/v2/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error("Pokemon no encontrado");
  return res.json();
};

export const getPokemonList = async (limit = 20) => {
  const res = await fetch(`${BASE_URL}api/v2/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error("Error al obtener la lista");
  return res.json();
};

export const getPokemonByType = async (type) => {
  const res = await fetch(`${BASE_URL}api/v2/type/${type}`);
  if (!res.ok) throw new Error("Tipo no encontrado");
  return res.json();
};