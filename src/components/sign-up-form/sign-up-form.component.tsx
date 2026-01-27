import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "firebase/auth";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { signUpSchema, SignUpFormData } from "../../schemas/auth.schema";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await createAuthUserWithEmailAndPassword(
        data.email,
        data.password
      );
      if (response) {
        await createUserDocumentFromAuth(response.user, {
          displayName: data.displayName,
        });
        reset();
      }
    } catch (error) {
      const authError = error as AuthError;
      if (authError.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("error creating user", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Display Name"
          type="text"
          {...register("displayName")}
          error={errors.displayName?.message}
        />
        <FormInput
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <FormInput
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
