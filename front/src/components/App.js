import React from 'react';
import CreateRecord from './CreateRecord';
import Header from './Header';
import RecordList from './RecordList';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route exact path="/" element={<RecordList/>} />
          <Route
            exact
            path="/create"  
            element={<CreateRecord/>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;