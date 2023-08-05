import { FC, PropsWithChildren } from "react";
import Navigation from "./Navigation/Navigation";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
