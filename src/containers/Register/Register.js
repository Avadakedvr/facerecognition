import React from 'react';
import './Register.css';
import Alert from 'react-bootstrap/Alert';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_match: false,
      errors: {
        name: '',
        email: '',
        password: '',
        c_password: '',
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
      case 'name': 
        errors.name = 
          value.length < 2
            ? 'Name must be 2 or more characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 or more characters long!'
            : '';
        break;
      case 'c_password': 
        const match = value === this.state.password;
        errors.c_password = 
          !match
            ? 'Passwords do not match'
            : '';
        this.setState({password_match: match})
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
    const { name, email, password, password_match, errors } = this.state;

    if (name.length < 1) {
      this.setState(prevState => 
        ({errors:{...prevState.errors, name: 'Please insert your name'}}));
      return false;
    }
    if (email.length < 1) {
      this.setState(prevState => 
        ({errors:{...prevState.errors, email: 'Please insert your email'}}));
      return false;
    } 
    if (password.length < 1) {
      this.setState(prevState => 
        ({errors:{...prevState.errors, password: 'Please insert your password'}}));
      return false;
    }
    if (!password_match) {
      this.setState(prevState => 
        ({errors:{...prevState.errors, c_password: 'Passwords do not match'}}));
    }

    if (!errors.name.length && !errors.email.length 
    && !errors.password.length && password_match) {
      return true;
    } else {
      return false;
    }
  }
  onNameChange = (event) => {
    this.setState({name: event.target.value})
    this.handleChange(event)
  }


  onEmailChange = (event) => {
    this.setState({email: event.target.value})
    this.handleChange(event);
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
    this.handleChange(event);
  }

  onEnterKeyPress = (target) => {
    if (target.charCode === 13) {
      this.onSubmitRegister();
    }
  } 

  onSubmitRegister = () => {
    const {name, email, password} = this.state;
    if (this.formIsValid()) {
      fetch('https://lit-castle-50784.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
      }).then(response => response.json())
      .then(user => {
        if (user.id) {
          console.log('Register successful')
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          //DISPLAY ERROR
          this.setState({errorMessage: "Could not register user."})
          this.setState({showError: true})
        }
      })
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

  render() {
    const {onRouteChange} = this.props;
    const {errors} = this.state;
    return(
      <div id='signUpForm'>
        <div className="form-signup" noValidate>
          <h1 className="h3 mb-3 font-weight-normal">Register</h1>
          <label htmlFor="inputName" className="sr-only">Name</label>
          <input name='name' onKeyPress={this.onEnterKeyPress} onChange={this.onNameChange} type="text" id="inputName" className="form-control" placeholder="Name" required autoFocus />
          {errors.name.length > 0 && <span className='error'>{errors.name}</span>}
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input name='email' onKeyPress={this.onEnterKeyPress} onChange={this.onEmailChange} type="email" className="form-control" placeholder="Email address" required autoFocus />
          {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input name='password' onKeyPress={this.onEnterKeyPress} onChange={this.onPasswordChange} type="password" id="inputPassword" className="form-control " placeholder="Password" required />
          {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
          <label htmlFor="inputPassword" className="sr-only">Confirm password</label>
          <input name="c_password" onKeyPress={this.onEnterKeyPress} onChange={this.handleChange} type="password" id="inputCPassword" className="form-control " placeholder="Confirm password" required />
          {errors.c_password.length > 0 && <span className='error'>{errors.c_password}</span>}
          <button onClick={this.onSubmitRegister} className="btn btn-md btn-primary btn-block mt-4" type="submit">Register</button>
          <div className='lh-copy mt3'>
            <a href="#0" onClick={() => onRouteChange('signin')} className="badge badge-info">Sign in</a>
          </div>
          <div className='text-center mt-2'>
            {this.displayError(this.state.errorMessage)}
          </div>
        </div>
      </div>
    )
  }
  
}

export default Register