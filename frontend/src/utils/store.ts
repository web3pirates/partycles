import { useReducer } from "react";
import { createContainer } from "react-tracked";

export const actions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

type State = {
  isLoggedIn: boolean;
  user: any;
};
export const initialState: State = {
  isLoggedIn: false,
  user: null,
};

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(() => useReducer(reducer, initialState));

type action = {
  type: string;
  payload?: any;
};

export const reducer = (state: State, action: action): State => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }

    default:
      return state;
  }
};
