import connection from "@/config/connection";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { parseCookies } from "nookies";
import { CgSpinner } from "react-icons/cg";
import { useContext, useState } from "react";
import { AnimatedBackgrond } from "@/components/AnimatedBackground";
import Head from "next/head";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { signIn } = useContext(AuthContext);

  async function fetchLogin(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await signIn(user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>TodoAPP | Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen max-h-screen max-w-screen scrollbar-hide overflow-hidden bg-background-neutral dark:bg-dark-background-base flex justify-center items-center">
        <AnimatedBackgrond />
        <div className="z-[1000] sm:min-w-[80%] md:w-1/3 md:h-4/6 flex flex-col justify-center items-center gap-12 animate-fade-up">
          <h1 className="text-typography-primary dark:text-dark-typography-base  text-typography-danger font-bold text-2xl ">
            Sign in.
          </h1>
          <form
            onSubmit={(e) => fetchLogin(e)}
            className="w-full flex flex-col sm:max-w-[450px] md:max-w-[350px] gap-4"
          >
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              disabled={loading}
              required
              onChange={(e) => {e.stopPropagation(), setUser({ ...user, username: e.target.value })}}
              className="w-full h-10 px-4 bg-background-neutral dark:bg-dark-background-base border-2 border-dark-background-light/50 dark:border-dark-background-light rounded-xl text-typography-light dark:text-dark-typography-base"
            />
            <input
              type="password"
              placeholder="Password"
              required
              disabled={loading}
              value={user.pass}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full h-10 px-4 bg-background-neutral dark:bg-dark-background-base border-2 border-dark-background-light/50 dark:border-dark-background-light rounded-xl text-typography-light dark:text-dark-typography-base"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center mt-3 w-full h-12 rounded-xl bg-gradient-to-tr from-[#bf42d9] to-[#ff9c7e] font-semibold text-dark-typography-base hover:opacity-60 duration-150"
            >
              {!loading ? (
                "Sign in"
              ) : (
                <CgSpinner
                  size={34}
                  className="animate-spin text-dark-background-base dark:text-dark-typography-base"
                />
              )}
            </button>
          </form>
          <div className="flex flex-col gap-4 justify-center items-center text-dark-background-base dark:text-dark-typography-base">
            <Link
              href={"/register"}
              className="text-dark-background-base dark:text-dark-typography-light"
            >
              Don&apos;t have an account?{" "}
              <b className="text-dark-background-base dark:text-dark-typography-base">
                Create Acoount
              </b>
            </Link>
            <Link href={"#"}>
              <b>Forgot Password?</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
