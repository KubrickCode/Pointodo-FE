import { FC, useCallback, useEffect, useState } from "react";
import { useModalStore } from "../../../../store/modal.store";
import { useQueryGet, useQueryMutate } from "../../../../hooks/useQueryApi";
import { useToastStore } from "../../../../store/toast.store";
import { useQueryClient } from "react-query";
import {
  BadgeEntity,
  UserBadgeListWithName,
} from "../../../../entities/badge.entity";
import {
  DELETE_USER_BADGE_LINK,
  GET_USER_BADGE_LIST_LINK,
  PUT_BADGE_TO_USER_LINK,
} from "../../../../shared/constants/admin.constant";
import {
  QUERY_KEY_GET_ALL_BADGE_LIST,
  QUERY_KEY_GET_MY_BADGE_LIST,
  QUERY_KEY_GET_USER_BADGE_LIST,
} from "../../../../shared/constants/query.constant";
import {
  DELETE_USER_BADGE_MESSAGE,
  PUT_BADGE_TO_USER_MESSAGE,
} from "../../../../shared/messages/admin.message";
import { GET_ALL_BADGE_LIST_LINK } from "../../../../shared/constants/badge.constant";

const AdminUserBadge: FC = () => {
  const modaluserId = useModalStore((state) => state.modaluserId);
  const setToastState = useToastStore((state) => state.setToastState);

  const [filteredBadgeList, setFilteredBadgeList] = useState<BadgeEntity[]>([]);
  const [selectedBadge, setSelectedBadge] = useState(0);

  const queryClient = useQueryClient();

  const { data: userBadgeList } = useQueryGet(
    GET_USER_BADGE_LIST_LINK(modaluserId),
    QUERY_KEY_GET_USER_BADGE_LIST,
    { enabled: !!modaluserId }
  );
  const { data: allBadgeList } = useQueryGet(
    GET_ALL_BADGE_LIST_LINK,
    QUERY_KEY_GET_ALL_BADGE_LIST
  );
  const { mutate } = useQueryMutate();

  useEffect(() => {
    if (allBadgeList && userBadgeList) {
      const userBadgeIds = userBadgeList.map(
        (badge: UserBadgeListWithName) => badge.badgeId
      );

      const filteredList = allBadgeList.filter(
        (item: BadgeEntity) => !userBadgeIds.includes(item.id)
      );

      setFilteredBadgeList(filteredList);
      setSelectedBadge(filteredList[0].id);
    }
  }, [allBadgeList, userBadgeList]);

  const handlePutBadgeToUser = useCallback(async () => {
    mutate(
      {
        link: PUT_BADGE_TO_USER_LINK,
        method: "put",
        body: {
          userId: modaluserId,
          badgeId: selectedBadge,
        },
      },
      {
        onSuccess: async () => {
          setToastState(true, PUT_BADGE_TO_USER_MESSAGE, "success");
          await queryClient.invalidateQueries(QUERY_KEY_GET_USER_BADGE_LIST);
          await queryClient.invalidateQueries(QUERY_KEY_GET_MY_BADGE_LIST);
        },
      }
    );
  }, [modaluserId, selectedBadge]);

  const handleDeleteUserBadge = useCallback(
    async (badgeId: number) => {
      mutate(
        {
          link: DELETE_USER_BADGE_LINK(modaluserId, badgeId),
          method: "delete",
        },
        {
          onSuccess: async () => {
            setToastState(true, DELETE_USER_BADGE_MESSAGE, "success");
            await queryClient.invalidateQueries(QUERY_KEY_GET_USER_BADGE_LIST);
            await queryClient.invalidateQueries(QUERY_KEY_GET_MY_BADGE_LIST);
          },
        }
      );
    },
    [modaluserId]
  );

  return (
    <div>
      <h1 className="text-xl mb-3 text-center dark:text-neutral-200">
        보유 뱃지 목록
      </h1>
      <div>
        <select
          className="border px-3 py-2 ml-2 rounded outline-neutral-400 dark:text-neutral-200 dark:bg-neutral-600 dark:border-0"
          onChange={(e) => setSelectedBadge(Number(e.target.value))}
        >
          {filteredBadgeList?.map((item: BadgeEntity) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button
          className="border py-2 px-1 bg-blue-500 text-white rounded mx-2 hover:bg-blue-600 dark:border-0"
          onClick={handlePutBadgeToUser}
        >
          뱃지 부여
        </button>
      </div>
      <ul className="grid divide-y">
        {userBadgeList?.map((item: UserBadgeListWithName, index: number) => (
          <li key={item.badgeId} className="flex flex-row justify-between py-2">
            <div className="mr-10 dark:text-neutral-200">
              {index + 1} .{" "}
              <span className="dark:text-neutral-200">{item.name}</span>
            </div>
            <div className="float-right">
              <button
                className={`rounded px-1 bg-red-500 text-white hover:bg-red-600 ${
                  item.badgeId === 1 && "hidden"
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
