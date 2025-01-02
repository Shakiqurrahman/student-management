import React, { createContext, useState } from "react";

const ActiveContext = createContext({
  isActive: false,
  toggleHamburger: () => {},
});

const ActiveProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleHamburger = () => setIsActive((prev) => !prev);

  return (
    <ActiveContext.Provider value={{ isActive, toggleHamburger }}>
      {children}
    </ActiveContext.Provider>
  );
};

export { ActiveContext, ActiveProvider };
