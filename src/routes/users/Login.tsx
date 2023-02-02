import { useState, useEffect } from "react";
import User from "../../interfaces/user.interface";
import MutationResponse from "../../interfaces/MutationResponse.interface";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../../modules/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userValues, setuserValues] = useState<User>({});
  const [mutationResponse, setMutationResponse] = useState<MutationResponse<string>>({
    data: "",
    message: "",
    success: false,
  });

  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setuserValues({
      ...userValues,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let response: AxiosResponse<MutationResponse<string>>;

    try {
      event.preventDefault();

      const formData = new FormData();

      for (const key in userValues) {
        formData.append(key, userValues[key]);
      }

      response = await axiosInstance.post<MutationResponse<string>>("/users/login", userValues);
      onComplete(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        response = error.response as AxiosResponse<MutationResponse<string>>;
        setMutationResponse(response.data);
      }

      if (error instanceof TypeError) {
        setMutationResponse({
          data: "",
          message: "서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.",
          success: false,
        });
      }

      console.log(error);
    }
  };

  const onComplete = (response: AxiosResponse<MutationResponse<string>>) => {
    setMutationResponse(response.data);

    const {
      data: { data },
    } = response;
    localStorage.setItem("token", data);

    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username"> Username </label>
          <input onChange={onChange} type="text" className="form-control" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password </label>
          <input onChange={onChange} type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <br />
      {mutationResponse.message}
    </div>
  );
};

export default Login;
