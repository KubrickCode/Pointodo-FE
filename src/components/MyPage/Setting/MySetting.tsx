import { FC, useEffect, useState } from "react";
import { useUserStore } from "../../../store/user.store";
import { useQueryGet } from "../../../hooks/useQueryApi";
import { useModalStore } from "../../../store/modal.store";
import { BadgeEntity } from "../../../entities/badge.entity";

interface Props {
  setTab(tab: number): void;
}

const MySetting: FC<Props> = ({ setTab }) => {
  const [myBadge, setMyBadge] = useState("");

  const user = useUserStore((state) => state.user);
  const setModalState = useModalStore((state) => state.setModalState);

  const { data: badgeList } = useQueryGet("/badge/all", "getAllBadges");

  useEffect(() => {
    const filteredBadgeList = badgeList?.filter(
      (item: BadgeEntity) => item.id === user?.selectedBadgeId
    );

    setMyBadge(filteredBadgeList[0]?.iconLink);
  }, [user, badgeList]);

  return (
    <div className="w-full p-5 flex justify-center">
      <div className="grid justify-items-center border p-5 h-fit rounded-xl">
        <img src={myBadge} className="w-40 h-40" />
        <div className="my-2">이메일 : {user?.email}</div>
        <button
          className="border px-2 py-1 rounded my-2 w-40"
          onClick={() => setTab(0)}
        >
          대표 뱃지 수정
        </button>
        <button
          className="border rounded px-2 py-1 my-2 w-40"
          onClick={() => setModalState(true, "changePassword")}
        >
          비밀번호 변경
        </button>
        <button
          className="border rounded px-2 py-1 my-2 w-40 bg-red-500 text-white"
          onClick={() => setModalState(true, "unregister")}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MySetting;
