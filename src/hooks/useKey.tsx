import { useState, useEffect } from "react";

const useKey = () => {

    const [key, setKey] = useState(null);
    useEffect(() => {

        const onKeyDown = (e: any) => {
            if (document.activeElement != document.body) return;
            setKey(e);
        }

        const onKeyUp = (e: any) => {
            setKey(null);
        }

        document.addEventListener("keyup", onKeyUp);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.removeEventListener("keyup", onKeyUp)
        }
    });

    return key?.keyCode;

}

export default useKey;