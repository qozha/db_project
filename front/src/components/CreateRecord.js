import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_RECORD_MUTATION = gql`
  mutation PostMutation(
    $cname: String!
    $diseaseCode: String!
    $email: String!
    $totalDeaths: Int!
    $totalPatients: Int!
  ) {
    makeRecord(cname: $cname, diseaseCode: $diseaseCode, email: $email, totalDeaths: $totalDeaths, totalPatients: $totalPatients){
        status
      }
  }
`;
const CreateRecord = () => {
  const [formState, setFormState] = useState({
    cname: '',
    diseaseCode: '',
    email: 'daniel.schneider@mail.com',
    totalDeaths: 100,
    totalPatients: 10000,
  })
  
  const [createRecord] = useMutation(CREATE_RECORD_MUTATION, {
    variables: {
        cname: formState.cname,
        diseaseCode: formState.diseaseCode,
        email: formState.email,
        totalDeaths: formState.totalDeaths,
        totalPatients: formState.totalPatients,
    }
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
            value={formState.cname}
            onChange={(e) =>
              setFormState({
                ...formState,
                cname: e.target.value
              })
            }
            type="text"
            placeholder="A country name for the record"
          />
          <input
            className="mb2"
            value={formState.diseaseCode}
            onChange={(e) =>
              setFormState({
                ...formState,
                diseaseCode: e.target.value
              })
            }
            type="text"
            placeholder="The disease code for the record"
          />
          <input
            className="mb2"
            value={formState.totalDeaths}
            onChange={(e) =>
              setFormState({
                ...formState,
                totalDeaths: e.target.value
              })
            }
            type="number"
            placeholder="Number of total deaths"
          />
          <input
            className="mb2"
            value={formState.totalPatients}
            onChange={(e) =>
              setFormState({
                ...formState,
                totalPatients: e.target.value
              })
            }
            type="number"
            placeholder="Number of total patients"
          />
          <input
            className="mb2"
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
              })
            }
            type="text"
            placeholder="Confirm your email address"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateRecord;