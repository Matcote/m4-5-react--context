import React from "react";

const usePersistedState = (value, name) => {
  let storage = window.localStorage.getItem(name);
  return React.useState(() => {
    if (storage !== null) {
      return JSON.parse(storage);
    } else {
      return value;
    }
  });
};

export default usePersistedState;
