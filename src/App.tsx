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
      title: "You can have a title too",
      description: "Followed by short description about it.",
    },
    {
      img: "4",
    },
    {
      img: "5",
    },
  ];

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", fontSize: "2.8em", color: "#171717" }}>
        React Carousel Component
      </h1>
      <Carousel items={items} />
    </div>
  );
}

export default App;
