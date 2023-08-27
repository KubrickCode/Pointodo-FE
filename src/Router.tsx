import { FC, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useUserStore } from "./store/user.store";
import { Role } from "./entities/user.entity";
import Admin from "./components/Admin/Admin";

const Auth = lazy(() => import("./components/Auth/Auth"));
const Main = lazy(() => import("./components/Main/Main"));
const MyPage = lazy(() => import("./components/MyPage/MyPage"));
const Loading = lazy(() => import("./components/Loading/Loading"));

const Router: FC = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Main /> : <Auth />} />
        <Route path="/my-page" element={<MyPage />} />
        {(user?.role === Role.MASTER || user?.role === Role.ADMIN) && (
          <Route path="/admin" element={<Admin />} />
        )}
      </Routes>
    </Suspense>
  );
};

export default Router;
