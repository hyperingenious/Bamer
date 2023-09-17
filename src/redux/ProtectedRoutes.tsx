import { ReactNode } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  return <>{children}</>;
}

export default ProtectedRoutes;
