import { FC, useEffect } from "react";
import Router from "./Router";
import Layout from "./components/Layout/Layout";
import { useQueryGet } from "./hooks/useQueryApi";
import { useUserStore } from "./store/user.store";

const App: FC = () => {
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);
  const { data: user } = useQueryGet("/user", "getUser", {
    enabled: !!isLoggedIn,
  });
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <Layout>
      <Router />
    </Layout>
  );
};

export default App;
