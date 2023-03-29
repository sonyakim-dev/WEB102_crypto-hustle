import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinInfo({ image, name, symbol }) {
  const [price, setPrice] = useState(null);

  const getCoinPrice = async () => {
    const json = await (
      await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
      )
    ).json();
    setPrice(json);
  };

  useEffect(() => {
    const controller = new AbortController();
    getCoinPrice().catch(console.error);
    return () => controller.abort();
  }, [symbol]);

  return (
    <div>
      {price ? (
        <li className="main-list" key={symbol}>
          <img
            className="icons"
            src={`https://www.cryptocompare.com${image}`}
            alt={`Small icon for ${name} crypto coin`}
          />
          <Link to={`/CoinDetail/${symbol}`} key={symbol}>
            {name} <span className="tab"></span> ${price.USD} USD
          </Link>
        </li>
      ) : null}
    </div>
  );
}

export default CoinInfo;
