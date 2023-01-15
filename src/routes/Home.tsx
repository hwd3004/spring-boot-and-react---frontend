import { useState, useEffect } from "react";
import axiosInstance from "../modules/axiosInstance";

const Home = () => {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);

  const onClick = () => {
    setNumber(number + 1);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const { data } = await axiosInstance.get("/");
      console.log(data);
      setData(data);

      setLoading(false);
    };

    init();
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      {loading ? <h2>loading...</h2> : <p>{data}</p>}

      <button onClick={onClick}>{number}</button>
    </div>
  );
};

export default Home;
