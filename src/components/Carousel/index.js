import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlayUtil } from "react-swipeable-views-utils";
import cx from "classnames";

import Arrow from "assets/icons/carousel-arrow.svg";

import styles from "./Carousel.module.scss";

function Carousel({
  children,
  autoPlay,
  containerStyle,
  slideStyle,
  customControl,
  className,
  animationConfig,
  controlsPosition,
  classNames,
}) {
  const [current, setCurrent] = useState(0);
  const Views = autoPlay ? autoPlayUtil(SwipeableViews) : SwipeableViews;
  const total = React.Children.count(children);

  const defaultControlElement = () => (
    <Arrow className={styles["carousel__controls-default-icon"]} />
  );

  const renderControls = () => {
    const ControlElement = customControl
      ? customControl
      : defaultControlElement;

    return (
      <div
        className={cx(styles["carousel__controls"], {
          [styles["carousel__controls--in"]]: controlsPosition === "in",
          [styles["carousel__controls--out"]]: controlsPosition === "out",
          [classNames.controls]: Boolean(classNames.controls),
        })}
      >
        {current + 1 < total && (
          <div
            className={cx(styles["carousel__controls-next"], {
              [classNames.controlElement]: Boolean(classNames.controlElement),
            })}
            onClick={onNext}
          >
            <ControlElement />
          </div>
        )}
        {current > 0 && (
          <div
            className={cx(styles["carousel__controls-prev"], {
              [classNames.controlElement]: Boolean(classNames.controlElement),
            })}
            onClick={onPrev}
          >
            <ControlElement />
          </div>
        )}
      </div>
    );
  };

  const onNext = () => {
    return setCurrent(current + 1);
  };

  const onPrev = () => {
    return setCurrent(current - 1);
  };

  return (
    <div className={cx(styles["carousel__wrapper"], className)}>
      {renderControls()}
      <Views
        className={styles["carousel"]}
        index={current}
        onChangeIndex={setCurrent}
        containerStyle={containerStyle}
        slideStyle={slideStyle}
        enableMouseEvents
        resistance
        springConfig={animationConfig}
      >
        {children}
      </Views>
    </div>
  );
}

Carousel.defaultProps = {
  autoPlay: false,
  classNames: {},
  controlsPosition: "in",
};

export default Carousel;
