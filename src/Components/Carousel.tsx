import { useState } from "react";
import { CarouselArray } from "../types";

export default function Carousel({ items }: { items: CarouselArray }) {
  const [activeIndx, setActiveIndx] = useState(0);

  return (
    <div className="carousel">
      <section className="carousel-item">
        <div className="carousel-img-holder">
          {items.map(({ img }) => (
            <img
              className="carousel-img"
              src={`src\\assets\\${img}.jpg`}
              width={"100%"}
              style={{
                translate: `${-100 * activeIndx}%`,
                transition: "500ms ease-in-out",
              }}
              key={img}
            />
          ))}
        </div>
        <button
          className="carousel-navigate-button carousel-navigate-prev"
          onClick={() =>
            setActiveIndx((prevVal) =>
              prevVal - 1 < 0 ? items.length - 1 : prevVal - 1
            )
          }
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <button
          className="carousel-navigate-button carousel-navigate-next"
          onClick={() =>
            setActiveIndx((prevVal) =>
              prevVal + 1 > items.length - 1 ? 0 : prevVal + 1
            )
          }
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
        <div className="carousel-item-info">
          <span
            className="carousel-item-title"
            data-popover-info={items[activeIndx].title}
          >
            {items[activeIndx].title
              ? `${items[activeIndx].title}${
                  (items[activeIndx].title as string).length > 50 ? "..." : ""
                }`
              : ""}
          </span>
          <span className="carousel-item-desc">{`This is an open-world game which takes place in Egypt where the protagonist goes on a journey to assassinate the people responsible for the death of his son.`}</span>
        </div>
      </section>
    </div>
  );
}
