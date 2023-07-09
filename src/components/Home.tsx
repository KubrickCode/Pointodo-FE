import { FC } from "react";
import { useQueryGet } from "../hooks/useQueryApi";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const token = localStorage.getItem("accessToken");
  const { data } = useQueryGet("/user", "getUser", {
    enabled: !!token,
  });
  return (
    <>
      <div>123</div>
      <div>{data?.email}</div>
      <Link to="/auth" className="border">
        Auth로
      </Link>
    </>
  );
};

export default Home;
