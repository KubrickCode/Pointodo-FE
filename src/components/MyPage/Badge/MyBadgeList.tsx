import { FC, useEffect, useState } from "react";
import { useQueryGet, useQueryMutate } from "../../../hooks/useQueryApi";
import { useUserStore } from "../../../store/user.store";
import { useModalStore } from "../../../store/modal.store";
import { useToastStore } from "../../../store/toast.store";
import { useQueryClient } from "react-query";
import { BadgeEntity } from "../../../entities/badge.entity";
import { QUERY_KEY_GET_ALL_BADGE_LIST } from "../../../shared/constants/query.constant";

interface Props {
  tab: number;
}

type UserBadgeList = number[];

interface UserBadgeProgress {
  badgeId: number;
  progress: number;
}

const MyBadgeList: FC<Props> = ({ tab }) => {
  const [data, setData] = useState<BadgeEntity[]>([]);
  const [userBadgeList, setUserBadgeList] = useState<UserBadgeList>([]);
  const [userBadgeProgress, setUserBadgeProgress] = useState<
    UserBadgeProgress[]
  >([]);

  const user = useUserStore((state) => state.user);
  const setModalState = useModalStore((state) => state.setModalState);
  const setToastState = useToastStore((state) => state.setToastState);

  const queryClient = useQueryClient();
  const { mutate } = useQueryMutate();

  const { data: currentPoints } = useQueryGet("/point/current", "getPoints");

  const { data: badgeList } = useQueryGet(
    "/badge/all",
    QUERY_KEY_GET_ALL_BADGE_LIST
  );
  const { data: userBadgeListData } = useQueryGet(
    "/badge/list",
    "getUserBadgeList"
  );
  const { data: userBadgeProgressData } = useQueryGet(
    "/badge/progress",
    "getUserBadgeProgress"
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

  const handleBuy = (id: number, price?: number) => {
    if (price && price > currentPoints.points) {
      setToastState(true, "포인트가 부족합니다", "warning");
    } else {
      setModalState(true, "buyBadge", undefined, undefined, id);
    }
  };

  const handleSelect = async (badgeId: number) => {
    mutate(
      {
        link: "/badge/selected",
        method: "patch",
        body: { badgeId },
      },
      {
        onSuccess: async () => {
          setToastState(true, "대표 뱃지가 변경되었습니다", "success");
          await queryClient.invalidateQueries("getUser");
          await queryClient.invalidateQueries("getUserBadgeList");
        },
      }
    );
  };

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
      {data?.map((item) => (
        <li key={item.id} className="border text-center rounded-lg p-3">
          <div className="flex justify-center">
            <img src={item.iconLink} className="w-40 h-40" />
          </div>
          <div>
            <h2 className="text-2xl my-3">{item.name}</h2>
          </div>
          <div className="mb-2">{item.description}</div>
          {item.type === "ACHIEVEMENT" ? (
            <div className="h-8">
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
            <div className="h-8 ">{"  "}</div>
          )}
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
              item.type !== "SPECIAL" && (
                <button
                  className="border px-2 py-1 mx-1 rounded bg-blue-500 text-white"
                  onClick={() => handleBuy(item.id, item.price!)}
                >
                  구매
                </button>
              )
            )}

            {(userBadgeList?.includes(item.id) || item.id === 1) &&
              (user?.selectedBadgeId === item.id ? (
                <button
                  className="border px-2 py-1 mx-1 rounded bg-pink-300 text-white"
                  disabled
                >
                  선택됨
                </button>
              ) : (
                <button
                  className="border px-2 py-1 mx-1 rounded bg-pink-500 text-white"
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
