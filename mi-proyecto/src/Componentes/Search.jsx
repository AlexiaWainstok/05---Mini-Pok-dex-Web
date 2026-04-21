import { useState } from "react";
<div className="search-box"></div>
export default function Search({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (!input.trim()) return;
    onSearch(input.toLowerCase());
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nombre o ID"
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
  
}