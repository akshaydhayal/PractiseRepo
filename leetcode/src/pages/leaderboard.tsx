import { useEffect, useState } from "react";

export default function leaderboardPage() {
  const [userss, setUser] = useState([]);
  const users = [
    {
      rank: 1,
      name: "Akshay Dhayal",
      avatar_img:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      points_scored: 121,
    },
    {
      rank: 2,
      name: "Akshay Dhayal",
      avatar_img:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      points_scored: 212,
    },
    {
      rank: 3,
      name: "Akshay Dhayal",
      avatar_img:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      points_scored: 221,
    },
    {
      rank: 4,
      name: "Akshay Dhayal",
      avatar_img:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      points_scored: 221,
    },
  ];

  async function getUsers() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
    const data = await response.json();
    console.log(data);
    setUser(data);
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col w-9/12">
        <p className="text-2xl text-slate-100 mb-6">Leaderboard</p>
        <table className=" w-full">
          <thead className="border-b border-slate-200">
            <tr>
              <th className="text-white w-1/5 text-start p-2">Rank</th>
              <th className="text-white w-1/5 text-start p-2">User</th>
              <th className="text-white w-2/5 text-start p-2">College</th>
              <th className="text-white w-1/5 text-start p-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {userss &&
              userss.map((u) => {
                return (
                  <tr className="border-b border-slate-200">
                    <td className="text-slate-100 w-1/5 p-2">
                      <div className="flex gap-5 items-center">
                        <p>1</p>
                        <img className="w-8" src={u.avatar_img} />
                      </div>
                    </td>

                    <td className="text-slate-100 w-1/5 p-2">{u.name}</td>
                    <td className="text-slate-100 w-2/5 p-2">{u.college}</td>
                    <td className="text-slate-100 w-1/5 p-2">
                      {u.points_scored}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
