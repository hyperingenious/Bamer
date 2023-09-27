import { ReactNode } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { authenticated, status } = useAppSelector(
    (store) => store.authentication
  );

  if (status === "pending")
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  if (authenticated) return { children };
  if (!authenticated) {
    return null;
  }
}

export default ProtectedRoutes;
