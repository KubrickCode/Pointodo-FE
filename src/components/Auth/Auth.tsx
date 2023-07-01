import { FC, useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth: FC = () => {
  const [tab, setTab] = useState(0);
  return tab === 0 ? <Login setTab={setTab} /> : <Register setTab={setTab} />;
};

export default Auth;
