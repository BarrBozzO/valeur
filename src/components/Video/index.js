import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import styles from "./Video.module.scss";

class Video extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    type: PropTypes.string,
  };

  static defaultOptions = {
    type: "video/mp4",
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.video = null;
  }

  componentDidMount() {
    if (this.video) {
      if (this.video.readyState === 4) {
        // already loaded
        this.setState({ loading: false });
      } else {
        this.video.addEventListener("loadeddata", () => {
          this.setState({ loading: false });
        });
      }
    }
  }

  componentWillUnmount() {
    if (this.video) {
      this.video.removeEventListener("loadeddata", () => undefined);
    }
  }

  render() {
    const { source, type, className } = this.props;

    return (
      <div
        className={cx(styles["video"], {
          [className]: Boolean(className),
        })}
      >
        <video
          ref={node => (this.video = node)}
          autoPlay
          muted
          loop
          style={{
            opacity: this.state.loading ? 0 : 1,
          }}
          className={styles["video__player"]}
          preload="auto"
        >
          <source src={source} type={type} />
        </video>
      </div>
    );
  }
}

export default Video;
