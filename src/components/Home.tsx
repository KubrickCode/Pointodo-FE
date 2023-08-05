import { FC, useEffect } from "react";
import { useQueryGet } from "../hooks/useQueryApi";

const Home: FC = () => {
  const token = localStorage.getItem("accessToken");
  const { data } = useQueryGet("/user", "getUser", {
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) {
      location.href = "/auth";
    }
  }, [token]);
  return (
    <>
      <div>123</div>
      <div>{data?.email}</div>
    </>
  );
};

export default Home;
