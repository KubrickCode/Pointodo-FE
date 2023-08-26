import { FC, useEffect } from "react";
import Router from "./Router";
import Layout from "./components/Layout/Layout";
import { useQueryGet } from "./hooks/useQueryApi";
import { useUserStore } from "./store/user.store";

const App: FC = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);
  const setUser = useUserStore((state) => state.setUser);

  const { data: loggedInStatus } = useQueryGet("/auth/status", "getIsLoggedIn");
  const { data: user } = useQueryGet("/user", "getUser", {
    enabled: !!isLoggedIn,
  });

  useEffect(() => {
    setIsLoggedIn(loggedInStatus ?? false);
  }, [loggedInStatus]);

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
