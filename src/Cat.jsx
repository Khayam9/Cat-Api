import React, { useState } from "react";
import "./App.css";

function Cat() {
  const [url, setUrl] = useState("");
  const [seenCats, setSeenCats] = useState([]);

  async function fetch_data() {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search",
      );
      if (!response.ok) {
        throw new Error("Request Failed");
      }
      const jsonRes = await response.json();
      setUrl(jsonRes[0].url);
      setSeenCats((prevSeenCats) => [...prevSeenCats, jsonRes[0].url]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="cat_main">
      <div className="cat_container">
        <img src={url} className="cat_img" alt="Cat" />
      </div>
      <div>
        <button className="cat_button" onClick={fetch_data}>
          Generate !
        </button>
      </div>
      <h2 className="history">Who have we seen so far?</h2>
      <div className="gallery">
        <ul>
          {seenCats.map((catUrl, index) => (
            <li key={index}>
              <img src={catUrl} alt={`Seen Cat ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cat;
