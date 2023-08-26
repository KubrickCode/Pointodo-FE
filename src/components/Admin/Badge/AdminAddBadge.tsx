import { FC, useEffect, useState } from "react";
import { useModalStore } from "../../../store/modal.store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryMutate } from "../../../hooks/useQueryApi";
import { useQueryClient } from "react-query";
import { useToastStore } from "../../../store/toast.store";
import "react-datepicker/dist/react-datepicker.css";
import {
  ACHIEVEMENT_BADGE,
  CREATE_BADGE_LINK,
  NORMAL_BADGE,
  SPECIAL_BADGE,
  UPLOAD_BADGE_LINK,
} from "../../../shared/constants/admin.constant";
import { QUERY_KEY_GET_ADMIN_BADGE_LIST } from "../../../shared/constants/query.constant";
import { CREATE_BADGE_MESSAGE } from "../../../shared/messages/admin.message";
import { BadgeEntity, BadgeType } from "../../../entities/badge.entity";
import {
  BADGE_DESC_FORM_EMPTY_ERROR,
  BADGE_DESC_FORM_LENGTH_ERROR,
  BADGE_NAME_FORM_EMPTY_ERROR,
  BADGE_NAME_FORM_LENGTH_ERROR,
  BADGE_PRICE_FORM_LENGTH_ERROR,
} from "../../../shared/messages/admin.error";

interface Props {
  badgeType: BadgeType;
}

type AdminAddBadgeForm = Omit<BadgeEntity, "id">;

const AdminAddBadge: FC<Props> = ({ badgeType }) => {
  const setModalState = useModalStore((state) => state.setModalState);
  const setToastState = useToastStore((state) => state.setToastState);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminAddBadgeForm>();

  const queryClient = useQueryClient();
  const { mutate } = useQueryMutate();

  useEffect(() => {
    if (dueDate < new Date()) {
      setDueDate(new Date());
    }
  }, [dueDate]);

  const onSubmitHandler: SubmitHandler<AdminAddBadgeForm> = async (body) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      mutate(
        {
          link: UPLOAD_BADGE_LINK,
          method: "post",
          body: formData,
        },
        {
          onSuccess: async (data) => {
            Object.assign(body, { iconLink: data.filePath });
            mutate(
              {
                link: CREATE_BADGE_LINK,
                method: "post",
                body,
              },
              {
                onSuccess: async () => {
                  await queryClient.invalidateQueries(
                    QUERY_KEY_GET_ADMIN_BADGE_LIST
                  );
                  setToastState(true, CREATE_BADGE_MESSAGE, "success");
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
          {badgeType === BadgeType.NORMAL
            ? NORMAL_BADGE
            : badgeType === BadgeType.ACHIEVEMENT
            ? ACHIEVEMENT_BADGE
            : SPECIAL_BADGE}{" "}
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
              required: BADGE_NAME_FORM_EMPTY_ERROR,
              maxLength: {
                value: 20,
                message: BADGE_NAME_FORM_LENGTH_ERROR,
              },
            })}
          />
          {errors.name && errors.name.type === "required" && (
            <div>{errors.name.message}</div>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <div>{errors.name.message}</div>
          )}
        </div>
        <div className="my-2">
          <label className="block my-2 text-sm">뱃지 설명</label>
          <textarea
            className="border p-1 rounded outline-neutral-400 w-full"
            maxLength={500}
            required
            {...register("description", {
              required: BADGE_DESC_FORM_EMPTY_ERROR,
              maxLength: {
                value: 100,
                message: BADGE_DESC_FORM_LENGTH_ERROR,
              },
            })}
          />
          {errors.description && errors.description.type === "required" && (
            <div>{errors.description.message}</div>
          )}
          {errors.description && errors.description.type === "maxLength" && (
            <div>{errors.description.message}</div>
          )}
        </div>
        {badgeType !== BadgeType.SPECIAL && (
          <div className="my-2">
            <label className="block my-2 text-sm">뱃지 가격</label>
            <input
              type="text"
              className="border p-1 rounded outline-neutral-400"
              maxLength={10}
              {...register("price", {
                maxLength: {
                  value: 10,
                  message: BADGE_PRICE_FORM_LENGTH_ERROR,
                },
              })}
            />
            {errors.price && errors.price.type === "maxLength" && (
              <div>{errors.price?.message}</div>
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
