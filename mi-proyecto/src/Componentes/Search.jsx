import { useState } from "react";
export default function Search({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (!input.trim()) return;
    onSearch(input.toLowerCase());
  };

  return (
    <div className="search-box">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nombre o tipo"
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}