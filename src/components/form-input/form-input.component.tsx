import "./form-input.styles.scss";
import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
}

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
  return (
    <div className="group">
      {label && (
        <label
          className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}
        >
          {label}
        </label>
      )}
      <input className="form-input" {...otherProps} />
    </div>
  );
};

export default FormInput;
