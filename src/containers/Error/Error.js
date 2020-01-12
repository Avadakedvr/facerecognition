import React from 'react';
import Alert from 'react-bootstrap/Alert';

class Error extends React.Component { //received as a param/prop from App file

  constructor(props) {
    super(props);
    const { errorMessage, showError } = this.props;
    this.state = {
      errorMessage: errorMessage,
      showError: showError
    }
  }

  noError = () => {
    this.setState({showError: false})
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({showError: newProps.showError});
  }

  displayError = (errorMessage) => {
    if(this.state.showError) {
      return(
        <Alert variant='danger' onClose={this.noError} dismissible>
          {errorMessage}
        </Alert>
      ) 
    } else {
      return null
    }
  }

  render() {
    return(
      <div className='center text-center mt-2 w-30'>
        {this.displayError(this.state.errorMessage)}
      </div>
    )
  }
}

export default Error