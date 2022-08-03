import { CSSProperties } from "react";

type Theme = {
  name: string;
  class: string;
  iconColor: string;
  backgroundColor: string;
  selectedByDefault: true;
  itemStyles?: CSSProperties;
  wrapperComponent: ({
    children,
  }: {
    children: React.ReactNode;
  }) => React.ReactNode;
};

type MultiThemeParams = {
  list?: Theme[];
  disabled?: boolean;
};
