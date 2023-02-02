import { useState, useEffect } from "react";
import axiosInstance from "../modules/axiosInstance";
import MutationResponse from "../interfaces/MutationResponse.interface";

const Home = () => {
  const [mutationResponse, setMutationResponse] = useState<MutationResponse<null>>({
    data: null,
    message: "",
    success: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);

  const onClick = () => {
    setNumber(number + 1);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const response = await axiosInstance.get<MutationResponse<null>>("/");
      console.log(response);
      setMutationResponse(response.data);

      setLoading(false);
    };

    init();
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      {loading ? <h2>loading...</h2> : <p>{mutationResponse.message}</p>}

      <button onClick={onClick}>{number}</button>
    </div>
  );
};

export default Home;
