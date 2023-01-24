import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch(url,dependencies=[]) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            setError(false);
            // setLoading(true);
            try {
                const result = await axios.get(url, { signal: controller.signal }); //fetching data from server
                setData(result.data); //updating the jokes array state, which will rerender the component.
            } catch (error) {
                if (axios.isCancel(error)) {
                    return;
                }
                setError(true);
            }
            setLoading(false);

            //cleanup
            return () => {
                controller.abort();
            };
        })(); // IIFE
    }, dependencies);
    return [data, error, loading];
}
