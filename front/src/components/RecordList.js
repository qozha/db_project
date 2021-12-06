import React from 'react';
import Record from './Record';
import { useQuery, gql } from '@apollo/client';

const RECORD_QUERY = gql`
    {
    records(email: "daniel.schneider@mail.com"){
      email{
        department,
        email{
          email,
          surname
        }
      }
      totalPatients,
      totalDeaths
    }
  }
`;


const RecordList = () => {
    const {loading, error, data} = useQuery(RECORD_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    console.log(error)
    
    var sum = 0;
    for (let i = 0; i < data.records.length; i++) {
        sum+=data.records[i].totalPatients;
    }

    return (


        <div>
          <div>Good afternoon, mr./ms. {data.records[0].email.email.surname}</div>  
            <div>You have {sum} patients in your department</div>
          Your past records:
          {data && (
            <>
              {data.records.map((record) => (
                <Record key={record.totalDeaths} record={record} />
              ))}
            </>
          )}
        </div>
      );
    };

export default RecordList;