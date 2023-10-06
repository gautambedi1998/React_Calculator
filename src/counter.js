import { useState } from "react";

function Counter() {
    let buttonPressed = () => alert('Button is pressed');

    const[count, setCount] = useState(0);

    function hehe(){
        return setCount(count + 1);
    }

    return (  
        <div>
            Hello this is the new component {count}
            <button  onClick={hehe}> Increment</button>
            <button> Decrement</button>
        </div>
        
    );
}

export default Counter;
