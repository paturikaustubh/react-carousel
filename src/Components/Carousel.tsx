import { useEffect, useState } from "react";
import { CarouselArray } from "../types";

export default function Carousel({ items }: { items: CarouselArray }) {
  const [activeIndx, setActiveIndx] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleMouseMove = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
    setCursorPosition({
      x: clientX,
      y: clientY,
    });
  };

  const handleNavigateButtonMouseEnter = (direction: "next" | "prev") => () => {
    const cursorEle = document.querySelector<HTMLDivElement>(
      ".carousel-item-cursor"
    );
    if (cursorEle) {
      cursorEle.style.scale = "5";
    }

    if (direction === "next" && cursorEle) cursorEle.style.rotate = "0deg";
    else if (direction === "prev" && cursorEle)
      cursorEle.style.rotate = "-180deg";
  };

  const handleNavigateButtonMouseLeave = () => {
    const cursorEle = document.querySelector<HTMLDivElement>(
      ".carousel-item-cursor"
    );
    if (cursorEle) {
      cursorEle.style.scale = "0";
    }
  };

  const handleNextImg = () => {
    setActiveIndx((prevVal) =>
      prevVal + 1 > items.length - 1 ? 0 : prevVal + 1
    );
  };

  const handlePrevImg = () => {
    setActiveIndx((prevVal) =>
      prevVal - 1 < 0 ? items.length - 1 : prevVal - 1
    );
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="carousel-container">
      <section className="carousel-item">
        <div
          className="carousel-img-holder"
          onTouchStart={({ targetTouches }) =>
            setTouchStart(targetTouches[0].clientX)
          }
          onTouchMove={({ targetTouches }) =>
            setTouchEnd(targetTouches[0].clientX)
          }
          onTouchEnd={() => {
            if (touchStart - touchEnd > 50) handleNextImg();
            else if (touchStart - touchEnd < 50) handlePrevImg();
          }}
        >
          {items.map(({ img }) => (
            <img
              className="carousel-img"
              src={`assets/${img}.jpg`}
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
          onClick={handlePrevImg}
          onMouseEnter={handleNavigateButtonMouseEnter("prev")}
          onMouseLeave={handleNavigateButtonMouseLeave}
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <button
          className="carousel-navigate-button carousel-navigate-next"
          onClick={handleNextImg}
          onMouseEnter={handleNavigateButtonMouseEnter("next")}
          onMouseLeave={handleNavigateButtonMouseLeave}
        >
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
        <div className="carousel-item-info">
          <span
            className="carousel-item-title"
            data-popover-info={items[activeIndx].title}
          >
            {items[activeIndx].title
              ? `${items[activeIndx].title?.slice(0, 50)}${
                  (items[activeIndx].title as string).length > 50 ? "..." : ""
                }`
              : ""}
          </span>
          <span className="carousel-item-desc">
            {items[activeIndx].description
              ? `${items[activeIndx].description?.slice(0, 130)}${
                  (items[activeIndx].description as string).length > 130
                    ? "..."
                    : ""
                }`
              : ""}
          </span>
        </div>
        <div
          className="carousel-item-cursor"
          style={{
            top: `${cursorPosition.y - 10}px`,
            left: `${cursorPosition.x - 10}px`,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "0.7em",
              color: "white",
              margin: "auto",
              padding: 0,
              pointerEvents: "none",
            }}
          >
            arrow_right_alt
          </span>
        </div>
      </section>
    </div>
  );
}
