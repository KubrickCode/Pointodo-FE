import { FC, useState, useEffect, useCallback } from "react";
import { useModalStore } from "../../../store/modal.store";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { UNREGISTER_LINK } from "../../../shared/constants/user.constant";

const Unregister: FC = () => {
  const setModalState = useModalStore((state) => state.setModalState);

  const [confirmText, setConfirmText] = useState("");
  const [isValid, setIsValid] = useState(false);

  const { mutate } = useQueryMutate();

  const handleSubmit = useCallback(async () => {
    mutate(
      {
        link: UNREGISTER_LINK,
        method: "delete",
      },
      {
        onSuccess: async () => {
          location.href = "/";
        },
      }
    );
  }, []);

  useEffect(() => {
    if (confirmText === "회원 탈퇴") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [confirmText]);

  return (
    <>
      <div>
        <h1 className="text-xl mb-5 dark:text-neutral-200">회원 탈퇴</h1>
        <div className="dark:text-neutral-200">
          정말 회원에서 탈퇴하시겠습니까?
        </div>
        <label className="block my-2 text-sm dark:text-neutral-200">
          아래에 "회원 탈퇴" 를 입력하세요
        </label>
        <input
          type="text"
          className="border p-1 rounded my-2 dark:bg-neutral-600 dark:text-neutral-200 dark:border-0"
          placeholder="회원 탈퇴"
          onChange={(e) => setConfirmText(e.target.value)}
        />
        <div className="text-center mt-4">
          <button
            className={`border-2 text-white px-2 py-1 rounded-lg mx-1 dark:border-0 mx-1 ${
              isValid ? "bg-red-500 hover:bg-red-600" : "bg-red-300"
            } text-white`}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            탈퇴
          </button>
          <button
            className="border-2 px-2 py-1 mr-2 rounded-lg bg-white hover:bg-neutral-200 dark:border-0 mx-1"
            onClick={() => setModalState(false)}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default Unregister;
