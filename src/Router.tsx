import { FC, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Auth = lazy(() => import("./components/Auth/Auth"));
const Social = lazy(() => import("./components/Auth/Social"));

const Router: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/social-login" element={<Social />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
