import { FC, useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth: FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="md:flex md:flex-row h-full">
      <div className="hidden md:block basis-1/2">
        <video autoPlay muted playsInline className="h-full object-fill">
          <source src="/intro.mp4" type="video/mp4" />
          영상을 지원하지 않는 브라우저 입니다
        </video>
      </div>
      <div className="basis-1/2">
        {tab === 0 ? <Login setTab={setTab} /> : <Register setTab={setTab} />}
      </div>
    </div>
  );
};

export default Auth;
