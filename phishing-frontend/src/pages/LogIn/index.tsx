import { useCallback, type FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginScheme } from "utils";
import { Button, Input } from "components";
import { signIn } from "store/auth/actions";
import { useAppDispatch } from "libraries/redux";
import { ERoutePaths } from "libraries/router/types";

import styles from "./LogIn.module.scss";
import { Link } from "react-router-dom";

export type TLogInProps = {
  email: string;
  password: string;
};

const LogIn: FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<TLogInProps>({
    mode: "onBlur",
    resolver: yupResolver(loginScheme),
  });

  const onSubmit = useCallback(
    (data: TLogInProps) => {
      dispatch(signIn({ email: data.email, password: data.password }));
    },
    [dispatch]
  );

  return (
    <div className={styles.login}>
      <div className={styles.login__contaier}>
        <h1 className={styles.login__title}>Log In</h1>

        <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            register={register}
            label="Email"
            placeholder="Enter email address"
            className={styles.wrapper__input__inp}
            error={errors?.email?.message as string}
          />

          <Input
            name="password"
            register={register}
            label="Password"
            type="password"
            className={styles.wrapper__input__inp}
            placeholder="Enter password"
            error={errors?.password?.message as string}
          />

          <Button
            type="submit"
            disabled={!isValid && isDirty}
            className={styles.wrapper__form__btn}
          >
            Sign In
          </Button>
        </form>

        <p className={styles.login__register}>
          Don't have an account yet?
          <Link to={ERoutePaths.Register}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
