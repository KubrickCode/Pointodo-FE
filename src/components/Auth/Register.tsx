import { FC } from "react";
import { AuthProps } from "../../types/Auth.type";

const Register: FC<AuthProps> = ({ setTab }) => {
  return (
    <>
      <div>456</div>
      <button onClick={() => setTab(0)}>버튼</button>
    </>
  );
};

export default Register;
