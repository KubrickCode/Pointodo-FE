import { FC, PropsWithChildren } from "react";
import Navigation from "./Navigation/Navigation";
import Modal from "../Modal/Modal";
import Toast from "../Toast/Toast";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen">
      <Navigation />
      <Modal />
      <Toast />
      {children}
    </div>
  );
};

export default Layout;
