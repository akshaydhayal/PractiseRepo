export default function Videocard() {
  return (
    <div className="w-80">
      <img
        className="w-max h-48 rounded-xl mb-2"
        src="https://m.media-amazon.com/images/S/pv-target-images/149ac783c0e32bfecd62d2d447b5c36d304d5a5afe30db4d701dc93dc8bba5b0.jpg"
      />
      <div className="grid grid-cols-12" >
        <div className="col-span-2">
          <img
            className="h-10 w-10 rounded-full"
            src="https://m.media-amazon.com/images/S/pv-target-images/149ac783c0e32bfecd62d2d447b5c36d304d5a5afe30db4d701dc93dc8bba5b0.jpg"
          />
        </div>
        <div className="col-span-10">
          <div className="text-base">K.G.F Full Movie | Yash, Srinidhi Shetty</div>
          <div className="text-sm text-slate-400">Goldmines</div>
          <div className="grid grid-cols-9">
            <div className="col-span-3 text-sm">772M views</div>
            <div className="col-span-3 text-sm">3 years ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
