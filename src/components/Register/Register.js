import React from 'react';
import './Register.css';

const Register = ({onRouteChange}) => {
  return(
    <div id='signInForm'>
      <div className="form-signup">
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
        <label htmlFor="inputName" className="sr-only">Name</label>
        <input type="text" id="inputName" className="form-control" placeholder="Name" required autoFocus />
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control " placeholder="Password" required />
        <button onClick={() => onRouteChange('home')} className="btn btn-md btn-primary btn-block mt-4" type="submit">Register</button>
        <div className='lh-copy mt3'>
          <a href="#0" onClick={() => onRouteChange('signin')} className="badge badge-info">Sign in</a>
        </div>
      </div>
    </div>
  )
}

export default Register