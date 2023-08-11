import { FC, useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { useUserStore } from "../../store/user.store";

const Auth: FC = () => {
  const [tab, setTab] = useState(0);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      location.href = "/";
    }
  }, [isLoggedIn]);

  return tab === 0 ? <Login setTab={setTab} /> : <Register setTab={setTab} />;
};

export default Auth;
