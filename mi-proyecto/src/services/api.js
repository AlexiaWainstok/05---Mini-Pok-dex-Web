const BASE_URL = "https://pokeapi.co/api/v2/";

export const getPokemon = async (nameOrId) => {
  const res = await fetch(`${BASE_URL}pokemon/${nameOrId}`);

  if (!res.ok) {
    throw new Error("Pokemon no encontrado");
  }

  return await res.json();
};

export const getPokemonList = async (limit = 20) => {
  const res = await fetch(`${BASE_URL}pokemon?limit=${limit}`);

  if (!res.ok) {
    throw new Error("Error al obtener la lista");
  }

  return await res.json();
};


export const getType = async (type) => {
  const res = await fetch(`${BASE_URL}type/${type}`);

  if (!res.ok) {
    throw new Error("Tipo no encontrado");
  }

  return await res.json();
};