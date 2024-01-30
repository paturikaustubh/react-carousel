import "./App.css";
import Carousel from "./Components/Carousel";
import { CarouselArray } from "./types";

function App() {
  const items: CarouselArray = [
    {
      img: "1",
      title: "Assassin's Creed: Origins",
      description:
        "An open-world game which takes place in Egypt where the protagonist goes on a journey to assassinate the people responsible for the death of his son.An open-world game which takes place in Egypt where the protagonist goes on a journey to assassinate the people responsible for the death of his son.",
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

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", fontSize: "2.5em", color: "#171717" }}>
        React Carousel Component
      </h1>
      <Carousel items={items} />
    </div>
  );
}

export default App;
