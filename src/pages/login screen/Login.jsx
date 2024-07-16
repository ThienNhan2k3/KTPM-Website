import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

function Login() {
  return (
    <div className="container-fluid p-0 m-0 vh-100 d-flex flex-column justify-content-center">
      <div className="row h-100 m-0">
        <div className="col-md-4 d-none d-md-block p-0 m-0"></div> {/* Empty column for left spacing on larger screens */}
        <div className="col-md-8 custom-rounded d-flex flex-column justify-content-center align-items-center p-0 m-0" style={{ height: '100vh' }}>
          <h1>Installed Bootstrap successfully!</h1>
          <div  className="flex gap-3">
            <Button as="a" variant="primary">
              <Link to="/admin">
                Admin
              </Link>
            </Button>
            <Button as="a" variant="success">
              <Link to="/brand">
                Brand
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
