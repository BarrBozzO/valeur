import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlayUtil } from "react-swipeable-views-utils";
import Arrow from "assets/icons/carousel-arrow.svg";

import styles from "./Carousel.module.scss";

function Carousel({ children, autoPlay, containerStyle, slideStyle }) {
  const [current, setCurrent] = useState(0);
  const Views = autoPlay ? autoPlayUtil(SwipeableViews) : SwipeableViews;
  const total = React.Children.count(children);

  const onNext = () => {
    return setCurrent(current + 1);
  };

  const onPrev = () => {
    return setCurrent(current - 1);
  };

  return (
    <div className={styles["carousel__wrapper"]}>
      <div className={styles["carousel__controls"]}>
        {current + 1 < total && (
          <div className={styles["carousel__controls-next"]} onClick={onNext}>
            <Arrow />
          </div>
        )}
        {current > 0 && (
          <div className={styles["carousel__controls-prev"]} onClick={onPrev}>
            <Arrow />
          </div>
        )}
      </div>
      <Views
        className={styles["carousel"]}
        index={current}
        onChangeIndex={setCurrent}
        containerStyle={containerStyle}
        slideStyle={slideStyle}
        enableMouseEvents
        resistance
      >
        {children}
      </Views>
    </div>
  );
}

Carousel.defaultProps = {
  autoPlay: false,
};

export default Carousel;
