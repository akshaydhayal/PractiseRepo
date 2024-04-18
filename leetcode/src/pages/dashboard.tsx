import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function manageQuestionsPage() {
  const router = useRouter();

  const [problems, setProblems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function getProblems() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/problems`
      );
      const data = await response.json();
      console.log(data);
      setProblems(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getProblems();
  }, []);

  if (isLoading) {
    <div>Loading...Please wait!!</div>;
  }
  return (
    <div className="flex justify-center">
      <div className="w-11/12 mt-8">
        <div className="flex justify-between">
          <p className="text-2xl text-white mb-6">All Problems</p>
          <p className="text-base text-white mb-6 border-2 border-white rounded-lg hover:border-slate-200 p-[.5px] px-2">
            Add Problem
          </p>
        </div>

        <div className="flex justify-center">
          {problems && (
            <table border={4} className="w-full ">
              <thead>
                <tr className="border-b-2 border-t-2 border-slate-400">
                  <th className="w-3/12  text-start p-2 text-slate-100">
                    Problem Id
                  </th>
                  <th className="w-5/12 text-start p-2 text-slate-100">
                    Title
                  </th>
                  <th className="w-1/12  text-start p-2 text-slate-100">
                    Diificulty
                  </th>
                  <th className="3/12  text-start  p-2 text-slate-100">
                    Topic tags
                  </th>
                </tr>
              </thead>
              <tbody>
                {problems.map((p) => {
                  return (
                    <tr
                      className="border-b border-slate-400 p-12 cursor-pointer"
                      onClick={() => {
                        router.push(`/problem/${p._id}`);
                      }}
                    >
                      <td className="w-3/12 text-start p-2 text-slate-100">
                        {p._id}
                      </td>
                      <td className="w-5/12 text-start font-medium text-basep-2 text-slate-100">
                        {p.title}
                      </td>
                      <td className="1/12 text-start p-2">
                        <p
                          className={`border ${
                            p.difficulty === "easy"
                              ? "border-green-700 bg-green-900 text-green-200"
                              : p.difficulty === "Medium"
                              ? "border-orange-800 bg-orange-600 text-yellow-200"
                              : "border-red-700 bg-red-700 text-red-200"
                          }  px-2 w-max text-sm rounded-md`}
                        >
                          {p.difficulty}
                        </p>
                      </td>
                      <td className="3/12 text-start p-2">
                        <div className="flex gap-1">
                          {p.topic_tags.map((t) => (
                            <p
                              className="border border-slate-700 px-2 text-sm rounded-md
                           bg-slate-700 text-white"
                            >
                              {t}
                            </p>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
