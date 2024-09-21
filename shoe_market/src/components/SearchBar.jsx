import "../styles/SearchBar.css"; // Assurez-vous que le fichier CSS est bien importé

const SearchBar = ({ input, setInput }) => {
  const handleInputChange = (e) => {
    setInput(e.target.value); // Mise à jour du state avec la saisie utilisateur
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Veuillez entrer un produit"
        value={input}
        onChange={handleInputChange}
        className="search-input"
      />
      {/* <button className="search-button">Go</button> */}
    </div>
  );
};

export default SearchBar;
