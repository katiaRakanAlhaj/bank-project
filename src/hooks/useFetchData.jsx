import React, { useEffect, useState } from "react";
import instance from "../data/instance";

const useFetchData = (url, id) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  const getData = async () => {
    try {
      setLoading(true);
      await instance({
        url: `${url}`,
        method: "GET",
      }).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { getData, data, isLoading, error };
};

export default useFetchData;
