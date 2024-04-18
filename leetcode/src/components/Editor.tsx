import Editor, { useMonaco } from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
import { userState } from "@/store/userAtom";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";

export default function EditorComponent({ testCases, problemId,problemPoints }) {
  const user = useRecoilValue(userState);

  const [language, setLanguage] = useState({
    language_name: "javascript",
    language_id: 63,
    lang_basic_code: `console.log("hello world);`,
  });
  const [code, setCode] = useState("");
  const monaco = useMonaco();
  const [stdout, setStdout] = useState(null);
  const [codeTestCaseOutputs, setCodeTestCaseOutputs] = useState([]);
  const [stdin, setStdin] = useState("");
  const [codeSubmittedToken, setCodeSubmittedToken] = useState(
    "aGVsbG8gd29ybGQgYnkgYWtzaGF5Cg== "
  );

  const [problemAccepted, setProblemAccepted] = useState(null);
  const [problemAcceptedDetails, setProblemAcceptedDetails] = useState({});

  function handleEditorChange(value, event) {
    console.log("this is editor value : " + value);
    setCode(value);
    // console.log(`monaco instance : ${JSON.stringify(monaco)}`);
  }
  async function handleGetCodeResult(token) {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
      {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        },
        params: {
          base64_encoded: "true",
          fields: "*",
        },
      }
    );
    console.log(response.data);
    if (response.data) {
      const data = response.data;
      if (data.status_id === 6) {
        // setStdout(atob(data.compile_output));
        setStdout({
          status: "Compilation Error",
          output: atob(data.compile_output),
        });
      }
      if (response.data.stdout) {
        let stringOp = atob(response.data.stdout);
        // setStdout(stringOp);
        setStdout({ status: "Accepted", output: stringOp });
      }
    }
  }

  async function handleRunCode() {
    if (!user) {
      toast.error("Signin to Compile the code!!");
      return;
    }
    const response = await axios.post(
      process.env.NEXT_PUBLIC_RAPID_API_URL,
      {
        source_code: btoa(code),
        language_id: language.language_id,
        stdin: btoa(stdin),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        },
        params: {
          base64_encoded: "true",
          fields: "*",
        },
      }
    );
    const data = response.data;
    console.log(data);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("after waiting 1.5 sec");
        resolve();
      }, 1500);
    });
    handleGetCodeResult(data.token);
  }

  async function addSubmission(isProblemAccepted) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/submission`,
      {
        user: user._id,
        problem: problemId,
        problem_correct: isProblemAccepted,
      }
    );
    console.log("submission fn");
    console.log(response.data);
    
    const response2=await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,{
      userId:user._id,
      points:problemPoints,
    });
    console.log("user updated after submission")
    console.log(response2.data);
  }

  async function handleGetMultpleCodeResult(tokens) {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_RAPID_API_URL}/batch`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        },
        params: {
          tokens: tokens,
        },
      }
    );
    const data = response.data;

    console.log(data);
    if (data) {
      let runtime = 0,
        memory = 0,
        noOfCasesPasses = 0;
      let op = data.submissions.map((s) => {
        // return atob(`${s.stdout}`);
        if (s.time > runtime) {
          runtime = s.time;
        }
        if (s.memory > memory) {
          memory = s.memory;
        }
        return s.stdout;
      });
      console.log("op : " + op);
      setCodeTestCaseOutputs(op);
      let acceptStatus = true;
      for (let i = 0; i < testCases.length; i++) {
        console.log(
          `code op: ${op[i]} , correct op with btoa: ${btoa(
            testCases[i].output
          )}`
        );
        console.log(
          `code op: ${op[i]} , correct op without : ${testCases[i].output}`
        );
        console.log("equal: " + op[i] == testCases[i].output);
        console.log("equal: " + op[i] === testCases[i].output);
        console.log("sum of both : " + op[i] + testCases[i].output);
        // if(op[i]!=testCases[i].output){
        if (op[i] != testCases[i].output) {
          acceptStatus = false;
        } else {
          noOfCasesPasses += 1;
        }
        // if(op[i]!=btoa(testCases[i].output)){
        //     acceptStatus=false;
        // }
      }
      if (acceptStatus === true || acceptStatus === false) {
        addSubmission(acceptStatus);
      }
      if (acceptStatus) {
        console.log("Code Accepted!!, congrats!!");
        setProblemAccepted(true);
        setProblemAcceptedDetails({ runtime, memory, noOfCasesPasses });
      } else {
        console.log("acceptStatus" + acceptStatus);
        setProblemAccepted(false);
      }
    }
    console.log(data);
  }

  async function handleSubmitCode() {
    if (!user) {
      toast.error("First Signin to make a submission!!");
      return;
    }
    let submissions =
      testCases &&
      testCases.map((t) => {
        return {
          language_id: language.language_id,
          source_code: btoa(code),
          stdin: btoa(t.input),
        };
      });
    console.log(submissions);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_RAPID_API_URL}/batch`,
      {
        submissions: submissions,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        },
        params: {
          base64_encoded: "true",
          fields: "*",
        },
      }
    );

    const data = response.data;
    console.log(response);
    console.log(data);
    if (data) {
      let tokens = "";
      for (let i = 0; i < data.length; i++) {
        tokens += data[i].token;
        tokens += ",";
      }
      console.log(tokens);

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log("after waiting 1.5 sec");
          resolve();
        }, 1500);
      });

      handleGetMultpleCodeResult(tokens);
    }
  }
  return (
    <div className="w-full border-2 border-slate-200 p-2 ">
      <select
        className="p-0.5 px-1.5"
        onChange={(e) => {
          setLanguage(JSON.parse(e.target.value));
          setCode(JSON.parse(e.target.value).lang_basic_code);
          console.log(`code : ${JSON.parse(e.target.value).lang_basic_code}`);
          // setCode(JSON.parse(e.target.value.basic_code));
          console.log(JSON.parse(e.target.value));
        }}
      >
        <option
          value={JSON.stringify({
            language_name: "javascript",
            language_id: 63,
            lang_basic_code: `console.log("hello world");`,
          })}
          selected
        >
          Javascript
        </option>
        <option
          value={JSON.stringify({
            language_name: "typescript",
            language_id: 74,
            lang_basic_code: `console.log("hello world");`,
          })}
        >
          Typescript
        </option>
        <option
          value={JSON.stringify({
            language_name: "cpp",
            language_id: 54,
            lang_basic_code: `
