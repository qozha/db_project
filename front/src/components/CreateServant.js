import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_SERVANT_MUTATION = gql`
  mutation PostMutation(
    $email: String!
    $password: String!
    $name: String!
    $surname: String!
    $salary: Int!
    $phone: String!
    $cname: String!
    $dep: String!
  ) {
    registerServant(
      email: $email
      password: $password
      name: $name
      surname: $surname
      salary: $salary
      phone: $phone
      cname: $cname
      dep: $dep
    ) {
      status
    }
  }
`;
const CreateRecord = () => {
  const [formState, setFormState] = useState({
    email: 'madiabsadykov@gmail.com',
    password: 'password',
    name: 'Madi',
    surname: 'Absadykov',
    salary: 50000,
    phone: '+77078047150',
    cname: 'Kazakhstan',
    dep: 'Dep1',
  });

  const [createRecord] = useMutation(CREATE_RECORD_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
      name: formState.name,
      surname: formState.surname,
      salary: formState.salary,
      phone: formState.phone,
      cname: formState.cname,
      dep: formState.dep,
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createRecord();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            type="text"
            placeholder="Email address"
          />
          <input
            className="mb2"
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
            type="text"
            placeholder="Password"
          />
          <input
            className="mb2"
            value={formState.cname}
            onChange={(e) =>
              setFormState({
                ...formState,
                cname: e.target.value,
              })
            }
            type="text"
            placeholder="Country of occupation"
          />
          <input
            className="mb2"
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Name"
          />
          <input
            className="mb2"
            value={formState.surname}
            onChange={(e) =>
              setFormState({
                ...formState,
                surname: e.target.value,
              })
            }
            type="text"
            placeholder="Surname"
          />
          <input
            className="mb2"
            value={formState.salary}
            onChange={(e) =>
              setFormState({
                ...formState,
                salary: e.target.value,
              })
            }
            type="number"
            placeholder="Salary"
          />
          <input
            className="mb2"
            value={formState.phone}
            onChange={(e) =>
              setFormState({
                ...formState,
                phone: e.target.value,
              })
            }
            type="text"
            placeholder="Phone number"
          />
          <input
            className="mb2"
            value={formState.dep}
            onChange={(e) =>
              setFormState({
                ...formState,
                dep: e.target.value,
              })
            }
            type="text"
            placeholder="Department"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateServant;
