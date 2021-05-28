
import style from './App.css';
import { Provider } from 'react-redux';
import { useState, Component } from "react";
import configureStore from './Store/configureStore';
import { combineReducers } from "redux";

import Content from './Content/Content.jsx'
// import UploadTranscript from './Components/UploadTranscript/UploadTranscript.jsx'
import SitePage from './Components/SitePage/SitePage.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'
import NavBar from './NavBar/NavBar.jsx'
import Summaries from './Constants/dummySummaries';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import LocalStorage from './Utilities/LocaStorageUtils'
const MySwal = withReactContent(Swal)



const store = configureStore({
});
function Container() {
  return (
    <Provider store={store}>
   <div className={style["container"]}>
      <NavBar  />
    <Content />
    </div>
    </Provider>
  );
}

class App extends Component {
  fireTutorial = async() => {
    if(!LocalStorage.get('tutorialDone')){
      MySwal.fire({
        title: <h1>Tutorial</h1>,
        html: <iframe  src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        confirmButtonText:
      'Thanks for the Tutorial',
      }).then(() => {
        LocalStorage.set('tutorialDone', true)
      })
    }
  }
  componentDidMount (){
  //  this.fireTutorial();
  }
 render(){
  return (
    <Provider store={store}>
      <Container/>
    </Provider>
  );
 }
}

export default App;
