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

  return (
    <div className="flex flex-row">
      <div className="basis-1/2">
        <video autoPlay muted playsInline>
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="basis-1/2">
        {tab === 0 ? <Login setTab={setTab} /> : <Register setTab={setTab} />}
      </div>
    </div>
  );
};

export default Auth;
