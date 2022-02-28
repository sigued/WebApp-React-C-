import { PropsWithChildren } from "react";
import { AlertsContainer } from "src/features/alert/components/AlertsContainer";

export function UiMain({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <AlertsContainer />
      {children}
    </>
  );
}
