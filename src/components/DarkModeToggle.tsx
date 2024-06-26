import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

interface DarkModeToggleProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ dark, setDark }) => {
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="mt-6 pl-4">
      <button onClick={() => darkModeHandler()}>
        {dark && <IoSunny size={24} />}
        {!dark && <IoMoon size={24} />}
      </button>
    </div>
  );
};

export default DarkModeToggle;
