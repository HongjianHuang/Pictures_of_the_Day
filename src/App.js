import "./App.css";
import { useEffect, useState } from "react";
import Pictures from "./Pictures";
import axios from "axios";

function App() {
  const [picArray, setPicArray] = useState([]);
  const [state, setState] = useState(0);
  useEffect(() => {
    axios({
      url: "https://api.unsplash.com/photos/random",
      method: "GET",
      dataResponse: "json",
      params: {
        client_id: "0YJ_dWspPBeJNIsAljMricp6jhRxIo3SEW-DEsKewJQ",
        count: 10,
      },
    }).then((response) => {
      console.log(response.data);
      setPicArray(response.data);
    });
  }, []);
  //console.log(picArray);

  const getAnotherPicture = (picture) => {
    const isSamePic = (element) => element === picture;
    axios({
      url: "https://api.unsplash.com/photos/random",
      method: "GET",
      dataResponse: "json",
      params: {
        client_id: "0YJ_dWspPBeJNIsAljMricp6jhRxIo3SEW-DEsKewJQ",
        count: 1,
      },
    }).then((response) => {
      let tempArray = [...picArray];
      if (picArray.findIndex(isSamePic) !== -1) {
        tempArray[picArray.findIndex(isSamePic)] = response.data[0];
      }
      console.log(tempArray);
      setPicArray(tempArray);
    });
  };
  return (
    <div className="App">
      <h1>HI!</h1>
      <button
        onClick={() => {
          //setState(state + 1);
          console.log(picArray);
        }}
      >
        HI!
      </button>
      <main>
        {picArray.map((picture) => {
          return (
            <Pictures
              clickFunction={() => getAnotherPicture(picture)}
              picture={picture}
              key={picture.id}
            />
          );
        })}
      </main>
    </div>
  );
}

export default App;
