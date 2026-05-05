import { useState } from "react"; // importo el hook useState para manejar estado

export default function Search({ onSearch }) { // componente que recibe una función onSearch
  const [input, setInput] = useState(""); // estado para guardar lo que escribe el usuario

  const handleSearch = () => { // función que se ejecuta al buscar
    if (!input.trim()) return; // si está vacío o solo tiene espacios, no hace nada
    onSearch(input.toLowerCase()); // llama a la función del padre con el texto en minúscula
  };

  return (
    <div className="search-box"> {/* contenedor del buscador */}

      <input
        value={input} // el valor del input viene del estado
        onChange={(e) => setInput(e.target.value)} // cada vez que escribo, actualiza el estado
        placeholder="Nombre o tipo" // texto que aparece como ayuda
      />

      <button onClick={handleSearch}> {/* al hacer click ejecuta la búsqueda */
        }
        Buscar
      </button>

    </div>
  );
}