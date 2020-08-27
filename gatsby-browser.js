import "./src/styles/global.scss";
import React from "react";
import Provider from "./src/context/GlobalContextProvider";

export const wrapRootElement = ({ element }) => <Provider>{element}</Provider>;
