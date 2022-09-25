import { Fragment } from "react";

const Environment = (): JSX.Element => {
  const environmentKey = "BASE_URL";
  return (
    <Fragment>
      <div>
        {import.meta.env.MODE === "development"
          ? "개발 환경입니다."
          : "프로덕션 환경입니다."}
      </div>
      <div>{import.meta.env.BASE_URL}</div>
      <div>{import.meta.env.PROD ? "프로덕션 모드" : "개발 모드"}</div>
      <div className="color-box">
        {import.meta.env.DEV ? "개발 모드" : "프로덕션 모드"}
      </div>
      <span className="bg-color-box">
        {import.meta.env.SSR ? "SSR 모드" : "CSR 모드"}
      </span>

      <div>{import.meta.env.VITE_SOME_KEY}</div>
      {/* VITE_ 라는 접두사를 붙인 환경변수만 접근이 가능하다. */}
      <div>{import.meta.env.DB_PASSWORD}</div>

      {/* 프로덕션 모드에서는 아래 동적 참조는 의도치 않은 동작을 초래할 수 있어 해당 코드 사용은 지양하라고 한다. */}
      <div>{import.meta.env[environmentKey]}</div>
    </Fragment>
  );
};

export default Environment;
