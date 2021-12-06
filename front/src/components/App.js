import React from 'react';
import CreateRecord from './CreateRecord';
import CreateServant from './CreateServant';
import Header from './Header';
import RecordList from './RecordList';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route exact path="/create" element={<CreateRecord />} />
          <Route exact path="/register" element={<CreateServant />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
