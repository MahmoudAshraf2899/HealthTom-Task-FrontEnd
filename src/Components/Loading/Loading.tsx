import "./Loading.scss";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
  integrity="sha512-PgQMlq+nqFLV4ylk1gwUOgm6CtIIXkKwaIHp/PAIWHzig/lKZSEGKEysh0TCVbHJXCLN7WetD8TFecIky75ZfQ=="
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
/>;

export const Loading = () => {
  return (
    <div className="Loading w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
      <div className="flex justify-center items-center mt-[50vh]">
        <svg
          className="spinner-ring spinner-secondary spinner-xl"
          viewBox="25 25 50 50"
          stroke-width="5"
        >
          <circle cx="50" cy="50" r="20" />
        </svg>
      </div>
    </div>
  );
};
