import EditorComponent from "@/components/Editor";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function programPage() {
  const router = useRouter();
  const problemId = router.query.problemId;
  const [problem, setProblem] = useState(null);
  const [problemTestCases, setProblemTestCases] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hintOpenIndex, setHintOpenIndex] = useState([]);
  const [hintShowIndex, setHintShowIndex] = useState(-1);

  async function getProblemData() {
    console.log(`problemId : ${problemId}`);
    if (problemId) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/problem`, {
          headers: {
            problem_id: `${problemId}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setProblem(data);
        setProblemTestCases(data.test_cases);
        setHintOpenIndex(Array(data.hints.length).fill(false));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    if (problemId) {
      getProblemData();
    }
  }, [problemId]);

  if (loading) {
    return <div>Loading...please wait!!</div>;
  }

  return (
    <div className="flex justify-center overflow-hidden">
      {problem && (
        <div className="w-1/2 h-[90vh] overflow-auto p-4">
          <p className="text-base text-slate-600 mb-2">Problem {problem._id}</p>
          <p className="text-2xl text-white mb-2 font-medium">
            {problem.title}
          </p>
          <div className="flex gap-4 mb-4">
            <p className="bg-slate-600 text-white text-sm p-0.5 px-3 cursor-pointer">
              {problem.difficulty}
            </p>
            <p className="text-base text-slate-300">Points : {problem.point}</p>
          </div>
          <p className="text-base text-slate-100 mb-4">{problem.description}</p>
          <div className="flex gap-2 mb-2">
            {problem.topic_tags.map((t) => {
              return (
                <p className="bg-slate-600 text-slate-100 text-sm p-0.5 px-3 cursor-pointer">
                  {t}
                </p>
              );
            })}
          </div>
          <div className="mt-8">
            {problem.examples.map((e, ind) => {
              return (
                <div className="mb-3 pl-6 divide-x-2 divide-gray-400">
                  <p className="text-base text-slate-200 mb-2 font-bold">
                    Example {ind + 1}
                  </p>
                  <div className="pl-4">
                    <p className="text-base text-slate-100">
                      <span className="font-semibold text-slate-300">
                        Input :
                      </span>{" "}
                      {e.input}
                    </p>
                    <p className="text-base text-slate-100">
                      <span className="font-semibold text-slate-300">
                        Output :
                      </span>
                      {e.output}
                    </p>
                    <p className="text-base text-slate-600">
                      <span className="font-semibold text-slate-300">
                        Explaination :
                      </span>{" "}
                      {e.explaination}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <p className="text-base text-slate-100 mb-2 font-bold">
              Constraints{" "}
            </p>
            <ul className="list-disc ml-6">
              {problem.constraints.map((c) => {
                return <li className="text-base text-slate-300 mb-2">{c}</li>;
              })}
            </ul>
          </div>

          <div className="divide-y-2 flex flex-col gap-3 mt-4">
            {problem.hints.map((h, ind) => {
              return (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setHintShowIndex((old) => {
                      return old === ind ? -1 : ind;
                    });
                  }}
                >
                  <div className="flex justify-between pr-8">
                    <p className="text-base text-slate-100 font-medium">
                      Hint {ind + 1}
                    </p>
                    <button
                      onClick={() => {
                        setHintShowIndex((old) => {
                          return old === ind ? -1 : ind;
                        });
                      }}
                    >
                      +
                    </button>
                  </div>
                  {hintShowIndex === ind && (
                    <p className="text-sm text-slate-300">{h}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-6 mt-8">
            <p className="text-sm text-slate-100">
              Accepted : {problem.problem_stats.total_correct_count}
            </p>
            <p className="text-sm text-slate-100">
              Submissions : {problem.problem_stats.total_submit_count}
            </p>
            <p className="text-sm text-slate-100">
              Acceptance Rate :{" "}
              {(problem.problem_stats.total_correct_count /
                problem.problem_stats.total_submit_count) *
                100}{" "}
              %
            </p>
          </div>
        </div>
      )}
      <div className="w-1/2 h-[90vh] overflow-auto">
        <EditorComponent testCases={problemTestCases} problemId={problem._id} problemPoints={problem.point} />
      </div>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="dropdown w-80">
      <div className="dropdown-btn p-3 font-bold flex justify-between">
        Choose one
      </div>
      <div className="dropdown-content">
        <div>React</div>
      </div>
    </div>
  );
}
