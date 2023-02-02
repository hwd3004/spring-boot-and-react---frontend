import { useState } from "react";
import User from "../../interfaces/user.interface";
import React from "react";
import axiosInstance from "../../modules/axiosInstance";
import MutationResponse from "../../interfaces/MutationResponse.interface";
import { AxiosError, AxiosResponse } from "axios";

const Signup = () => {
  const [userValues, setUserValues] = useState<User>({});
  const [mutationResponse, setMutationResponse] = useState<MutationResponse<null>>({
    data: null,
    message: "",
    success: false,
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let response: AxiosResponse<MutationResponse<null>>;

    try {
      event.preventDefault();

      const formData = new FormData();

      const { username, password, confirmPassword, email, confirmEmail, image } = userValues;

      username && formData.append("username", username);
      password && formData.append("password", password);
      confirmPassword && formData.append("confirmPassword", confirmPassword);
      email && formData.append("email", email);
      confirmEmail && formData.append("confirmEmail", confirmEmail);
      image && formData.append("image", image);

      // 자바스크립트로 개발 혹은 타입스크립트여도 유연하게 개발한다면
      // for (const key in userValues) {
      //   formData.append(key, userValues[key]);
      // }

      response = await axiosInstance.post<MutationResponse<null>>("/users/signup", userValues);

      setMutationResponse(response.data);

      onComplete(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        response = error.response as AxiosResponse<MutationResponse<null>>;
        setMutationResponse(response.data);
      }

      if (error instanceof TypeError) {
        setMutationResponse({
          data: null,
          message: "서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.",
          success: false,
        });
      }
    }
  };

  const onComplete = (response: AxiosResponse<MutationResponse<null>>) => {
    setMutationResponse(response.data);
    console.log(response.data);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setUserValues({ ...userValues, [name]: value });
    console.log(userValues);
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input onChange={onChange} name="username" type="text" className="form-control" />
          <small className="form-text text-muted">Please enter your name</small>
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input onChange={onChange} name="password" type="password" className="form-control" />
          <small className="form-text text-muted">Plase enter your password</small>
        </div>

        <div className="form-group">
          <label className="text-muted">Confirm Password</label>
          <input onChange={onChange} name="confirmPassword" type="password" className="form-control" />
          <small className="form-text text-muted">Please confirm your password.</small>
        </div>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input onChange={onChange} name="email" type="email" className="form-control" />
          <small className="form-text text-muted">Please enter your email</small>
        </div>

        <div className="form-group">
          <label className="text-muted">Confirm Email</label>
          <input onChange={onChange} name="confirmEmail" type="email" className="form-control" />
          <small className="form-text text-muted">Please confirm your email.</small>
        </div>

        <div className="form-group">
          <label className="text-muted">Image</label>
          <input onChange={onChange} name="image" type="file" className="form-control" />
          <small className="form-text text-muted">
            avatar image should be less than 1mb and should be in jpg, jpeg, png format
          </small>
        </div>

        <button type="submit" className="btn btn-raised btn-primary">
          Submit
        </button>
      </form>

      <br />
      {mutationResponse.message}
    </div>
  );
};

export default Signup;
