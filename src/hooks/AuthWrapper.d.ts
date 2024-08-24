// src/hooks/AuthWrapper.d.ts
declare module "./AuthWrapper" {
  import { ReactNode } from "react";

  interface AuthWrapperProps {
    children: ReactNode;
  }

  const AuthWrapper: (props: AuthWrapperProps) => JSX.Element;

  export default AuthWrapper;
}
