import { PropsWithChildren } from "react";
import { NavigationList } from "src/features/navigation/components/NavigationList";

export function UiAside({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <NavigationList />
      {children}
    </>
  );
}
