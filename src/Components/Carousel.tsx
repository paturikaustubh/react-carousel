import { useCallback, useEffect, useState } from "react";
import { CarouselArray } from "../types";

export default function Carousel({ items }: { items: CarouselArray }) {
  const [activeIndx, setActiveIndx] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }: { clientX: number; clientY: number }) => {
      setCursorPosition({
        x: clientX,
        y: clientY,
      });
    },
    []
  );

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
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
        <div
          className="carousel-item-info"
          style={{
            ...(items[activeIndx].title ? { height: "auto" } : { height: 0 }),
          }}
        >
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
          <svg
            width={"0.8em"}
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12H18M18 12L13 7M18 12L13 17"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>
      <section className="carousel-radio-buttons">
        {items.map((_, indx) => (
          <button
            className="carousel-radio-container"
            key={indx}
            onClick={() => {
              setActiveIndx(indx);
            }}
          >
            {indx === activeIndx ? (
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
                  style={{
                    fill: "none",
                    stroke: "#171717",
                    strokeWidth: 32,
                  }}
                />
                <circle cx="256" cy="256" r="144" />
              </svg>
            ) : (
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                  fill="#171717"
                />
              </svg>
            )}
          </button>
        ))}
      </section>
    </div>
  );
}
