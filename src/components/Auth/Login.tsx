import { FC, useState, useCallback, ChangeEvent } from "react";
import { AuthProps, UserForm } from "../../types/Auth.type";

const Login: FC<AuthProps> = ({ setTab }) => {
  const [user, setUser] = useState<UserForm>({ email: "", password: "" });

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [setUser]
  );

  const onSubmit = useCallback(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <h1 className="text-xl">로그인</h1>
      <div className="my-2">
        <label className="block my-2">이메일</label>
        <input
          type="email"
          name="email"
          className="border p-1 rounded"
          onChange={handleChangeInput}
        />
      </div>
      <div className="my-2">
        <label className="block my-2">비밀번호</label>
        <input
          type="password"
          name="password"
          className="border p-1 rounded"
          onChange={handleChangeInput}
        />
      </div>
      <button className="border px-2 py-1 mr-2" onClick={onSubmit}>
        로그인
      </button>
      <button className="border px-2 py-1" onClick={() => setTab(1)}>
        회원가입 하러가기
      </button>
    </div>
  );
};

export default Login;
