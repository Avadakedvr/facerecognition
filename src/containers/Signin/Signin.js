import React from 'react';
import './Signin.css';
import Alert from 'react-bootstrap/Alert';

class Signin extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      errors: {
        email: '',
        password: '',
      },
      errorMessage: 'No error',
      showError: false
    }
  }

  handleChange = (event) => {
    this.setState({showError: false})
    // eslint-disable-next-line
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 1
            ? 'Please insert your password!'
            : '';
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value});
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  formIsValid = () => {
    const { signInEmail, signInPassword, errors } = this.state;

    if (signInEmail.length < 1) {
      this.setState(prevState => 
        ({errors:{...prevState.errors, email: 'Please insert your email'}}));
      return false;
    } 
    if (signInPassword.length < 1) {
      this.setState(prevState => 
        ({errors:{...prevState.errors, password: 'Please insert your password'}}));
      return false;
    }

    if (!errors.email.length && !errors.password.length) {
      return true;
    } else {
      return false;
    }
  }

  toggleError = () => {
    if (this.state.showError) {
      this.setState({showError: false})
    } else {
      this.setState({showError: true})
    }
  }

  displayError = (errorMessage) => {
    if(this.state.showError) {
      return(
        <Alert variant='danger' onClose={this.toggleError} dismissible>
          {errorMessage}
        </Alert>
      ) 
    } else {
      return null
    }
  }
  
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
    this.handleChange(event)
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
    this.handleChange(event)
  }

  onSubmitSignIn = () => {
    const { signInEmail, signInPassword } = this.state
    if (this.formIsValid()) {
      fetch('https://lit-castle-50784.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
      }).then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          this.setState({errorMessage: "Could not sign in. Check your details"})
          this.setState({showError: true})
        }
      })
    }
  }

  onEnterKeyPress = (target) => {
    if (target.charCode === 13) {
      this.onSubmitSignIn();
    }
  } 

  render() {
    const {onRouteChange} = this.props;
    const {errors} = this.state;
    return(
      <div id='signInForm'>
        <div className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input 
            name="email"
            type="email" 
            id="inputEmail" 
            onKeyPress={this.onEnterKeyPress} 
            className="form-control" 
            placeholder="Email address" 
            onChange={this.onEmailChange}
            required autoFocus 
          />
          {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input 
            name="password"
            type="password" 
            id="inputPassword" 
            onKeyPress={this.onEnterKeyPress} 
            className="form-control " 
            placeholder="Password" 
            onChange={this.onPasswordChange}
            required 
          />
          {errors.password.length > 0 && <span className='mb-2 error'>{errors.password}</span>}
          <button onClick={this.onSubmitSignIn} className="btn btn-md btn-primary btn-block mt-4" type="submit">Sign in</button>
          <div className='lh-copy mt3'>
            <a onClick={() => onRouteChange('register')} href="#0" className="badge badge-info">Register</a>
          </div>
          <div className='text-center mt-2'>
            {this.displayError(this.state.errorMessage)}
          </div>
        </div>
      </div>
    )
  }
}

export default Signin