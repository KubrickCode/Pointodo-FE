import { FC, useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth: FC = () => {
  const [tab, setTab] = useState(0);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      location.href = "/";
    }
  }, [token]);

  return tab === 0 ? <Login setTab={setTab} /> : <Register setTab={setTab} />;
};

export default Auth;
