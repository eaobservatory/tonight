import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  //   useEffect(() => {
  //     setLoading(true);
  //     axios
  //       .get(url)
  //       .then((response) => {
  //         setData(response.data);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }, [url]);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
