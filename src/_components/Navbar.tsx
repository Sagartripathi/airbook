import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-black p-4 text-white">
      <div className="text-2xl font-bold">Airbook</div>
      <div className="flex items-center gap-4">
        <button>Home</button>
        <button>About</button>
      </div>
    </div>
  );
};

export default Navbar;
