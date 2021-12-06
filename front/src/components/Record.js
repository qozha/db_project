import React from 'react';

const Record = (props) => {
  const { record } = props;
  return (
    <div>
      <div>
        Total deaths - {record.totalDeaths}, total patients - {record.totalPatients}
      </div>
    </div>
  );
};

export default Record;