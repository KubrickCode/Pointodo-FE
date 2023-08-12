import { FC, useEffect, useState } from "react";
import { useModalStore } from "../../../../store/modal.store";
import { useQueryGet, useQueryMutate } from "../../../../hooks/useQueryApi";
import { useToastStore } from "../../../../store/toast.store";
import { useQueryClient } from "react-query";

interface BadgeList {
  id?: number;
  badgeId?: number;
  name?: string;
}

const AdminUserBadge: FC = () => {
  const modaluserId = useModalStore((state) => state.modaluserId);
  const setToastState = useToastStore((state) => state.setToastState);

  const queryClient = useQueryClient();

  const { data: userBadgeList } = useQueryGet(
    `/admin/user/badge/list/${modaluserId}`,
    "getUserBadgeList",
    { enabled: !!modaluserId }
  );
  const { data: allBadgeList } = useQueryGet("/badge/all", "getAllBadgeList");
  const { mutate } = useQueryMutate();

  const [filteredBadgeList, setFilteredBadgeList] = useState<BadgeList[]>([]);
  const [selectedBadge, setSelectedBadge] = useState(0);

  useEffect(() => {
    if (allBadgeList && userBadgeList) {
      const userBadgeIds = userBadgeList.map(
        (badge: BadgeList) => badge.badgeId
      );

      const filteredList = allBadgeList.filter(
        (item: BadgeList) => !userBadgeIds.includes(item.id)
      );

      setFilteredBadgeList(filteredList);
    }
  }, [allBadgeList, userBadgeList]);

  const handlePutBadgeToUser = async () => {
    mutate(
      {
        link: "/admin/user/badge/put",
        method: "put",
        body: {
          userId: modaluserId,
          badgeId: selectedBadge,
        },
      },
      {
        onSuccess: async () => {
          setToastState(true, "뱃지를 부여하였습니다", "success");
          await queryClient.invalidateQueries("getUserBadgeList");
        },
      }
    );
  };

  const handleDeleteUserBadge = async (badgeId: number) => {
    mutate(
      {
        link: `/admin/user/badge?userId=${modaluserId}&badgeId=${badgeId}`,
        method: "delete",
      },
      {
        onSuccess: async () => {
          setToastState(true, "뱃지를 삭제하였습니다", "success");
          await queryClient.invalidateQueries("getUserBadgeList");
        },
      }
    );
  };

  return (
    <div>
      <h1 className="text-xl mb-3 text-center">보유 뱃지 목록</h1>
      <div>
        <select
          className="border px-3 py-2 ml-2 rounded outline-neutral-400"
          onChange={(e) => setSelectedBadge(Number(e.target.value))}
        >
          {filteredBadgeList?.map((item: BadgeList) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button
          className="border py-2 px-1 bg-blue-400 text-white rounded mx-2"
          onClick={handlePutBadgeToUser}
        >
          뱃지 부여
        </button>
      </div>
      <ul className="grid divide-y">
        {userBadgeList?.map((item: BadgeList, index: number) => (
          <li key={item.badgeId} className="flex flex-row justify-between py-2">
            <div className="mr-10">
              {index + 1} . <span>{item.name}</span>
            </div>
            <div className="float-right">
              <button
                className={`rounded px-1 bg-red-500 text-white ${
                  item.badgeId === 1 && "bg-red-100"
                }`}
                onClick={() => handleDeleteUserBadge(item.badgeId!)}
                disabled={item.badgeId === 1}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserBadge;
