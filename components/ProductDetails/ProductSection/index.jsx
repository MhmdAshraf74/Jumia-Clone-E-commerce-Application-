import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  Pagination,
  Mousewheel,
  FreeMode,
  Scrollbar,
} from "swiper/modules";
import { useWindowSize } from "@uidotdev/usehooks";
import Styles from "./ProductSection.module.css";

const ProductSection = (props) => {
  const size = useWindowSize();

  const renderSlides = props.data.map((card, idx) => (
    <SwiperSlide key={idx} className={Styles.content}>
      <div className={`tol px-2${Styles.content}`}>
        <div>
          <img src={card.imageUrl} alt={card.name} />
        </div>
        <div className={Styles.products}>
          <div style={{ width: "100%" }}>
            <p className={Styles.p1}>{card.name}</p>
          </div>
          <p className={Styles.p2}>
            {card.newPrice} <br />
            <span className={Styles.p3}>{card.oldPrice}</span>
          </p>
        </div>
      </div>
    </SwiperSlide>
  ));
  return (
    <div className="my-3">
      <div>
        <div className={Styles.cover}>
          <Swiper
            slidesPerView={size.width < 1034 ? 3 : 6}
            spaceBetween={10}
            mousewheel={{
              enabled: true,
              forceToAxis: true,
            }}
            freeMode={true}
            scrollbar={true}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination, Autoplay, Mousewheel, FreeMode, Scrollbar]}
            className="mySwiper"
          >
            {renderSlides}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
