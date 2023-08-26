export interface AuthProps {
  setTab(tab: number): void;
}
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  confirmPassword: string;
}
