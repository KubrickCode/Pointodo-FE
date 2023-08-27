import { UserEntity } from "../entities/user.entity";

export interface UserStoreType {
  user: UserEntity;
  isLoggedIn: boolean;
  setUser: (user: UserEntity) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export interface ModalStoreType {
  modalState: boolean;
  modalContent: string;
  modalTaskId: number;
  modalTaskType: string;
  modalBadgeId: number;
  modaluserId: string;
  setModalState(
    modalState: boolean,
    modalContent?: string,
    modalTaskId?: number,
    modalTaskType?: string,
    modalBadgeId?: number,
    modaluserId?: string
  ): void;
}

export interface ToastStoreType {
  toastState: boolean;
  toastContent: string;
  toastType: string;
  setToastState(
    toastState: boolean,
    toastContent: string,
    toasType: string
  ): void;
}
