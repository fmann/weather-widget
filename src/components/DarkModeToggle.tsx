import React, { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

const DarkModeToggle = () => {
  const [dark, setDark] = useState<boolean>(true);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="mt-6 pl-4">
      <button onClick={() => darkModeHandler()}>
        {dark && <IoSunny />}
        {!dark && <IoMoon />}
      </button>
    </div>
  );
};

export default DarkModeToggle;
