import React, { useState } from "react";
import "./Carousel.css";

const imagesData = [
  { src: "https://picsum.photos/200/300?random=1", title: "Quận 1" },
  { src: "https://picsum.photos/200/300?random=2", title: "Quận 2" },
  { src: "https://picsum.photos/200/300?random=3", title: "Quận 3" },
  { src: "https://picsum.photos/200/300?random=4", title: "Quận 4" },
  { src: "https://picsum.photos/200/300?random=5", title: "Quận 5" },
  { src: "https://picsum.photos/200/300?random=6", title: "Quận 6" },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + 6 < imagesData.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const visibleImages = imagesData.slice(currentIndex, currentIndex + 6);

  return (
    <div className="carousel-container">
      <button className="carousel-arrow left" onClick={handlePrevious}>
        &#9664;
      </button>

      <div className="carousel">
        {visibleImages.map((image, idx) => (
          <div key={idx} className="carousel-item">
            <img src={image.src} alt={`img-${currentIndex + idx}`} />
            <div className="title">{image.title}</div>
          </div>
        ))}
      </div>

      <button className="carousel-arrow right" onClick={handleNext}>
        &#9654;
      </button>
    </div>
  );
}

export default Carousel;
