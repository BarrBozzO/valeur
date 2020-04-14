import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import PropTypes from "prop-types";

const TRANSITION_LENGTH = 0.4;

const exitTransition = {
  length: TRANSITION_LENGTH,
};
const entryTransition = {
  delay: TRANSITION_LENGTH,
};

function Link({ children, activeClassName, to }) {
  return (
    <TransitionLink
      exit={exitTransition}
      entry={entryTransition}
      to={to}
      activeClassName={activeClassName}
    >
      {children}
    </TransitionLink>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
};

export default Link;
