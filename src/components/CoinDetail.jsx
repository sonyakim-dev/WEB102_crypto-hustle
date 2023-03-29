import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinDetail() {
  const params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  const getCoinDetail = async () => {
    const details = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=` +
        API_KEY
    );
    const description = await fetch(
      `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=` +
        API_KEY
    );
    const detailsJson = await details.json();
    const descripJson = await description.json();

    setFullDetails({
      numbers: detailsJson.DISPLAY,
      textData: descripJson.Data,
    });
    // console.log(fullDetails);
  };

  useEffect(() => {
    getCoinDetail().catch(console.error);
  }, []);

  return (
    <div>
      {fullDetails ? (
        <div>
          <h1>{fullDetails.textData[params.symbol].FullName}</h1>
          <img
            className="images"
            src={`https://www.cryptocompare.com${
              fullDetails.numbers[params.symbol].USD.IMAGEURL
            }`}
            alt={`Small icon for ${params.symbol} crypto coin`}
          />
          <div> {fullDetails.textData[params.symbol].Description}</div>
          <br></br>
          <div>
            This coin was built with the algorithm{" "}
            {fullDetails.textData[params.symbol].Algorithm}{" "}
          </div>
        </div>
      ) : <div>Loading..</div>}
    </div>
  );
}

export default CoinDetail;