#include <iostream>
using namespace std;
int main() {
  int num1, num2, sum;
  cin >> num1;
  cin >> num2;
  sum = num1 + num2;
  cout << sum;
  return 0;
} `,
          })}
        >
          C++
        </option>
        <option
          value={JSON.stringify({
            language_name: "c",
            language_id: 50,
            lang_basic_code: `
#include <iostream>
using namespace std;
int main() {
  int num1, num2, sum;
  cin >> num1;
  cin >> num2;
  sum = num1 + num2;
  cout << sum;
  return 0;
} `,
          })}
        >
          C
        </option>
        <option
          value={JSON.stringify({
            language_name: "python",
            language_id: 71,
            lang_basic_code: `print("hello world");`,
          })}
        >
          Python
        </option>
        <option
          value={JSON.stringify({
            language_name: "java",
            language_id: 62,
            lang_basic_code: `print("hello world");`,
          })}
        >
          Java
        </option>
      </select>

      <div className="flex-col w-full">
        <div className="w-full">
          <Editor
            className=""
            height="60vh"
            width="50vw"
            language={language.language_name}
            defaultValue={code}
            // defaultValue={language.lang_basic_code}
            //             defaultValue={`
            // #include <iostream>
            // using namespace std;
            // int main() {
            //   int num1, num2, sum;
            //   cin >> num1;
            //   cin >> num2;
            //   sum = num1 + num2;
            //   cout << sum;
            //   return 0;
            // } `}
            value={code}
            onChange={handleEditorChange}
            // theme="hc-black"
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              scrollbar: { vertical: "hidden", handleMouseWheel: false },
              cursorStyle: "line",
              fontSize: 17,
              fontWeight: "normal",
              fontFamily: "Consolas, Courier New, monospace",
              // fontFamily: "Courier New",
              letterSpacing: 0,
              lineHeight: 23,
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-end">
            <div className="flex gap-4">
              <button
                className="p-2 px-4 rounded-md text-slate-200 border-2 border-sky-200
            font-semibold"
                onClick={handleRunCode}
              >
                Compile and Test
              </button>
              <button
                className="p-2 px-4 rounded-md text-slate-200 border-2 border-sky-200
            font-semibold"
                onClick={handleSubmitCode}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-slate-200">
              Custom Input:
            </p>
            <textarea
              className="h-24 p-4 rounded-md w-full"
              placeholder="Custom Input"
              onChange={(e) => {
                setStdin(e.target.value);
              }}
            />
          </div>
          {stdout && (
            <div className=" h-auto p-4 flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                {
                  <img
                    src={
                      stdout.status === "Accepted"
                        ? "/correct.png"
                        : "/wrong.png"
                    }
                    className="w-7 h-7"
                  />
                }
                {
                  <p
                    className={`text-2xl  font-normal ${
                      stdout.status === "Accepted"
                        ? "text-green-500"
                        : "text-red-400"
                    }`}
                  >
                    {stdout.status === "Accepted"
                      ? "Execution Completed"
                      : "Compilation Failed"}
                  </p>
                }
              </div>
              <p className="text-lg text-slate-300">
                {stdout.status === "Accepted" ? "Output : " : ""}
                {stdout.output}
              </p>
            </div>
          )}

          <OutputWindow
            problemAccepted={problemAccepted}
            problemAcceptedDetails={problemAcceptedDetails}
            testCases={testCases}
          />
        </div>
      </div>
    </div>
  );
}

function OutputWindow({ problemAccepted, problemAcceptedDetails, testCases }) {
  return (
    <div>
      {problemAccepted && (
        <div>
          <div className="flex gap-2 ">
            <img src="/correct.png" className="w-7 h-7" />
            <p className="text-2xl font-normal text-green-400">Accepted</p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-lg text-slate-200 font-extralight">
                Test Cases Passed
              </p>
              <p className="text-2xl text-slate-100 font-semibold">
                {problemAcceptedDetails.noOfCasesPasses} / {testCases.length}
              </p>
            </div>
            <div>
              <p className="text-lg text-slate-200 font-extralight">
                Points Scored
              </p>
              <p className="text-2xl text-slate-100 font-semibold">0 / 0</p>
            </div>
            <div>
              <p className="text-lg text-slate-200 font-extralight">
                Time Taken
              </p>
              <p className="text-2xl text-slate-100 font-semibold">
                {problemAcceptedDetails.runtime} sec
              </p>
            </div>
            <div>
              <p className="text-lg text-slate-200 font-extralight">
                Memory used
              </p>
              <p className="text-2xl text-slate-100 font-semibold">
                {problemAcceptedDetails.memory / 1000} MB
              </p>
            </div>
          </div>
        </div>
      )}

      {problemAccepted === false && (
        <div className="flex items-center gap-2 mb-8">
          <p className="text-2xl text-slate-400 font-semibold">
            Wrong Answer. !!!
          </p>
          <img src="/wrong.png" className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
