import "./App.css";
import { createClient } from "pexels";
import { useEffect, useState } from "react";
import Pictures from "./Pictures";

function App() {
  const client = createClient(
    "563492ad6f9170000100000178d40363ce3e48cd89ba174e3b84b593"
  );
  const [picArray, setPicArray] = useState([]);
  const [state, setState] = useState(0);
  const tempArray = [];
  useEffect(() => {
    client.photos.random().then((picObject) => {
      tempArray.push(picObject);
      setPicArray(tempArray);
    });
  }, [state]);
  return (
    <div className="App">
      <h1>HI!</h1>
      <button
        onClick={() => {
          setState(state + 1);
          console.log(picArray);
        }}
      >
        HI!
      </button>
      <main>
        <img src={picArray[0].src.small} />
      </main>
    </div>
  );
}

export default App;
