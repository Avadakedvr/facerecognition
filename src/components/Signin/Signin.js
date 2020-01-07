import React from 'react';
import './Signin.css';

const Signin = ({onRouteChange}) => {
  return(
    <div id='signInForm'>
      <div className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control " placeholder="Password" required />
        <button onClick={() => onRouteChange('home')} className="btn btn-md btn-primary btn-block mt-4" type="submit">Sign in</button>
        <div className='lh-copy mt3'>
          <a onClick={() => onRouteChange('register')} href="#0" className="badge badge-info">Register</a>
        </div>
      </div>
    </div>
  )
}

export default Signin