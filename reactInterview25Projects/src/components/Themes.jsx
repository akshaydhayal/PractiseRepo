import useLocalStorageForThemes from "./useLocalStrogareForThemes"

export default function Themes(){
    const [val,setVal]=useLocalStorageForThemes("theme","dark");
    function toggleTheme(){
        val==="dark"?setVal("light"):setVal("dark");
    }
    return(
        <div>
            <h3>Hello</h3>
            <button onClick={toggleTheme}>Toggle theme</button>
        </div>
    )
}