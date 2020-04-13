import React from "react";
import { AuthContext } from "../App";

export const Home = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  return (
    <div>
        <h2> Home </h2>
    </div>
  );
};

export default Home;