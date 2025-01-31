import React from "react";
import Carousel from "components/Carousel";
import Img from "gatsby-image";

import styles from "./ImagesCarousel.module.scss";

function ImagesCarousel({ images, carouselClassNames }) {
  const renderImage = image => {
    if (image.fluid) {
      const {
        url,
        details: {
          image: { width, height },
        },
      } = image.file;
      const imgStyle = {
        objectFit: "contain",
        maxHeight: "100%",
        maxWidth: "100%",
      };

      return (
        <Img
          style={{ width: "100%", height: "100%" }}
          imgStyle={imgStyle}
          fluid={image.fluid}
        />
      );
    }

    return null;
  };

  if (!images) return null;

  return (
    <div className={styles["carousel"]}>
      <Carousel
        containerStyle={{ width: "100%", height: "100%" }}
        slideStyle={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
        controlsPosition={"out"}
        classNames={carouselClassNames}
      >
        {images.map((i, index) => (
          <div key={index} className={styles["carousel__item"]}>
            {renderImage(i)}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

ImagesCarousel.defaultProps = {
  classNames: {},
};

export default ImagesCarousel;
