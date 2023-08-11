import { FC, useEffect, useState } from "react";
import { useModalStore } from "../../../store/modal.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { useQueryClient } from "react-query";
import { useToastStore } from "../../../store/toast.store";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  badgeType: string;
}

interface AdminAddBadgeForm {
  name: string;
  description: string;
  iconLink: string;
  type: string;
  price?: number;
}

const AdminAddBadge: FC<Props> = ({ badgeType }) => {
  const setModalState = useModalStore((state) => state.setModalState);
  const setToastState = useToastStore((state) => state.setToastState);
  const queryClient = useQueryClient();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState("");

  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    if (dueDate < new Date()) {
      setDueDate(new Date());
    }
  }, [dueDate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminAddBadgeForm>();

  const { mutate } = useQueryMutate();

  const onSubmitHandler: SubmitHandler<AdminAddBadgeForm> = async (body) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      mutate(
        {
          link: "/admin/badge/upload",
          method: "post",
          body: formData,
        },
        {
          onSuccess: async (data) => {
            Object.assign(body, { iconLink: data.filePath });
            mutate(
              {
                link: "/admin/badge/create",
                method: "post",
                body,
              },
              {
                onSuccess: async () => {
                  await queryClient.invalidateQueries("getAdminBadgeList");
                  setToastState(true, "뱃지가 추가되었습니다", "success");
                },
              }
            );
          },
        }
      );
    }
  };

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setImageFile(e.target.files[0]);

    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h1 className="text-xl text-center mb-5">
          {badgeType === "NORMAL"
            ? "일반 뱃지"
            : badgeType === "ACHIEVEMENT"
            ? "업적 뱃지"
            : "특별 뱃지"}{" "}
          추가
        </h1>
        <div className="my-2">
          <label className="block my-2 text-sm">뱃지명</label>
          <input type="hidden" value={badgeType} {...register("type")} />
          <input
            type="text"
            className="border p-1 rounded outline-neutral-400"
            maxLength={20}
            required
            {...register("name", {
              required: "뱃지명은 필수 입력 필드입니다.",
              maxLength: {
                value: 20,
                message: "뱃지명은 20자 이내로 입력하세요.",
              },
            })}
          />
          {errors.name && errors.name.type === "required" && (
            <div>뱃지명을 입력해 주세요</div>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <div>뱃지명은 20자리 이내로 입력하세요.</div>
          )}
        </div>
        <div className="my-2">
          <label className="block my-2 text-sm">뱃지 설명</label>
          <textarea
            className="border p-1 rounded outline-neutral-400 w-full"
            maxLength={500}
            required
            {...register("description", {
              required: "뱃지 설명은 필수 입력 필드입니다.",
              maxLength: {
                value: 100,
                message: "뱃지 설명은 100자 이내로 입력하세요.",
              },
            })}
          />
          {errors.description && errors.description.type === "required" && (
            <div>뱃지 설명을 입력해 주세요</div>
          )}
          {errors.description && errors.description.type === "maxLength" && (
            <div>뱃지 설명명은 100자리 이내로 입력하세요.</div>
          )}
        </div>
        {badgeType !== "SPECIAL" && (
          <div className="my-2">
            <label className="block my-2 text-sm">뱃지 가격</label>
            <input
              type="text"
              className="border p-1 rounded outline-neutral-400"
              maxLength={10}
              required
              {...register("price", {
                required: "뱃지 가격은 필수 입력 필드입니다.",
                maxLength: {
                  value: 10,
                  message: "뱃지 가격은 10자 이내로 입력하세요.",
                },
              })}
            />
            {errors.name && errors.name.type === "required" && (
              <div>뱃지 가격을 입력해 주세요</div>
            )}
            {errors.name && errors.name.type === "maxLength" && (
              <div>뱃지 가격은 10자리 이내로 입력하세요.</div>
            )}
          </div>
        )}
        <div className="my-2">
          <label className="block my-2 text-sm">아이콘 이미지</label>
          <img
            className="w-20 h-20"
            src={previewUrl}
            alt="이미지를 선택하세요"
          />
          <input type="file" accept="image/*" onChange={onUploadImage} />
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
            onClick={() => setModalState(false)}
          >
            취소
          </button>
        </div>
      </form>
    </>
  );
};

export default AdminAddBadge;
