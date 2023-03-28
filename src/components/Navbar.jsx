import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { CiLogout } from "react-icons/ci";

export const Navbar = () => {
    const { user, destroySession } = useContext(AuthContext);
  return (
    <nav className="bg-background-neutral sticky top-[0px] left-0 dark:bg-dark-background-base z-[900] flex items-center justify-around w-full h-[60px]">
      <h1 className="text-dark-background-base dark:text-dark-typography-base text-xl font-black">
        TodoApp
      </h1>
      <li className="flex gap-8 list-none text-dark-background-base dark:text-dark-typography-base">
        {!user ? (
          <>
            <ul className=" bg-dark-typography-light dark:bg-dark-border-light py-2 px-4 rounded-xl hover:opacity-60 duration-150">
              <Link href={"/login"}>Sign in</Link>
            </ul>
            <ul className=" bg-dark-typography-light dark:bg-dark-border-light py-2 px-4 rounded-xl hover:opacity-60 duration-150">
              <Link href={"/register"}>Sign up</Link>
            </ul>
          </>
        ) : (
          <ul className="bg-dark-background-light/50 dark:bg-dark-border-light py-2 px-4 rounded-xl hover:opacity-60 duration-150">
            <button
              onClick={() => destroySession()}
              className="flex items-center justify-center gap-2"
            >
              <CiLogout />
              Logout
            </button>
          </ul>
        )}
      </li>
    </nav>
  );
};
