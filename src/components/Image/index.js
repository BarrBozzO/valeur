import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

export default ({ imgStyle, className, ...props }) => {
  if (!data) return null;

  return (
    <Img
      fluid={data.fluid}
      imgStyle={imgStyle}
      className={className}
      {...props}
    />
  );
};
