import { FC } from "react";

const AddTask: FC = () => {
  return (
    <>
      <form>
        <h1 className="text-xl text-center mb-5">작업 추가</h1>
        <div className="my-2">
          <label className="block my-2 text-sm">작업명</label>
          <input type="text" className="border p-1 rounded" />
        </div>
        <div className="my-2">
          <label className="block my-2 text-sm">작업 설명</label>
          <input type="text" className="border p-1 rounded" />
        </div>
        <div className="my-2">
          <label className="block my-2 text-sm">작업 우선도</label>
          <input type="text" className="border p-1 rounded" />
        </div>
        <div className="text-center mt-5">
          <button
            type="submit"
            className="border px-2 py-1 mr-2 rounded-lg bg-neutral-100 hover:bg-neutral-200"
          >
            추가
          </button>
          <button
            type="button"
            className="border px-2 py-1 mr-2 rounded-lg bg-neutral-100 hover:bg-neutral-200"
          >
            취소
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTask;
