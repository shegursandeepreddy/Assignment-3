import React, { useState, useEffect } from 'react';
import '../styles/Stocks.css';

const Stocks = () => {
  const [data, setData] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=PM104NQOTF828H5F');
      const json = await response.json();
      setData(json);
      console.log(json)
      if (json['Information']) {
        setError(json['Information']);
      } else {
      // Extract metadata and latest data point
      const metadata = json["Meta Data"];
      const timeSeries = json["Time Series (5min)"];
      if(timeSeries === undefined){
        return;
      }
      const latestTimestamp = Object.keys(timeSeries)[0]; // assuming the first key is the latest timestamp
      const latestDataPoint = timeSeries[latestTimestamp];
      setMetadata(metadata);
      setLatestData(latestDataPoint);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className="">
      {metadata && <div>
        <h2>Stock: {metadata["2. Symbol"]}</h2>
        <p><b>Last Refreshed: </b> {metadata["3. Last Refreshed"]}</p>
        <p><b>Time Zone: </b> {metadata["6. Time Zone"]}</p>
        <p><b>High: </b> {latestData["2. high"]}</p>
        <p><b>Low: </b> {latestData["3. low"]}</p>
        <p><b>Volume: </b> {latestData["5. volume"]}</p>
    </div>
      }
      {error && <div>Limit exceeded for the day. Please try later</div>}
    </div>
    
  );
};

export default Stocks;
