import React from 'react';
import './../css/App.css';
import'bootstrap/dist/css/bootstrap.css';
import DeployAdd from './deploy/DeployAdd';


function App() {
  return (
    <div className="App">
      <div className="flex-row">
				<div className="flex-large">					
							<DeployAdd />
				</div>
			</div>
    </div>
  );
}

export default App;
