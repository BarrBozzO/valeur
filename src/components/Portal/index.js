import { useEffect } from "react";
import { createPortal } from "react-dom";

function Portal(props) {
  const portal = document.getElementById("portal");
  const wrapper = document.createElement("div");

  useEffect(() => {
    portal.appendChild(wrapper);

    return () => {
      portal.removeChild(wrapper);
    };
  }, [portal, wrapper]);

  return createPortal(props.children, wrapper);
}

export default Portal;
