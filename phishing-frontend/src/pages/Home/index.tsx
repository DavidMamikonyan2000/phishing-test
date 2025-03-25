import { useCallback, useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { phishingScheme } from "utils";
import { Button, Input } from "components";
import { removeCookie } from "libraries/cookie";
import { AuthSelectors } from "store/auth/selectors";
import { PhishingSelectors } from "store/phishing/selectors";
import PhishingEmailCard, {
  TPhishingEmailCardProps,
} from "components/PhishingEmailCard";
import { clearSignIn, userProfile } from "store/auth/actions";
import { useAppDispatch, useAppSelector } from "libraries/redux";
import { phishingAttempts, phishingPost } from "store/phishing/actions";

import styles from "./Home.module.scss";

export type TPhishingProps = {
  email: string;
};

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(AuthSelectors.userProfile);
  const phishing = useAppSelector(PhishingSelectors.phishing);

  const logOutHandler = () => {
    removeCookie("token");
    dispatch(clearSignIn());

    window.location.reload();
  };

  const renderPhishingList = phishing?.phishingAttempts?.phishingList?.map(
    ({ id, email, status, content }: TPhishingEmailCardProps) => (
      <PhishingEmailCard
        key={id}
        id={id}
        email={email}
        status={status}
        content={content}
      />
    )
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TPhishingProps>({
    mode: "onBlur",
    resolver: yupResolver(phishingScheme),
  });

  const onSubmit = useCallback(
    (data: TPhishingProps) => {
      dispatch(phishingPost({ email: data.email }));
      reset();
    },
    [dispatch, reset]
  );

  useEffect(() => {
    dispatch(userProfile());
    dispatch(phishingAttempts());
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <div className={styles.home__head}>
          <div className={styles.home__head__profile}>
            <p>
              <b>email:</b> {profile?.data?.email}
            </p>
            <p>
              <b>fullName:</b> {profile?.data?.fullName}
            </p>
          </div>
          <div
            className={styles.home__head_btn}
            role="button"
            onClick={logOutHandler}
          >
            Sign out
          </div>
        </div>
      </div>
      <div className={styles.home__container}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.home__phishing}
        >
          <Input
            name="email"
            register={register}
            placeholder="Phishing"
            error={errors?.email?.message as string}
            className={styles.home__phishing__inp}
          />

          <Button className={styles.home__phishing_btn}>Send</Button>
        </form>
      </div>
      <div className={styles.home__container}>
        <div className={styles.home__list}>{renderPhishingList}</div>
      </div>
    </div>
  );
};

export default Home;
