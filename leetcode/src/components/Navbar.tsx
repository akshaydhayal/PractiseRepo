import Link from "next/link";
import { userState } from "@/store/userAtom";
import { useRecoilState } from "recoil";

export default function Navbar() {
  const [user, setUser] = useRecoilState(userState);
  const nav = [
    { title: "About", route: "/about" },
    { title: "Activity", route: "/activity" },
    { title: "Problems", route: "/problems" },
    { title: "Leaderboard", route: "/leaderboard" },
    { title: "My Profile", route: "/profile" },
    { title: "Login", route: "/signin" },
  ];
  return (
    // <div className="h-[10vh] flex w-full px-5">
    <div className="h-[10vh] bg-black flex justify-between items-center w-full px-10">
      <p className="text-white text-4xl p-4 font-semibold">Coder</p>
      <div className="flex justify-start gap-11 px-4">
        {nav.map((item,ind) => {
          if (item.title === "Login" && user) {
            return (
              <p key={ind}
                className="text-slate-400 text-lg hover:text-white cursor-pointer"
                onClick={() => {
                  setUser(null);
                }}
              >
                Logout
              </p>
            );
          }
          if (item.title === "My Profile" && !user) {
            return;
          }
          return (
            <Link href={item.route}>
              <p className="text-slate-100 text-lg hover:text-white cursor-pointer">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
    // </div>
  );
}
