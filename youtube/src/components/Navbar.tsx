export default function Navbar(){
    return (
    <div className="sticky top-0 w-full pl-6 pr-6 pt-2 bg-black">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <img className="w-24" src="/assets/yt.png" />
        </div>
        <div className="flex items-center h-12 w-2/5 ">
          <input
            className="w-5/6 h-full rounded-l-xl p-1 pl-4 text-grey-100
            bg-gray-800 border-gray-600 border placeholder-gray-50"
            type="text"
            placeholder="Search"
          />
          <button className="border-gray-600 border h-full w-1/6 rounded-r-xl bg-gray-700 flex justify-center items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
              </svg>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-5">
          <button className="flex flex-col ">
            <div className="font-extrabold m-0 p-0 text-[12px] leading-[0px] text-white">
              .
            </div>
            <div className="font-extrabold m-0 p-0 text-[12px] leading-[0px]] text-whit">
              .
            </div>
            <div className="font-extrabold m-0 p-0 text-[12px] leading-[0px]">
              .
            </div>
            {/* <div className="h-2 font-bold">.</div> */}
          </button>
          <button className="border-2 rounded-3xl border-blue-700 w-24 p-1.5">
            <div className="flex justify-around">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                color="rgb(37,99,235)"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <p className="text-blue-600">Sign in</p>
            </div>
          </button>
        </div>
      </div>
    </div>
    );
}

