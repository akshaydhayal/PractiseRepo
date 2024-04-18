import axios from "axios";
import React, { useState } from "react";
// title: String,
//   description: String,
//   point: Number,
//   difficulty: String,
//   topic_tags: [String],
//   last_user_solved: { type: Schema.Types.ObjectId, ref: "User" },
//   problem_stats: {
//     total_submit_count: Number,
//     total_correct_count: Number,
//   },
// examples: [
//     {
//       input: String,
//       output: String,
//       explaination: String,
//     },
//   ],
//   test_cases:[{
//     input:String,
//     output:String
//   }],
//   hints: [String],
//   companies:[String],
//   constraints:[String]
// });
export default function addQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [point, setPoint] = useState(0);
  const [problemStats, setProblemStats] = useState(null);
  const [topicTags, setTopicTags] = useState(null);
  const [lastUserSolved, setLastUserSolved] = useState(null);
  const [examples, setExamples] = useState(null);
  const [testCases, setTestCases] = useState(null);
  const [hints, setHints] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [constraints, setConstraints] = useState(null);

  async function handleAddQuestion() {
    console.log("examples: ");
    console.log(examples);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/problems`,
      {
        title,
        description,
        point,
        difficulty,
        topic_tags: JSON.parse(topicTags),
        problem_stats: { total_submit_count: 0, total_correct_count: 0 },
        hints: JSON.parse(hints),
        companies: JSON.parse(companies),
        constraints: JSON.parse(constraints),
        // examples: examples,
        examples: JSON.parse(examples),
        // test_cases: testCases,
        test_cases: JSON.parse(testCases),
      }
    );
    console.log("response from add question route");
    console.log(response.data);
  }

  return (
    <div className="h-screen">
      <div>
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100 text-black"
          type="text"
          placeholder="Problem Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100 "
          type="text"
          placeholder="Enter Problem Statement"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100 "
          type="text"
          placeholder="Difficulty(easy,medium,hard)"
          onChange={(e) => {
            setDifficulty(e.target.value);
          }}
        />
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100 "
          type="text"
          placeholder="Points"
          onChange={(e) => {
            setPoint(Number(e.target.value));
          }}
        />
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100 "
          type="text"
          placeholder="Topic tags"
          onChange={(e) => {
            setTopicTags(e.target.value);
          }}
        />
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100 "
          type="text"
          placeholder="Hints"
          onChange={(e) => {
            setHints(e.target.value);
          }}
        />
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100 "
          type="text"
          placeholder="Companies"
          onChange={(e) => {
            setCompanies(e.target.value);
          }}
        />
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100 "
          type="text"
          placeholder="Constraints"
          onChange={(e) => {
            setConstraints(e.target.value);
          }}
        />
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100 "
          type="text"
          placeholder="Problem Examples"
          onChange={(e) => {
            setExamples(e.target.value);
          }}
        />
        <input
          className="p-1 px-3 mb-5 rounded-md placeholder-slate-100 "
          type="text"
          placeholder="Problem TestCases"
          onChange={(e) => {
            setTestCases(e.target.value);
          }}
        />

        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
    </div>
  );
}
