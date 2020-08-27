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

function Link({ children, className, activeClassName, to, onClick }) {
  return (
    <TransitionLink
      exit={{
        ...exitTransition,
        state: {
          next: to,
        },
      }}
      entry={{
        ...entryTransition,
        state: {
          prev: to,
        },
      }}
      to={to}
      className={className}
      activeClassName={activeClassName}
      onClick={onClick}
    >
      {children}
    </TransitionLink>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
};

export default Link;
