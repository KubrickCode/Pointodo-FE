import { FC, useCallback, useEffect, useState } from "react";
import { useQueryGet, useQueryMutate } from "../../../hooks/useQueryApi";
import { useUserStore } from "../../../store/user.store";
import { useModalStore } from "../../../store/modal.store";
import { useToastStore } from "../../../store/toast.store";
import { useQueryClient } from "react-query";
import { BadgeEntity, BadgeType } from "../../../entities/badge.entity";
import {
  QUERY_KEY_GET_ALL_BADGE_LIST,
  QUERY_KEY_GET_CURRENT_POINTS,
  QUERY_KEY_GET_MY_BADGE_LIST,
  QUERY_KEY_GET_MY_BADGE_PROGRESS,
  QUERY_KEY_GET_USER,
} from "../../../shared/constants/query.constant";
import { MODAL_CONTENT_BUY_BADGE } from "../../../shared/constants/modal.constant";
import { UserBadgeProgressEntity } from "../../../entities/user.entity";
import {
  CHANGE_SELECTED_BADGE_LINK,
  GET_ALL_BADGE_LIST_LINK,
  GET_MY_BADGE_LIST_LINK,
  GET_MY_BADGE_PROGRESS_LINK,
} from "../../../shared/constants/badge.constant";
import { GET_CURRENT_POINTS_LINK } from "../../../shared/constants/point.constant";
import {
  BUY_BADGE_NOT_ENOUGH_POINT_MESSAGE,
  CHANGE_SELECTED_BADGE_MESSAGE,
} from "../../../shared/messages/badge.message";

interface Props {
  tab: number;
}

type UserBadgeList = number[];

const MyBadgeList: FC<Props> = ({ tab }) => {
  const user = useUserStore((state) => state.user);
  const setModalState = useModalStore((state) => state.setModalState);
  const setToastState = useToastStore((state) => state.setToastState);

  const [data, setData] = useState<BadgeEntity[]>([]);
  const [userBadgeList, setUserBadgeList] = useState<UserBadgeList>([]);
  const [userBadgeProgress, setUserBadgeProgress] = useState<
    UserBadgeProgressEntity[]
  >([]);

  const queryClient = useQueryClient();
  const { mutate } = useQueryMutate();

  const { data: currentPoints } = useQueryGet(
    GET_CURRENT_POINTS_LINK,
    QUERY_KEY_GET_CURRENT_POINTS
  );

  const { data: badgeList } = useQueryGet(
    GET_ALL_BADGE_LIST_LINK,
    QUERY_KEY_GET_ALL_BADGE_LIST
  );
  const { data: userBadgeListData } = useQueryGet(
    GET_MY_BADGE_LIST_LINK,
    QUERY_KEY_GET_MY_BADGE_LIST
  );
  const { data: userBadgeProgressData } = useQueryGet(
    GET_MY_BADGE_PROGRESS_LINK,
    QUERY_KEY_GET_MY_BADGE_PROGRESS
  );

  useEffect(() => {
    setUserBadgeProgress(userBadgeProgressData);
  }, [userBadgeProgressData]);

  useEffect(() => {
    setUserBadgeList(
      userBadgeListData?.map((item: { badgeId: number }) => item.badgeId)
    );
  }, [userBadgeListData]);

  useEffect(() => {
    if (tab === 0) {
      setData(badgeList);
    }
    if (tab === 1) {
      setData(
        badgeList.filter((item: BadgeEntity) => item.type === BadgeType.NORMAL)
      );
    }
    if (tab === 2) {
      setData(
        badgeList.filter(
          (item: BadgeEntity) => item.type === BadgeType.ACHIEVEMENT
        )
      );
    }
    if (tab === 3) {
      setData(
        badgeList.filter((item: BadgeEntity) => item.type === BadgeType.SPECIAL)
      );
    }
  }, [badgeList, tab]);

  const handleBuy = useCallback(
    (id: number, price?: number) => {
      if (price && price > currentPoints?.points) {
        setToastState(true, BUY_BADGE_NOT_ENOUGH_POINT_MESSAGE, "warning");
      } else {
        setModalState(true, MODAL_CONTENT_BUY_BADGE, undefined, undefined, id);
      }
    },
    [currentPoints?.points]
  );

  const handleSelect = useCallback(async (badgeId: number) => {
    mutate(
      {
        link: CHANGE_SELECTED_BADGE_LINK,
        method: "patch",
        body: { badgeId },
      },
      {
        onSuccess: async () => {
          setToastState(true, CHANGE_SELECTED_BADGE_MESSAGE, "success");
          await queryClient.invalidateQueries(QUERY_KEY_GET_USER);
          await queryClient.invalidateQueries(QUERY_KEY_GET_MY_BADGE_LIST);
        },
      }
    );
  }, []);

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
      {data?.map((item) => (
        <li
          key={item.id}
          className="border text-center rounded-lg p-3 dark:border-neutral-600"
        >
          <div className="flex justify-center">
            <img src={item.iconLink} className="w-40 h-40" />
          </div>
          <div>
            <h2 className="text-2xl my-3 dark:text-neutral-200">{item.name}</h2>
          </div>
          <div className="mb-2 dark:text-neutral-200">{item.description}</div>
          {item.type === BadgeType.ACHIEVEMENT ? (
            <div className="h-8 dark:text-neutral-200">
              진척도:{" "}
              {userBadgeProgress?.filter((el) => el.badgeId === item.id)[0]
                ?.progress || 0}{" "}
              /{" "}
              {(item.name === "일관성 뱃지1" && 7) ||
                (item.name === "일관성 뱃지2" && 30) ||
                (item.name === "일관성 뱃지3" && 365) ||
                (item.name === "다양성 뱃지1" && 100) ||
                (item.name === "다양성 뱃지2" && 100) ||
                (item.name === "다양성 뱃지3" && 100) ||
                (item.name === "생산성 뱃지1" && 10) ||
                (item.name === "생산성 뱃지2" && 100) ||
                (item.name === "생산성 뱃지3" && 500)}
            </div>
          ) : (
            <div className="h-8">{"  "}</div>
          )}
          <div className="dark:text-neutral-200">
            가격: {item?.price || "구매 불가"}
          </div>
          <div className="mt-2">
            {userBadgeList?.includes(item.id) || item.id === 1 ? (
              <button
                className="border px-2 py-1 mx-1 rounded bg-blue-300 text-white dark:border-0"
                disabled
              >
                보유중
              </button>
            ) : (
              item.type !== BadgeType.SPECIAL && (
                <button
                  className="border px-2 py-1 mx-1 rounded bg-blue-500 text-white hover:bg-blue-600 dark:border-0"
                  onClick={() => handleBuy(item.id, item.price!)}
                >
                  구매
                </button>
              )
            )}

            {(userBadgeList?.includes(item.id) || item.id === 1) &&
              (user?.selectedBadgeId === item.id ? (
                <button
                  className="border px-2 py-1 mx-1 rounded bg-pink-300 text-white dark:border-0"
                  disabled
                >
                  선택됨
                </button>
              ) : (
                <button
                  className="border px-2 py-1 mx-1 rounded bg-pink-500 text-white hover:bg-pink-600 dark:border-0"
                  onClick={() => handleSelect(item.id)}
                >
                  선택
                </button>
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyBadgeList;
