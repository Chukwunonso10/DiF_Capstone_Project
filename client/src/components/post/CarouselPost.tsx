import type { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

interface CarouselPostProps {
  username: string;
  location: string;
  images: string[];
  caption: string;
}

const CarouselPost: FC<CarouselPostProps> = ({ username, location, images, caption }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <img
            src={`https://i.pravatar.cc/50?u=${username}`}
            alt={username}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">{username}</p>
            <p className="text-xs text-gray-500">{location}</p>
          </div>
        </div>
        <button className="text-xl">⋮</button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-96"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="px-4 py-2">
        <div className="flex gap-4 text-xl mb-2">
          <button>❤️</button>
          <button>💬</button>
          <button>📩</button>
        </div>
        <p className="font-semibold text-sm">{username}</p>
        <p className="text-sm">{caption}</p>
      </div>
    </div>
  );
};

export default CarouselPost;
