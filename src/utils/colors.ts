type ThemeProps = {
  theme: { isDark: boolean };
};

export const blue = "rgb(10, 132, 255)";
export const red = "rgb(255, 69, 58)";
export const appRed = "rgb(255, 100, 100)";
export const appBlue = "rgb(0, 200, 255)";
export const backgroundAccent = ({ theme }: ThemeProps) =>
  theme.isDark ? "rgb(30, 30, 32)" : "rgb(232, 232, 235)";
export const background = ({ theme }: ThemeProps) =>
  theme.isDark ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";
export const borderColor = "rgb(172, 172, 175)";
export const text = ({ theme }: ThemeProps) =>
  theme.isDark ? "rgb(212, 212, 215)" : "rgb(32, 32, 32)";
