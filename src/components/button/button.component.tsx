import "./button.styles.scss";
import { ButtonHTMLAttributes, ReactNode } from "react";

const BUTTON_TYPE_CLASSES: Record<string, string> = {
  google: "google-sign-in",
  inverted: "inverted",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonType?: "google" | "inverted";
}

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={`button-container ${buttonType ? BUTTON_TYPE_CLASSES[buttonType] : ""}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
