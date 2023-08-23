import { FC, useEffect } from "react";
import { useQueryGet } from "../../hooks/useQueryApi";
import { SOCIAL_LOGIN_LINK } from "../../shared/constants/auth.constant";
import { QUERY_KEY_SOCIAL_LOGIN } from "../../shared/constants/query.constant";

const Social: FC = () => {
  const { data } = useQueryGet(SOCIAL_LOGIN_LINK, QUERY_KEY_SOCIAL_LOGIN);
  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      location.href = "/";
    }
  }, [data]);
  return <></>;
};

export default Social;
