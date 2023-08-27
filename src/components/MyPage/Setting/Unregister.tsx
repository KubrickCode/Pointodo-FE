import { FC, useState, useEffect } from "react";
import { useModalStore } from "../../../store/modal.store";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { UNREGISTER_LINK } from "../../../shared/constants/user.constant";

const Unregister: FC = () => {
  const [confirmText, setConfirmText] = useState("");
  const [isValid, setIsValid] = useState(false);
  const setModalState = useModalStore((state) => state.setModalState);
  const { mutate } = useQueryMutate();
  const handleSubmit = async () => {
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
  };

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
        <h1 className="text-xl mb-5">회원 탈퇴</h1>
        <div>정말 회원에서 탈퇴하시겠습니까?</div>
        <label className="block my-2 text-sm">
          아래에 "회원 탈퇴" 를 입력하세요
        </label>
        <input
          type="text"
          className="border p-1 rounded my-2"
          placeholder="회원 탈퇴"
          onChange={(e) => setConfirmText(e.target.value)}
        />
        <div className="text-center">
          <button
            className={`border px-2 py-1 rounded mx-1 mt-2 ${
              isValid ? "bg-red-500" : "bg-red-300"
            } text-white`}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            탈퇴
          </button>
          <button
            className="border px-2 py-1 rounded mx-1 mt-2"
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
