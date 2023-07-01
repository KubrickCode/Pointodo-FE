interface AuthProps {
  setTab(tab: number): void;
}
interface UserForm {
  email: string;
  password: string;
}

export type { AuthProps, UserForm };
