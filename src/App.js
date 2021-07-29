import "./App.css";
import { useEffect, useState } from "react";
import Pictures from "./Pictures";
import axios from "axios";

function App() {
  const [picArray, setPicArray] = useState([]);
  const [picIndex, setPicIndex] = useState(0);
  const [newPicArray, setNewPicArray] = useState([]);
  const [overPicLimit, setOverPicLimit] = useState(false);
  const [layout, setLayout] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const randomWidth = () => {
    const randomInt = Math.floor(Math.random() * 3) + 1;
    if (randomInt === 3) {
      return "width3";
    } else if (randomInt === 2) {
      return "width2";
    } else {
      return "width1";
    }
  };
  const randomHeight = () => {
    const randomInt = Math.floor(Math.random() * 3) + 1;
    if (randomInt === 3) {
      return "height3";
    } else if (randomInt === 2) {
      return "height2";
    } else {
      return "height1";
    }
  };
  useEffect(() => {
    const layoutArray = [];
    console.log();
    for (let i = 0; i < 10; i++) {
      layoutArray.push({ width: randomWidth(), height: randomHeight() });
    }
    console.log(layoutArray);
    setLayout(layoutArray);
  }, []);
  useEffect(() => {
    axios({
      url: "https://api.unsplash.com/photos/random",
      method: "GET",
      dataResponse: "json",
      params: {
        client_id: "6Wy8r32NE-IcXH01MKGdV7Zqtviw8_SjCQjmNIrVCm8",
        count: 10,
      },
    })
      .then((response) => {
        setPicArray(response.data);
      })
      .then(() => {
        setHasLoaded(true);
      });
  }, []);

  //console.log(picArray);
  useEffect(() => {
    axios({
      url: "https://api.unsplash.com/photos/random",
      method: "GET",
      dataResponse: "json",
      params: {
        client_id: "0YJ_dWspPBeJNIsAljMricp6jhRxIo3SEW-DEsKewJQ",
        count: 30,
      },
    }).then((response) => {
      setNewPicArray(response.data);
    });
  }, [overPicLimit]);
  const getAnotherPicture = (picture) => {
    const tempArray = [...picArray];
    const isSamePic = (element) => element === picture;
    if (picIndex >= newPicArray.length) {
      setOverPicLimit(!overPicLimit);
      setPicIndex(0);
    } else {
      tempArray[picArray.findIndex(isSamePic)] = newPicArray[picIndex];
      setPicIndex(picIndex + 1);
    }
    setPicArray(tempArray);
  };

  if (hasLoaded === true && layout.length > 0) {
    return (
      <div className="App">
        {picArray.map((picture, i) => {
          return (
            <Pictures
              width={layout[i].width}
              height={layout[i].height}
              clickFunction={() => getAnotherPicture(picture)}
              picture={picture}
              key={picture.id}
            />
          );
        })}
      </div>
    );
  } else {
    return <div className="App"></div>;
  }
}

export default App;
