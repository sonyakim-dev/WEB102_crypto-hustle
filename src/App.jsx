import { useState, useEffect } from "react";
import CoinInfo from "./components/CoinInfo";
import SideNav from "./components/SideNav";
import "./App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  const fetchAllCoinData = async () => {
    const json = await (
      await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`
      )
    ).json();
    setList(json);
    console.log(list.Data);
  };

  useEffect(() => {
    fetchAllCoinData().catch(console.error);
  }, []);

  return (
    <div className="App">
      <div className="whole-page">
        <SideNav />
        <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        {searchInput.length > 0
          ? filteredResults.map((coin) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
              ) : null
            )
          : list &&
            Object.entries(list.Data).map(([coin]) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
              ) : null
            )}
      </div>
    </div>
  );
}

export default App;
