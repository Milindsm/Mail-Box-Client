import { useState,useEffect } from "react";
import axios from "axios";

export const useAxiosGet = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setInterval(() => {
            const fetchData = async (url) => {
                try {
                    const response = await axios.get(url);
                    setData(response.data);
                    setError(null);
                } catch (err) {
                    setError(err.message);
                    setData([]);
                }
            };
            fetchData(url);
        }, 3000);
    }, [url]);
    return { data, error };
};