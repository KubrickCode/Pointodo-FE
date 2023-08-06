interface User {
  id: string;
  email: string;
  provider: "LOCAL" | "GOOGLE" | "KAKAO";
  role: "USER" | "ADMIN";
  selectedBadge: string;
  createdAt: string;
}

export interface UserStoreType {
  user: User;
  setUser: (user: User) => void;
}

export interface ModalStoreType {
  modalState: boolean;
  modalContent: string;
  setModalState(modalState: boolean, modalContent?: string): void;
}

export interface ToastStoreType {
  toastState: boolean;
  toastContent: string;
  setToastState(toastState: boolean, toastContent: string): void;
}
