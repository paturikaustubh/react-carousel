import "./App.css";
import Carousel from "./Components/Carousel";
import { CarouselArray } from "./types";

function App() {
  const items: CarouselArray = [
    {
      img: "1",
    },
    {
      img: "2",
    },
    {
      img: "3",
    },
    {
      img: "4",
    },
    {
      img: "5",
    },
  ];

  return <Carousel items={items} />;
}

export default App;
