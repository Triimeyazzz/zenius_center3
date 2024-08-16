import { useEffect, useState } from 'react';

const usePolling = (url, interval = 5000) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result.messages); // Adjust based on your API response
            } catch (error) {
                setError(error);
            }
        };

        fetchData(); // Fetch data on mount
        const id = setInterval(fetchData, interval); // Set up polling

        return () => clearInterval(id); // Cleanup on unmount
    }, [url, interval]);

    return { data, error };
};

export default usePolling;
