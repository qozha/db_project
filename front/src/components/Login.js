import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';

const LOGIN_MUTATION = gql`
  mutation loginAdmin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      navigate('/');
    },
  });

  return (
    <div>
      <h4 className="mv3">
        Login
      </h4>
      <div className="flex flex-column">
        {!formState.login}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Your password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={login}
        >
          {'login'}
        </button> 
      </div>
    </div>
  );
};


export default Login;
