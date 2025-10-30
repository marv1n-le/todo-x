import React from "react";

const Header = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
        <TodoX></TodoX>
      </h1>
      <p className="text-muted-foreground">
        Hổng có việc gì khó, chỉ sợ mình hổng làm 💪
      </p>
    </div>
  );
};

export default Header;
