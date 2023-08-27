import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignBody, useSign } from "../../hooks/useSign";
import { LOGIN_LINK } from "../../shared/constants/auth.constant";
import {
  AUTH_EMAIL_EMPTY_ERROR,
  AUTH_EMAIL_FORM_ERROR,
  AUTH_EMAIL_LENGTH_EMPTY_ERROR,
  AUTH_PASSWORD_EMPTY_ERROR,
  AUTH_PASSWORD_FORM_ERROR,
} from "../../shared/messages/auth.error";

interface Props {
  setTab(tab: number): void;
}

const Login: FC<Props> = ({ setTab }) => {
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignBody>();

  const { mutate: login } = useSign(LOGIN_LINK);

  const onSubmitHandler: SubmitHandler<SignBody> = async (formData) => {
    login(
      {
        body: formData,
      },
      {
        onSuccess: async () => {
          location.reload();
        },
        onError: async (err: any) => {
          setErrMsg(err.response.data.message);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="p-10">
      <h1 className="text-xl text-center mb-5">로그인</h1>
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
          <div>{AUTH_EMAIL_EMPTY_ERROR}</div>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <div>{AUTH_EMAIL_FORM_ERROR}</div>
        )}
        {errors.email && errors.email.type === "maxLength" && (
          <div>{AUTH_EMAIL_LENGTH_EMPTY_ERROR}</div>
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
          <div>{AUTH_PASSWORD_EMPTY_ERROR}</div>
        )}
        {errors.password && errors.password.type === "pattern" && (
          <div>{AUTH_PASSWORD_FORM_ERROR}</div>
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
      <button
        type="submit"
        className="border py-2 py-1 block w-full my-5 rounded-lg shadow-lg hover:bg-neutral-100 transition-all duration-500"
      >
        로그인
      </button>
      <a
        className="border w-full my-5 rounded-lg py-2 shadow-lg bg-white hover:bg-neutral-100 transition-all duration-500 block text-center"
        href={window.location.origin + "/api/auth/google/callback"}
      >
        <img src="/social/google.png" className="w-6 mr-2 inline" />
        <span>Google 계정으로 로그인</span>
      </a>
      <a
        className="w-full my-5 rounded-lg py-2 shadow-lg bg-[#FEE500] hover:brightness-90 transition-all duration-500 block text-center"
        href={window.location.origin + "/api/auth/kakao/callback"}
      >
        <img src="/social/kakao.png" className="w-5 mr-2 mb-1 inline" />
        <span>카카오 로그인</span>
      </a>
      <button
        type="button"
        className="text-blue-500 hover:text-blue-700 transition-all duration-500 float-right"
        onClick={() => setTab(1)}
      >
        아직 계정이 없으신가요? 회원가입 하러가기
      </button>
    </form>
  );
};

export default Login;
