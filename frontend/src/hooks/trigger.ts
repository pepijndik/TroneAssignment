import { useState } from "react";

export const useTrigger = () => {
    const [trigger, setTrigger] = useState<string|any>();

    return {
        trigger,
        setTrigger
    }
};