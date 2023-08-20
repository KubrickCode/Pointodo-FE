import { FC, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useUserStore } from "./store/user.store";

const Auth = lazy(() => import("./components/Auth/Auth"));
const Social = lazy(() => import("./components/Auth/Social"));
const Main = lazy(() => import("./components/Main/Main"));
const Admin = lazy(() => import("./components/Admin/Admin"));
const MyPage = lazy(() => import("./components/MyPage/MyPage"));
const Loading = lazy(() => import("./components/Loading/Loading"));

const Router: FC = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Main /> : <Auth />} />
        <Route path="/social-login" element={<Social />} />
        <Route path="/my-page" element={<MyPage />} />
        {(user?.role === "MASTER" || user?.role === "ADMIN") && (
          <Route path="/admin" element={<Admin />} />
        )}
      </Routes>
    </Suspense>
  );
};

export default Router;
