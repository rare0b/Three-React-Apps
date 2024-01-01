import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [prevURL, setPrevURL] = useState("");
  const [nextURL, setNextURL] = useState("");

  useEffect(() => {
    const initialFetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);

      setPrevURL(res.previous ?? "");
      setNextURL(res.next ?? "");

      setLoading(false);
    };
    initialFetchPokemonData();
  }, []);

  const fetchPokemonData = async (url) => {
    setLoading(true);

    //全てのポケモンデータを取得
    let res = await getAllPokemon(url);
    //各ポケモンの詳細なデータを取得
    loadPokemon(res.results);

    setPrevURL(res.previous ?? "");
    setNextURL(res.next ?? "");

    setLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handlePrevPage = async () => {
    fetchPokemonData(prevURL);
  };

  const handleNextPage = async () => {
    fetchPokemonData(nextURL);
  };

  return (
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Navbar />
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
          <div className="btn">
            {prevURL ? <button onClick={handlePrevPage}>前へ</button> : <></>}
            {nextURL ? <button onClick={handleNextPage}>次へ</button> : <></>}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
