import React, { useState } from "react";
import { gql } from "graphql-tag";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { authUser } from "../store/reducers/authSlice";

const CREATEUSER = gql`
  mutation CREATEUSER($name: String!, $email: String!, $password: String!) {
    createUser(
      createUserInput: { name: $name, email: $email, password: $password }
    ) {
      id
      idToken
      name
      email
    }
  }
`;

const LOGINUSER = gql`
  mutation LOGINUSER($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      id
      idToken
      name
    }
  }
`;

function LoginPage() {
  const [loginForm, setLoginForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Mutation
  const [createUser] = useMutation(CREATEUSER);
  const [loginUser] = useMutation(LOGINUSER);

  //   Switch Form Login / Create New User
  const switchLogin = () => {
    setLoginForm((p) => !p);
  };

  // Button Submit Handeler
  const onSubmitHandeler = async () => {
    if (loginForm) {
      const { data } = await loginUser({
        variables: {
          password,
          email,
        },
      });

      // Store idToken In Local Storage
      localStorage.setItem("soho", data.registerUser.idToken);

      // Storing In Redux
      dispatch(authUser(data.registerUser));
    } else {
      const { data } = await createUser({
        variables: { name, email, password },
      });

      // Store idToken In Local Storage
      localStorage.setItem("soho", data.createUser.idToken);

      // Storing In Redux
      dispatch(authUser(data.createUser));
    }
  };

  return (
    <div>
      <div className=" flex flex-col gap-5 justify-center items-center bg-blue-300 p-10">
        <h1>{loginForm ? "Login To Ur Account" : "Create New Account"}</h1>
        {!loginForm && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Enter Password"
        />
        <button onClick={onSubmitHandeler} className=" border bg-gray-200 ">
          {loginForm ? "Login" : "Create"}
        </button>
        <button onClick={switchLogin}>
          {loginForm ? "Create new account" : "Login To Existing Account"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
