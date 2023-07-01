import { FC } from "react";
import { AuthProps } from "../../types/Auth.type";

const Login: FC<AuthProps> = ({ setTab }) => {
  return (
    <>
      <div>123</div>
      <button onClick={() => setTab(1)}>버튼</button>
    </>
  );
};

export default Login;
