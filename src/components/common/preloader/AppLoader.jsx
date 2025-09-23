import React from "react";
import classes from "./AppLoader.module.css";

const AppLoader = () => {
  return (
    <div className={classes.appLoader}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default AppLoader;
