import { FC, useState, useEffect } from "react";
import { useQueryGet } from "../../../hooks/useQueryApi";
import moment from "moment";
import Pagination from "../../Pagination/Pagination";
import { useModalStore } from "../../../store/modal.store";
import { UserEntity } from "../../../entities/user.entity";
import {
  GET_USER_LIST_LINK,
  GET_USER_LIST_TOTAL_PAGE_LINK,
} from "../../../shared/constants/admin.constant";
import {
  QUERY_KEY_GET_USER_LIST,
  QUERY_KEY_GET_USER_LIST_TOTAL_PAGE,
} from "../../../shared/constants/query.constant";
import { MODAL_CONTENT_USER_BADGE_LIST } from "../../../shared/constants/modal.constant";

interface Props {
  tab: number;
}

const AdminUserList: FC<Props> = ({ tab }) => {
  const setModalState = useModalStore((state) => state.setModalState);

  const [userList, setUserList] = useState<UserEntity[]>([]);
  const [order, setOrder] = useState("old");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [provider, setProvider] = useState("ALL");
  const [dropDownState, setDropDownState] = useState<boolean[]>([]);

  const { data: userListData } = useQueryGet(
    GET_USER_LIST_LINK(currentPage, order, provider),
    QUERY_KEY_GET_USER_LIST,
    { enabled: tab === 0 }
  );

  const { data: userListTotalPages } = useQueryGet(
    GET_USER_LIST_TOTAL_PAGE_LINK(provider),
    QUERY_KEY_GET_USER_LIST_TOTAL_PAGE,
    {
      enabled: tab === 0,
    }
  );

  useEffect(() => {
    if (tab === 0) {
      setUserList(userListData);
      setTotalPage(userListTotalPages?.totalPages);
      setDropDownState(userListData?.map(() => false));
    }
  }, [tab, userListData, userListTotalPages]);

  return (
    <>
      <div className="p-3">
        <select
          className="border px-3 py-2 ml-2 rounded outline-neutral-400 cursor-pointer dark:bg-neutral-600 dark:text-neutral-200 dark:border-0"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="old">오래된 가입순</option>
          <option value="newest">최신 가입순</option>
        </select>
        <select
          className="border px-3 py-2 ml-2 rounded outline-neutral-400 cursor-pointer dark:bg-neutral-600 dark:text-neutral-200 dark:border-0"
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="ALL">전체 유저</option>
          <option value="LOCAL">로컬 가입</option>
          <option value="GOOGLE">구글 가입</option>
          <option value="KAKAO">카카오 가입</option>
        </select>
      </div>
      <table className="table-fixed w-full">
        <thead className="border-b p-1 sm:p-5 dark:border-neutral-600">
          <tr>
            <th className="p-1 sm:p-5 text-center border-r w-[10%] dark:border-neutral-600 dark:text-neutral-200">
              순번
            </th>
            <th className="p-1 sm:p-5 text-center border-r w-[25%] dark:border-neutral-600 dark:text-neutral-200">
              이메일
            </th>
            <th
              className={`p-1 sm:p-5 text-center border-r w-[10%] dark:border-neutral-600 dark:text-neutral-200`}
            >
              공급 업체
            </th>
            <th
              className={`p-1 sm:p-5 text-center border-r w-[10%] dark:border-neutral-600 dark:text-neutral-200`}
            >
              권한
            </th>
            <th className="p-1 sm:p-5 text-center border-l w-[25%] dark:border-neutral-600 dark:text-neutral-200">
              가입 날짜
            </th>
            <th className="p-1 sm:p-5 text-center border-l w-[20%] dark:border-neutral-600 dark:text-neutral-200">
              작업
            </th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((item, index) => (
            <tr key={item.id}>
              <td className="p-1 sm:p-5 text-center border-r w-[10%] dark:border-neutral-600">
                <span className="break-all dark:text-neutral-200">
                  {index + 1}
                </span>
              </td>
              <td className="p-1 sm:p-5 text-center border-r w-[25%] dark:border-neutral-600">
                <span className="break-all dark:text-neutral-200">
                  {item.email}
                </span>
              </td>
              <td className="p-1 sm:p-5 text-center border-r w-[10%] dark:border-neutral-600">
                <span className="break-all dark:text-neutral-200">
                  {item.provider}
                </span>
              </td>
              <td className="p-1 sm:p-5 text-center border-r w-[10%] dark:border-neutral-600">
                <span className="break-all dark:text-neutral-200">
                  {item.role}
                </span>
              </td>
              <td className="p-1 sm:p-5 text-center border-r w-[25%] dark:border-neutral-600">
                <span className="break-all dark:text-neutral-200">
                  {moment.utc(item.createdAt).format("YYYY-MM-DD")}
                </span>
              </td>
              <td className="p-1 sm:p-5 text-center border-r w-[20%] relative w-full flex justify-center">
                <button
                  className="border px-2 py-1 rounded flex flex-row dark:bg-neutral-600 dark:border-0"
                  onClick={() => {
                    const newDropDownState = [...dropDownState];
                    newDropDownState[index] = !dropDownState[index];
                    setDropDownState([...newDropDownState]);
                  }}
                >
                  <span className="dark:text-neutral-200">작업 선택</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <ul
                  className={`absolute right-18 top-14 border bg-white z-10 dark:bg-neutral-700 dark:border-0 ${
                    dropDownState[index] ? "block" : "hidden"
                  }`}
                >
                  <li className="px-4 py-1 border-b cursor-pointer text-red-500 hover:bg-neutral-100 dark:border-0 dark:text-neutral-200 dark:hover:bg-neutral-800">
                    유저 삭제
                  </li>
                  <li
                    className="px-4 py-1 border-b cursor-pointer hover:bg-neutral-100 dark:border-0 dark:text-neutral-200 dark:hover:bg-neutral-800"
                    onClick={() =>
                      setModalState(
                        true,
                        MODAL_CONTENT_USER_BADGE_LIST,
                        undefined,
                        undefined,
                        undefined,
                        item.id
                      )
                    }
                  >
                    뱃지 목록
                  </li>
                  <li className="px-4 py-1 border-b cursor-pointer hover:bg-neutral-100 dark:border-0 dark:text-neutral-200 dark:hover:bg-neutral-800">
                    작업 목록
                  </li>
                  <li className="px-4 py-1 cursor-pointer hover:bg-neutral-100 dark:border-0 dark:text-neutral-200 dark:hover:bg-neutral-800">
                    포인트 내역
                  </li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-5 w-full flex justify-center">
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default AdminUserList;
