import { useState, useEffect } from "react";
import axiosInstance from "./modules/axiosInstance";

const App = () => {
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
    <>
      <h1>Hello</h1>
      {loading ? <h1>loading...</h1> : <p>{data}</p>}

      <button onClick={onClick}>{number}</button>
    </>
  );
};
export default App;
