import { FC, useCallback, useState } from "react";
import { useModalStore } from "../../../store/modal.store";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { useToastStore } from "../../../store/toast.store";
import { CHECK_PASSWORD_LINK } from "../../../shared/constants/auth.constant";
import { CHANGE_PASSWORD_LINK } from "../../../shared/constants/user.constant";
import { CHANGE_PASSWORD_MESSAGE } from "../../../shared/messages/user.message";

const initialBody = {
  password: "",
  newPassword: "",
};

const ChangePassword: FC = () => {
  const setModalState = useModalStore((state) => state.setModalState);
  const setToastState = useToastStore((state) => state.setToastState);

  const [body, setBody] = useState(initialBody);
  const [errMsg, setErrMsg] = useState("");

  const { mutate } = useQueryMutate();

  const handleSubmit = useCallback(async () => {
    mutate(
      {
        link: CHECK_PASSWORD_LINK,
        method: "post",
        body: { password: body.password },
      },
      {
        onSuccess: async () => {
          mutate(
            {
              link: CHANGE_PASSWORD_LINK,
              method: "patch",
              body: { password: body.newPassword },
            },
            {
              onSuccess: async () => {
                setModalState(false);
                setToastState(true, CHANGE_PASSWORD_MESSAGE, "success");
              },
            }
          );
        },
        onError: async (err: any) => {
          setErrMsg(err.response.data.message);
        },
      }
    );
  }, [body]);

  return (
    <>
      <div>
        <h1 className="text-xl mb-5 dark:text-neutral-200">비밀번호 변경</h1>
        <div>
          <label className="dark:text-neutral-200">현재 비밀번호</label>
          <input
            type="password"
            className="block border my-2 rounded p-1"
            onChange={(e) => setBody({ ...body, password: e.target.value })}
          />
        </div>
        <div>
          <label className="dark:text-neutral-200">새 비밀번호</label>
          <input
            type="password"
            className="block border my-2 rounded p-1"
            onChange={(e) => setBody({ ...body, newPassword: e.target.value })}
          />
        </div>
        {errMsg && (
          <div className="my-2 text-center text-red-400">{errMsg}</div>
        )}
        <div className="text-center mt-4">
          <button
            className="border px-2 py-1 mr-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 dark:border-0"
            onClick={handleSubmit}
          >
            변경
          </button>
          <button
            className="border px-2 py-1 rounded-lg mx-1 bg-neutral-100 hover:bg-neutral-300 dark:border-0 dark:bg-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
            onClick={() => setModalState(false)}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
