import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Carousel.css";

const slides = [
  {
    product_id: 1,
    src: "https://comicbook.com/wp-content/uploads/sites/4/2022/04/c56ca0df-133d-4874-af84-6bc6962bf95d.jpg",
    alt: "spider-man",
  },
  {
    product_id: 2,
    src: "https://sm.ign.com/ign_ap/editorial/t/the-top-27/the-top-27-best-batman-comics-and-graphic-novels_stqs.jpg",
    alt: "batman",
  },
  {
    product_id: 3,
    src: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/05/x-men-cyclops-wolverine-best-powers.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
    alt: "x-men",
  },
  {
    product_id: 4,
    src: "https://www.syfy.com/sites/syfy/files/styles/hero_image__large__computer__alt_1_5x/public/2019/11/screen-shot-2019-11-11-at-10.14.14-am.png",
    alt: "watchmen",
  },
  {
    product_id: 5,
    src: "https://preview.redd.it/what-writers-make-the-best-superman-comics-v0-sxq3yqk7kcba1.jpg?auto=webp&s=bb89abb64512eb493ee44f0c5c0a17cf810ce918",
    alt: "superman",
  },
  {
    product_id: 6,
    src: "https://cdn.marvel.com/content/1x/002irm_com_fea_dsk_01.jpg",
    alt: "iron-man",
  },
];

export default function Carousel() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
  const products = useSelector((state) => Object.values(state.products.allProducts));

  const nextSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleImageClick = (productId) => {
    const productExists = products.some((product) => product.id === productId);
    if (productExists) {
      navigate(`/products/${productId}`);
    } else {
      window.alert("Unfortunately, this item is no longer available.");
    }
  };

  return (
    <div className="main">
      <h1>🔥 Check Out Our Best Sellers - Trending Now!</h1>
      <div className="carousel">
        <BsArrowLeftCircleFill
          onClick={prevSlide}
          className="arrow arrow-left"
        />
        {slides.map((item, idx) => (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
            onClick={() => handleImageClick(item.product_id)}
          />
        ))}
        <BsArrowRightCircleFill
          onClick={nextSlide}
          className="arrow arrow-right"
        />
        <span className="indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          ))}
        </span>
      </div>
    </div>
  );
}
