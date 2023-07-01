import { ChangeEvent, FC, useCallback, useState } from "react";
import { AuthProps, UserForm } from "../../types/Auth.type";

const Register: FC<AuthProps> = ({ setTab }) => {
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
      <h1 className="text-xl">회원가입</h1>
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
      <div className="my-2">
        <label className="block my-2">비밀번호 확인</label>
        <input type="password" className="border p-1 rounded" />
      </div>
      <button className="border px-2 py-1 mr-2" onClick={onSubmit}>
        회원가입
      </button>
      <button className="border px-2 py-1" onClick={() => setTab(0)}>
        로그인 하러가기
      </button>
    </div>
  );
};

export default Register;
