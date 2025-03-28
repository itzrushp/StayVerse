import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="flex justify-between">
      <Link to={"/"} className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8"
        >
          <path d="M18.013 3.754h-2.744V1.521a.516.516 0 0 0-.515-.515H9.246a.516.516 0 0 0-.515.515v2.233H5.987a.516.516 0 0 0-.515.516v15.46a.516.516 0 0 0 .515.516h1.281v1.059a1.692 1.692 0 0 0 3.383 0v-1.059h2.7v1.059a1.692 1.692 0 0 0 3.383 0v-1.059h1.281a.516.516 0 0 0 .515-.516V4.27a.516.516 0 0 0-.517-.516zM9.762 2.036h4.476v1.718H9.762zM9.62 21.305a.661.661 0 0 1-1.321 0v-1.059H9.62zm-.756-2.09v-6.7h6.272v6.7zm6.837 2.09a.661.661 0 0 1-1.321 0v-1.059h1.32zm1.8-2.09h-1.33V12a.515.515 0 0 0-.515-.515h-7.3a.515.515 0 0 0-.523.515v7.215H6.5V4.785h11z" />
          <path d="M13.667 6A1.621 1.621 0 0 0 12 6.237 1.618 1.618 0 0 0 10.333 6 1.838 1.838 0 0 0 9.3 7.229a1.645 1.645 0 0 0 .285 1.406 27.865 27.865 0 0 0 2.074 2.009.515.515 0 0 0 .686 0 27.865 27.865 0 0 0 2.074-2.009 1.645 1.645 0 0 0 .281-1.406A1.838 1.838 0 0 0 13.667 6zM13.6 8.005A21.424 21.424 0 0 1 12 9.566a21.424 21.424 0 0 1-1.6-1.561.619.619 0 0 1-.1-.529.816.816 0 0 1 .465-.539c.391-.18.939.372.839.327a.534.534 0 0 0 .8 0s.443-.508.839-.327a.816.816 0 0 1 .465.539.619.619 0 0 1-.108.529z" />
        </svg>

        <span className="font-bold text-xl">StayVerse</span>
      </Link>
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div>Any week</div>
        <div className="border-l border-gray-300"></div>
        <div>Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!user && <div>{user.name}</div>}
      </Link>
    </header>
  );
}
