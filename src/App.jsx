import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="container-fluid p-0 m-0 vh-100 d-flex flex-column justify-content-center">
      <div className="row h-100 m-0">
        <div className="col-md-4 d-none d-md-block p-0 m-0"></div> {/* Empty column for left spacing on larger screens */}
        <div className="col-md-8 custom-rounded d-flex flex-column justify-content-center align-items-center p-0 m-0" style={{ backgroundColor: '#d3d3d3', height: '100vh' }}>
          <h1>Installed Bootstrap successfully!</h1>
          <Stack direction="horizontal" gap={2} className="mb-3">
            <Button as="a" variant="primary">
              Button as link
            </Button>
            <Button as="a" variant="success">
              Button as link
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default App;
