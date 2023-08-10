import { FC, useEffect, useState } from "react";
import { useQueryGet } from "../../../hooks/useQueryApi";
import { BadgeEntity } from "../../Admin/Badge/AdminBadgeList";
import { useUserStore } from "../../../store/user.store";

interface Props {
  tab: number;
}

const MyBadgeList: FC<Props> = ({ tab }) => {
  const [data, setData] = useState<BadgeEntity[]>([]);

  const user = useUserStore((state) => state.user);

  const { data: badgeList } = useQueryGet("/badge/all", "getAllBadges");
  const { data: userBadgeList } = useQueryGet(
    "/badge/list",
    "getUserBadgeList"
  );

  useEffect(() => {
    if (tab === 0) {
      setData(badgeList);
    }
    if (tab === 1) {
      setData(badgeList.filter((item: BadgeEntity) => item.type === "NORMAL"));
    }
    if (tab === 2) {
      setData(
        badgeList.filter((item: BadgeEntity) => item.type === "ACHIEVEMENT")
      );
    }
    if (tab === 3) {
      setData(badgeList.filter((item: BadgeEntity) => item.type === "SPECIAL"));
    }
  }, [badgeList, tab]);

  return (
    <ul className="grid grid-cols-4 gap-4 p-5">
      {data?.map((item) => (
        <li key={item.id} className="border text-center rounded-lg p-3">
          <div className="flex justify-center">
            <img src={item.iconLink} className="w-40 h-40" />
          </div>
          <div>
            <h2 className="text-2xl my-3">{item.name}</h2>
          </div>
          <div className="mb-2">{item.description}</div>
          <div>가격: {item?.price || "구매 불가"}</div>
          <div className="mt-2">
            {userBadgeList?.includes(item.id) || item.id === 1 ? (
              <button
                className="border px-2 py-1 mx-1 rounded bg-blue-300 text-white"
                disabled
              >
                보유중
              </button>
            ) : (
              <button className="border px-2 py-1 mx-1 rounded bg-blue-500 text-white">
                구매
              </button>
            )}

            {user?.selectedBadge === item.id ? (
              <button
                className="border px-2 py-1 mx-1 rounded bg-pink-300 text-white"
                disabled
              >
                선택됨
              </button>
            ) : (
              <button className="border px-2 py-1 mx-1 rounded bg-pink-500 text-white">
                선택
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyBadgeList;
