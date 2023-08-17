interface User {
  id: string;
  email: string;
  provider: "LOCAL" | "GOOGLE" | "KAKAO";
  role: "USER" | "ADMIN" | "MASTER";
  selectedBadgeId: number;
  selectedBadge: { iconLink: string };
  createdAt: string;
}

export interface UserStoreType {
  user: User;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
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
