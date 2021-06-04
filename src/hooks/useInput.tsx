import { useState } from "react";

const useInput = (pInitialValue: any) => {

    const [value, setValue] = useState(pInitialValue);

    const onChange = (e: any) => {
        setValue(e.target.type=="checkbox"?e.target.checked:e.target.value)
    };

    return {
        value,
        onChange
    };
}

export default useInput;