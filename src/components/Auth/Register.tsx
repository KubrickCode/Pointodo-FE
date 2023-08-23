import { FC, useState } from "react";
import { AuthProps, RegisterForm } from "../../types/auth.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSign } from "../../hooks/useSign";

const Register: FC<AuthProps> = ({ setTab }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const { mutate: signUp } = useSign("/user/register");
  const { mutate: login } = useSign("/auth/login");

  const [errMsg, setErrMsg] = useState("");

  const onSubmitHandler: SubmitHandler<RegisterForm> = (data) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    signUp(
      {
        body,
      },
      {
        onSuccess: async () => {
          login(
            {
              body,
            },
            {
              onSuccess: async (data) => {
                localStorage.setItem("accessToken", data.accessToken);
                location.reload();
              },
            }
          );
        },
        onError: async (err: any) => {
          setErrMsg(err.response.data.message);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="p-10">
      <h1 className="text-xl text-center mb-5">회원가입</h1>
      <div className="my-4">
        <label className="block my-2 text-sm">이메일</label>
        <input
          type="email"
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            maxLength: 255,
          })}
          className="border p-1 rounded w-full outline-neutral-300"
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
      <div className="my-4">
        <label className="block my-2 text-sm">비밀번호</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/,
          })}
          className="border p-1 rounded w-full outline-neutral-300"
        />
        {errors.password && errors.password.type === "required" && (
          <div>비밀번호를 입력해 주세요</div>
        )}
        {errors.password && errors.password.type === "pattern" && (
          <div>비밀번호는 6~20자 영문,숫자,특수문자 혼합입니다</div>
        )}
      </div>
      <div className="my-4">
        <label className="block my-2 text-sm">비밀번호 확인</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === watch("password"),
          })}
          className="border p-1 rounded w-full outline-neutral-300"
        />
        {errors.confirmPassword &&
          errors.confirmPassword.type === "required" && (
            <div>비밀번호를 입력해 주세요</div>
          )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "validate" && (
            <div>비밀번호가 일치하지 않습니다</div>
          )}
      </div>
      {errMsg.length > 0 && (
        <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50">
          <svg
            className="flex-shrink-0 inline w-4 h-4 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div>
            <span className="font-medium">{errMsg}</span>
          </div>
        </div>
      )}
      <button className="border py-2 py-1 block w-full my-5 rounded-lg shadow-lg hover:bg-neutral-100 transition-all duration-500">
        회원가입
      </button>
      <button
        className="text-blue-500 hover:text-blue-700 transition-all duration-500 float-right"
        onClick={() => setTab(0)}
      >
        이미 계정이 있으신가요? 로그인 하러가기
      </button>
    </form>
  );
};

export default Register;
