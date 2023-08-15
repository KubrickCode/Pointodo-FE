import { FC } from "react";
import { AuthProps, LoginForm } from "../../types/Auth.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSign } from "../../hooks/useSign";

const Login: FC<AuthProps> = ({ setTab }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const { mutate: login } = useSign("/auth/login");

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
