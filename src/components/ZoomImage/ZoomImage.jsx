import { useState, useRef } from "react";

const ZoomImage = ({ smallImage, largeImage }) => {
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollY) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setPos({ x, y });
  };

  return (
    <div className="relative w-full">
      {/* Small Image */}
      <img
        ref={imgRef}
        src={smallImage}
        alt=""
        className="w-full h-full object-cover rounded-lg"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      />

      {/* Zoomed Large Image (Desktop only) */}
      {zoom && (
        <div className="hidden md:block absolute top-0 left-[105%] w-[350px] h-[350px] overflow-hidden rounded-lg border shadow-lg bg-white z-50">
          <img
            src={largeImage}
            alt="zoom"
            className="absolute w-[800px]"
            style={{
              top: `${-pos.y * 3}%`,
              left: `${-pos.x * 3}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ZoomImage;