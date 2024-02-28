import VerticalNav from "./VerticalNav";
import Videocard from "./Videocard";

export default function Videogrid(){
    const a=[1,2,3,4,5,6,7,8,9,10];
    return(
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 ml-12">
                {a.map(()=>{
                    return <Videocard/>
                })}
            </div>
        </div>
    )
}