import { FC, useEffect } from "react";
import { useUserStore } from "../../store/user.store";

const Admin: FC = () => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user?.role !== ("MASTER" || "ADMIN")) {
      location.href = "/";
    }
  }, [user]);

  return (
    <>
      <div>123</div>
    </>
  );
};

export default Admin;
