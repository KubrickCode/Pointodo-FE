import { FC, useEffect, useState } from "react";
import { AuthProps, LoginForm } from "../../types/Auth.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSign } from "../../hooks/useSign";
import { useQueryGet, useQueryMutate } from "../../hooks/useQueryApi";

const Login: FC<AuthProps> = ({ setTab }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const token = localStorage.getItem("accessToken");
  const [isLogin, setIsLogin] = useState(false);

  const { mutate: login } = useSign("/auth/login");
  const { mutate: logout } = useQueryMutate("/auth/logout", "post");
  // const { data: refresh } = useQueryGet("/auth/refresh", "refresh", {
  //   enabled: !!isLogin,
  // });

  useEffect(() => {
    setIsLogin(token ? true : false);
  }, [token]);

  const onSubmitHandler: SubmitHandler<LoginForm> = async (formData) => {
    login(
      {
        body: formData,
      },
      {
        onSuccess: async (data) => {
          localStorage.setItem("accessToken", data.accessToken);
          location.reload();
        },
      }
    );
  };

  const handleLogout = async () => {
    logout(
      {},
      {
        onSuccess: async () => {
          localStorage.removeItem("persistStore");
          localStorage.removeItem("accessToken");
          location.reload();
        },
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h1 className="text-xl">로그인</h1>
      <div className="my-2">
        <label className="block my-2">이메일</label>
        <input
          type="email"
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            maxLength: 255,
          })}
          className="border p-1 rounded"
        />
        {errors.email && errors.email.type === "required" && (
          <div>이메일을 입력해 주세요</div>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <div>이메일 양식을 확인하세요</div>
        )}
        {errors.email && errors.email.type === "maxLength" && (
          <div>이메일 허용길이를 초과하였습니다</div>
        )}
      </div>
      <div className="my-2">
        <label className="block my-2">비밀번호</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/,
          })}
          className="border p-1 rounded"
        />
        {errors.password && errors.password.type === "required" && (
          <div>비밀번호를 입력해 주세요</div>
        )}
        {errors.password && errors.password.type === "pattern" && (
          <div>비밀번호는 6~20자 영문,숫자,특수문자 혼합입니다</div>
        )}
      </div>
      <button className="border px-2 py-1 mr-2">로그인</button>
      <button className="border px-2 py-1 mr-2" onClick={() => setTab(1)}>
        회원가입 하러가기
      </button>
      <button
        onClick={handleLogout}
        className={`${!isLogin && "hidden"} border px-2 py-1`}
      >
        로그아웃
      </button>
      <button>실험</button>
      <div className={`${!isLogin && "hidden"}`}>로그인 상태 입니다</div>
      <div className={`${isLogin && "hidden"}`}>로그인 상태가 아닙니다</div>
    </form>
  );
};

export default Login;
