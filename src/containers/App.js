import React, { Component } from 'react';
import './App.css';
import MetaTags from 'react-meta-tags';
import Navigation from '../components/Navigation/Navigation.js'
import Signin from './Signin/Signin.js'
import Register from './Register/Register.js'
import Logo from '../components/Logo/Logo.js'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js'
import Rank from '../components/Rank/Rank.js'
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js'
import Particles from 'react-particles-js';
import Error from './Error/Error'

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  showError: false,
  errorMessage: '',
  loading: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() { //needed for using state
    super(); //to be able to use 'this'
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    let regions = data.outputs[0].data.regions;
    let boxes = [];
    for (let i = 0; i < regions.length; i++) {
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      boxes[i] = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }
    return boxes;
  }

  displayFaceBox = (box) => {
    this.setState({
      box: box
    })
  }

  //propery of the App
  onInputChange = (event) => { //receive event from event listener
    this.setState({input: event.target.value});
    this.setState({showError: false})
  }

  clearFaces = () => {
    document.getElementById('imgScan').innerHTML = "";
    this.setState({box: []})
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    if (this.state.input === '') {
      this.setState({showError: true})
      this.setState({errorMessage: 'Please enter your image url'})
    } else {
      this.setState({loading: true})
      fetch('https://lit-castle-50784.herokuapp.com/imageurl', { ////RECEIVE_POINT_FROM_SERVER
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          this.setState({loading: false})
          fetch('https://lit-castle-50784.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
        //console.log('Is image: ' + (typeof response !== 'string')); //if image
        if (typeof response !== 'string') { //if image
          this.displayFaceBox(this.calculateFaceLocation(response));
          this.setState({showError: false})
        } else {
          this.setState({errorMessage: 'Error. Invalid image url'})
          this.setState({showError: true})
        }
      })
      .catch(err => console.log(err));
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  componentDidMount() {
    document.title = "Face Recognition";
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <div className='square'>
          <MetaTags>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </MetaTags>
          <Particles className='particles' params={particlesOptions} />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { route === 'home'
            ?<div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onPictureSubmit}
                loading={this.state.loading}
              />
              {this.state.showError ? 
                <Error  
                  errorMessage={this.state.errorMessage}
                  showError={this.state.showError}
                /> 
                : null
              }
              {!this.state.showError ? <FaceRecognition box={box} imageUrl={imageUrl}/> : null}
            </div>
            : (route === 'signin' || route === 'signout' )
            ?<div>
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            </div>
            : <div>
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              </div>
          }
        </div>
      </div>
    );
  }
}

const particlesOptions = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

export default App;
