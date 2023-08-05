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

export interface SurveyStoreType {
  surveyState: boolean | "complete";
  surveyType: "FrontEnd" | "BackEnd";
  surveyResponse: number[];
  setSurveyState(surveyState: boolean | "complete"): void;
  setSurveyType(surveyType: "FrontEnd" | "BackEnd"): void;
  setSurveyResponse(surveyResponse: number[]): void;
}

export interface AuthModalStoreType {
  authModalState: boolean;
  setAuthModalState(authModalState: boolean): void;
}

export interface SettingModalStoreType {
  settingModalState: boolean;
  setSettingModalState(settingModalState: boolean): void;
}

export interface ConfirmModalStoreType {
  confirmModalState: boolean;
  confirmType: string;
  selectedSurvey: number;
  setConfirmModalState(
    confirmModalState: boolean,
    confirmType: string,
    selectedSurvey?: number
  ): void;
}
