import { FC, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Auth = lazy(() => import("./components/Auth/Auth"));

const Router: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
