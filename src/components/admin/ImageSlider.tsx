import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageUploader from "./ImageUploader";

interface ImageSliderProps {
  images: string[];
  productId?: string | undefined;
  openFullView?: boolean;
  isProductCard?: boolean;
  isSingleProductPage?: boolean;
  width?: string;
  height?: string;
}

const ImageSlider = ({
  images,
  productId,
  openFullView,
  isProductCard,
  isSingleProductPage,
}: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateSlideConfig = useCallback(() => {
    if (swiper) {
      setActiveIndex(swiper.activeIndex);
    }
  }, [swiper]);

  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", updateSlideConfig);
    }

    return () => {
      if (swiper) swiper.off("slideChange", updateSlideConfig);
    };
  }, [swiper, updateSlideConfig]);

  const onChangeImage = useCallback(
    (e: string) => {
      const indexUrl = images.findIndex((url) => {
        return url == e;
      });

      swiper?.slideTo(indexUrl);
    },
    [swiper, images]
  );

  const activeButtonStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inActiveButtonStyles = "hidden text-gray-400";

  const containerClasses = openFullView
    ? "w-[38rem] h-[28rem]"
    : isProductCard
    ? "w-[19.5rem] h-[19.5rem]"
    : isSingleProductPage
    ? "w-[20rem] h-[19rem] md:w-[32rem] md:h-[31rem]"
    : "w-[25.5rem] h-[20rem]";

  const imageClasses = openFullView
    ? "w-[28rem] h-[28rem]"
    : isProductCard
    ? "w-[19.5rem] h-[19.5rem]"
    : isSingleProductPage
    ? "w-[20rem] h-[19rem] md:w-[32rem] md:h-[31rem]"
    : "h-[19rem] w-[19rem]";

  const extraImagesClasses = openFullView
    ? "w-36 h-36"
    : isSingleProductPage
    ? "w-[5rem] h-[5rem] md:w-[7.6rem] md:h-[7.6rem]"
    : "w-24 h-24";

  return (
    <div className="flex flex-col items-center">
      <div
        className={`group relative bg-zinc-100 overflow-hidden rounded-xl ${containerClasses}`}
      >
        <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
          <button
            aria-label="next"
            className={`${activeButtonStyles} right-3 ${
              activeIndex === images?.length - 1 && inActiveButtonStyles
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              swiper?.slideNext();
            }}
          >
            <BiChevronRight size={24} />
          </button>
          <button
            aria-label="previous"
            className={`${activeButtonStyles} left-3 ${
              activeIndex === 0 && inActiveButtonStyles
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              swiper?.slidePrev();
            }}
          >
            <BiChevronLeft size={24} />
          </button>
        </div>

        <Swiper
          pagination={{
            renderBullet: (_, className) => {
              return `<span class="rounded-full transition ${className}"></span>`;
            },
          }}
          onSwiper={(swiper) => setSwiper(swiper)}
          spaceBetween={50}
          modules={[Pagination]}
          slidesPerView={1}
          className={` flex items-center justify-center ${imageClasses}`}
        >
          {images?.map((image, i) => (
            <SwiperSlide key={i}>
              <Image
                src={image}
                alt="image"
                fill
                loading="eager"
                className="-z-10 object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {!isProductCard && (
        <div className="w-full grid grid-cols-4 gap-2 mt-2">
          {images?.map((image) => (
            <div
              key={image}
              className={`${extraImagesClasses} bg-zinc-100 flex items-center justify-center rounded-lg cursor-pointer`}
              onClick={() => onChangeImage(image)}
            >
              <Image
                src={image}
                width={100}
                height={100}
                className={`${extraImagesClasses} object-contain`}
                alt="image"
              />
            </div>
          ))}
          {!isSingleProductPage && (
            <ImageUploader
              images={images}
              productId={productId}
              action="addMoreImage"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
