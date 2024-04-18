import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import Chart from "chart.js/auto";

export default function activityPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getActivityData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/submission`
      );
      const data = await response.json();
      console.log(data);
      setSubmissions(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getActivityData();
  }, []);

  // if(loading){
  //   return<div>Loading...please wait!!</div>
  // }

  function calculateSubmitTime(time) {
    const currTime: any = new Date();
    const submitTime: any = new Date(time);
    const diffTimeInHours = Math.round(
      (currTime - submitTime) / (1000 * 60 * 60)
    );
    let totalDiff = "";
    if (diffTimeInHours <= 24) {
      totalDiff += `${diffTimeInHours} hours`;
    } else {
      let days = Math.round(diffTimeInHours / 24);
      totalDiff += `${days} days`;
      if (days >= 30) {
        let months = Math.round(days / 30);
        totalDiff += `${months} months`;
        if (months >= 12) {
          let years = Math.round(months / 12);
          totalDiff += `${years} years`;
        }
      }
    }
    return totalDiff;
  }
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col w-9/12">
        <p className="text-2xl text-slate-100 mb-6">Submissions</p>
        <table className=" w-full">
          <thead className="border-b border-slate-200">
            <tr>
              <th className="text-white w-1/5 text-start p-2 px-4">User</th>
              <th className="text-white w-1/5 text-start p-2 px-4">Problem</th>
              <th className="text-white w-2/5 text-start p-2 px-4">Submitted</th>
              <th className="text-white w-1/5 text-start p-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions &&
              submissions.map((act) => {
                return (
                  <tr className="border-b border-slate-200">
                    <td className="text-slate-100 w-1/5 p-2 px-4">
                      {act.user?.name}({act.user?.username})
                    </td>

                    <td className="text-slate-100 w-1/5 p-2 px-4">
                      {act.problem?._id}
                    </td>
                    <td className="text-slate-100 w-2/5 p-2 px-4">
                      about {calculateSubmitTime(act.createdAt)} ago
                    </td>
                    <td className="text-slate-100 w-1/5 p-2 px-4">
                      <img
                        className="w-6 h-6"
                        src={
                          act.problem_correct === true
                            ? "correct.png"
                            : "wrong.png"
                        }
                      />
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

// export function ActivityChart(){
//   const labels = Utils.months({ count: 10 });
//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: "My First Dataset",
//         data: [65, 59, 80, 81, 56, 55, 40, 3, 84, 12],
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         tension: 0.1,
//         pointBackgroundColor: "red",
//         pointBorderWidth: 9,
//       },
//     ],
//   };
//   const config = {
//     type: "line",
//     data: data,
//   };
//   const myLineChart = new Chart(ctx, config);

//   return(
//     <div>

//     </div>
//   )
// }
