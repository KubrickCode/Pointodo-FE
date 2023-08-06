import { FC } from "react";

interface Task {
  id: number;
  userId: string;
  taskType: string;
  name: string;
  description: string;
  completion: number;
  importance: number;
  occurredAt: string;
}

interface Props {
  data: Task[];
}

const TaskList: FC<Props> = ({ data }) => {
  const handleCheckboxChange = (item, e) => {
    console.log(item);
    console.log(e.target.checked);
  };
  return (
    <table className="table-fixed w-full">
      <thead className="border-b p-5">
        <tr>
          <th className="p-5 text-center border-r w-[10%]">완료</th>
          <th className="p-5 text-center border-r w-[30%]">작업명</th>
          <th className="p-5 text-center border-r w-[40%]">작업 설명</th>
          <th className="p-5 text-center border-l w-[20%]">중요도</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.id}>
            <td className="p-5 text-center border-r w-[10%]">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  defaultChecked={item.completion === 0 ? false : true}
                  onChange={(e) => handleCheckboxChange(item, e)}
                />
              </div>
            </td>
            <td className="p-5 text-center border-r w-[30%]">{item.name}</td>
            <td className="p-5 text-center border-r w-[40%]">
              {item.description || "설명이 없습니다"}
            </td>
            <td className="p-5 text-center border-l w-[20%]">
              {item.importance}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
