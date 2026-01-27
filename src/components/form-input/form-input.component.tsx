import "./form-input.styles.scss";
import { InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, ...otherProps }, ref) => {
    const inputValue = otherProps.value as string | undefined;
    const hasValue = inputValue && inputValue.length > 0;

    return (
      <div className="group">
        {label && (
          <label className={`${hasValue ? "shrink" : ""} form-input-label`}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`form-input ${error ? "error" : ""}`}
          {...otherProps}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
