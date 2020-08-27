import React, { useReducer, createContext } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_NAVIGATION":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          isCollapsed: !state.navigation.isCollapsed,
        },
      };
    case "COLLAPSE_NAVIGATION":
      return {
        ...state,
        navigation: {
          ...state.navigation,
          isCollapsed: true,
        },
      };
    default:
      return console.error("Wrong action type");
  }
};

const initialState = {
  navigation: {
    isCollapsed: true,
  },
  portals: [],
};

export const GlobalStateProvider = createContext();

export const GlobalDispatchProvider = createContext();

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateProvider.Provider value={state}>
      <GlobalDispatchProvider.Provider value={dispatch}>
        {children}
      </GlobalDispatchProvider.Provider>
    </GlobalStateProvider.Provider>
  );
}

export default GlobalContextProvider;
