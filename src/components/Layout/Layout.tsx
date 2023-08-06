import { FC, PropsWithChildren } from "react";
import Navigation from "./Navigation/Navigation";
import Modal from "../Modal/Modal";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navigation />
      <Modal />
      {children}
    </>
  );
};

export default Layout;
