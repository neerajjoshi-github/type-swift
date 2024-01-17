import { Link, useNavigate, useRouteError } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError() as { status: number; statusText: string };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <header className="w-full fixed top-0 left-0 flex items-center justify-between py-1 px-4 text-white bg-gradient-primary">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-black">
            TypeSwift<span className="text-sm font-medium"> .com</span>
          </span>
        </Link>
      </header>
      <div className="flex items-center bg-white/40 backdrop-blur-md rounded-lg">
        <div className="p-4 rounded-md max-w-80 flex flex-col gap-3">
          {error.status === 404 && <h1 className="font-black text-6xl">404</h1>}
          <h1 className="text-5xl font-black">
            {error.status === 404
              ? "Page Not Found!!"
              : "Something Went Wrong!!!"}
          </h1>
          {error.status === 400 && (
            <p className="font-bold text-lg">{error.statusText}</p>
          )}
          <p className="font-semibold">
            Sorry, the page you're looking for seems to have taken a coffee
            break. Please check the URL and try again.{" "}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 font-semibold text-lg bg-primary text-white rounded-lg"
          >
            Go To Home
          </button>
        </div>

        <img
          src="/svgs/question-mark.svg"
          alt="Question Mark"
          className="max-h-[450px] h-auto bg-[#fd6626] py-6 rounded-r-lg"
        />
      </div>
    </div>
  );
};

export default Error;
