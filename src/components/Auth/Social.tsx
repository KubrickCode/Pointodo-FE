import { FC, useEffect } from "react";
import { useQueryGet } from "../../hooks/useQueryApi";

const Social: FC = () => {
  const { data } = useQueryGet("/auth/social-login", "socialLogin");
  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      location.href = "/";
    }
  }, [data]);
  return (
    <>
      <div>123</div>
    </>
  );
};

export default Social;
