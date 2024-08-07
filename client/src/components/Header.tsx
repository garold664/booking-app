import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext.tsx';

export default function Header() {
  const { user } = useUserContext();
  const loginClasses = `relative animate-shadow-pulse after:animate-bounce after:content-['⬆️'] text-5xl after:absolute after:bottom-[-100px] after:left-[15%] after:text-primary after:font-bold after:pointer-events-none`;
  return (
    <header className=" container mx-auto flex justify-between">
      <Link
        to={'/'}
        className="logo flex items-center gap-1 transition transition-color duration-500 hover:text-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 -rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-xl">airbnc</span>
      </Link>
      <div className="flex  gap-2 sm:border border-gray-300 rounded-full p-2 sm:px-4 sm:shadow-md sm:shadow-gray-300 overflow-hidden transition hover:shadow-lg cursor-pointer select-none">
        <div className="sm:flex hidden  gap-2 xs:hidden">
          <div>Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div>Anyweek</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
        </div>
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      <Link
        to={user ? '/account' : '/login'}
        className={`flex items-center gap-2 border border-gray-300 rounded-full p-2 px-4  transition duration-300 hover:shadow-lg ${
          !user ? loginClasses : 'shadow-md shadow-gray-300'
        }`}
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

        <div className="bg-gray-500 rounded-full text-white border border-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!user && <div className="text-sm whitespace-nowrap">{user.name}</div>}
      </Link>
    </header>
  );
}
