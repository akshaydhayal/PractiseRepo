export default function aboutPage() {
  return (
    <div className="flex justify-center h-screen">
      <div className="w-5/6 flex mt-8 gap-16">
        <div>
          <p className="text-xl text-slate-100 mb-3">About</p>
          <p className="text-lg text-slate-300">
            Erdős is an application for Math Geeks to try out new mathematical
            problems and keep track of who solves what. Named after one of the
            most prolific mathematician of all times, Paul Erdős, it is a portal
            for users to test their mettle on various mathematical problems,
            some of which may require users to write code.
          </p>
          <br />
          <p className="text-lg text-slate-300">
            The design of Erdős is clean and card-based, with a focus on
            user-interaction above everything else. It has been developed by
            SDSLabs, IIT Roorkee.
          </p>
          <br />
          <p className="text-lg text-slate-400 italic">
            "If numbers aren't beautiful, I don't know what is." - Paul Erdős
          </p>
        </div>
        <div>
          <p className="text-xl text-slate-200 mb-2">Subscribe for updates</p>
          <p className="text-base text-slate-200">
            Upcoming competitions, new problems, feature additions and more.
            Maximum 2 emails a month. Promise.
          </p>
          <div className="flex flex-col gap-2 p-3">
            <input
              className="p-1  border-2 border-slate-300"
              type="email"
              placeholder="Email"
            />
            <button className="bg-blue-700 w-fit px-2 py-1 text-white">
              Subscibe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
