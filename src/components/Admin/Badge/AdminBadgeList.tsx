import { FC, useEffect, useState } from "react";
import { useQueryGet, useQueryMutate } from "../../../hooks/useQueryApi";
import { useQueryClient } from "react-query";
import { useToastStore } from "../../../store/toast.store";

export interface BadgeEntity {
  id: number;
  name: string;
  description: string;
  price?: number;
  iconLink: string;
  type: "NORMAL" | "ACHIEVEMENT" | "SPECIAL";
}

interface Props {
  tab: number;
}

const initialUpdatedBody = {
  name: "",
  description: "",
  price: 0,
};

const AdminBadgeList: FC<Props> = ({ tab }) => {
  const [badgeList, setBadgeList] = useState<BadgeEntity[]>([]);
  const [updatedState, setUpdatedState] = useState({ state: false, id: 0 });
  const [updatedBody, setUpdatedBody] = useState(initialUpdatedBody);

  const { mutate } = useQueryMutate();
  const queryClient = useQueryClient();

  const setToastState = useToastStore((state) => state.setToastState);

  const { data } = useQueryGet(
    `/admin/badge/${
      tab === 0 ? "normal" : tab === 1 ? "achievement" : "special"
    }`,
    "getAdminBadgeList"
  );

  useEffect(() => {
    setBadgeList(data);
  }, [data]);

  const handleUpdate = async (id: number) => {
    mutate(
      {
        link: `/admin/badge/update/${id}`,
        method: "patch",
        body:
          updatedBody.price !== 0
            ? updatedBody
            : { name: updatedBody.name, description: updatedBody.description },
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries("getAdminBadgeList");
          setUpdatedState({
            ...updatedState,
            state: false,
            id: 0,
          });
          setToastState(true, "뱃지가 수정되었습니다");
        },
      }
    );
  };

  const handleDelete = async (id: number) => {
    mutate(
      {
        link: `/admin/badge/delete/${id}`,
        method: "delete",
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries("getAdminBadgeList");
          setToastState(true, "뱃지가 삭제되었습니다");
        },
      }
    );
  };

  return (
    <>
      <table className="table-fixed w-full">
        <thead className="border-b p-5">
          <tr>
            <th className="p-5 text-center border-r w-[10%]">ID</th>
            <th className="p-5 text-center border-r w-[20%]">아이콘</th>
            <th className={`p-5 text-center border-r w-[20%]`}>뱃지명</th>
            <th className={`p-5 text-center border-r w-[20%]`}>설명</th>
            {tab !== 2 && (
              <th className="p-5 text-center border-r w-[10%]">가격</th>
            )}
            <th className="p-5 text-center border-l w-[20%]">수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {badgeList?.map((item) => (
            <tr key={item.id}>
              <td className="p-5 text-center border-r w-[10%] ">
                <span className="break-all">{item.id}</span>
              </td>
              <td className="p-5 text-center border-r w-[20%] ">
                <span className="break-all">{item.iconLink}</span>
              </td>
              <td className="p-5 text-center border-r w-[20%] ">
                {updatedState.state && updatedState.id === item.id ? (
                  <input
                    type="text"
                    className="border rounded p-1"
                    value={updatedBody.name}
                    required
                    minLength={1}
                    maxLength={20}
                    onChange={(e) =>
                      setUpdatedBody({ ...updatedBody, name: e.target.value })
                    }
                  />
                ) : (
                  <span className="break-all">{item.name}</span>
                )}
              </td>
              <td className="p-5 text-center border-r w-[20%] ">
                {updatedState.state && updatedState.id === item.id ? (
                  <textarea
                    className="border rounded p-1"
                    value={updatedBody.description || ""}
                    required
                    minLength={1}
                    maxLength={500}
                    onChange={(e) =>
                      setUpdatedBody({
                        ...updatedBody,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="break-all">{item.description}</span>
                )}
              </td>
              {tab !== 2 && (
                <td className="p-5 text-center border-r w-[10%] ">
                  {updatedState.state && updatedState.id === item.id ? (
                    <input
                      type="text"
                      className="border rounded p-1 w-full"
                      value={updatedBody.price}
                      required
                      maxLength={10}
                      onChange={(e) =>
                        setUpdatedBody({
                          ...updatedBody,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    <span className="break-all">{item.price}</span>
                  )}
                </td>
              )}

              <td className="p-5 text-center border-l w-[20%]">
                {updatedState.state && updatedState.id === item.id ? (
                  <>
                    <button
                      className="border rounded px-2 py-1 mx-1 bg-blue-400 text-white hover:bg-blue-500"
                      onClick={() => handleUpdate(item.id)}
                    >
                      완료
                    </button>
                    <button
                      className="border rounded px-2 py-1 mx-1 bg-red-400 text-white hover:bg-red-500"
                      onClick={() => {
                        setUpdatedState({
                          ...updatedState,
                          state: false,
                          id: 0,
                        });
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="border rounded px-2 py-1 mx-1 bg-blue-300 text-white hover:bg-blue-400"
                      onClick={() => {
                        setUpdatedState({
                          ...updatedState,
                          state: true,
                          id: item.id,
                        });
                        setUpdatedBody({
                          ...updatedBody,
                          name: item.name,
                          description: item.description,
                          price: item.price ?? 0,
                        });
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="border rounded px-2 py-1 mx-1 bg-red-300 text-white hover:bg-red-400"
                      onClick={() => handleDelete(item.id)}
                    >
                      삭제
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminBadgeList;