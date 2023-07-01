import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

const RouterProvider = ({ children }: PropsWithChildren) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterProvider;
