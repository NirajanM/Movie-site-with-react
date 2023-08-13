import { useState, useEffect } from "react";
import { fetchData } from '../utils/api'


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        fetchData(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
            })
    }, [url]);

    return { data, loading, error };
}

export default useFetch;