interface AuthProps {
  setTab(tab: number): void;
}
interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm extends LoginForm {
  confirmPassword: string;
}

export type { AuthProps, LoginForm, RegisterForm };
