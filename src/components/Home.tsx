import { FC } from "react";
import { useQueryGet } from "../hooks/useQueryApi";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const { data } = useQueryGet("/user", "getUser");
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
