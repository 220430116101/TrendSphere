import { useState } from 'react'
import './App.css'
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react';
import Navbar from './Components/Navbar';

import News from './Components/News';                          // class based component.
// import News from './Components/News(fun)'                                 // function based component.

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
pageSize=6;

  // Set up ref to control LoadingBar
  state = {
      progress: 0
    }

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    return (

      <Router>
      <div>

      <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
        onLoaderFinished = {() => this.setProgress(0)}
      />


      <Navbar/>
      {/* <News pageSize={6} country='us' category="general"/> */}


      <Routes>
            <Route exact path="/business" element={<News key="business" setProgress={this.setProgress} pageSize={this.pageSize = 10 } country='us' category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" setProgress={this.setProgress} pageSize={this.pageSize} country='us' category="entertainment" />} />
            <Route exact path="/" element={<News key="general" setProgress={this.setProgress} pageSize={this.pageSize} country='us' category="general" />} />
            <Route exact path="/health" element={<News key="health" setProgress={this.setProgress} pageSize={6} country='us' category="health" />} />
            <Route exact path="/science" element={<News key="science" setProgress={this.setProgress} pageSize={6} country='us' category="science" />} />
            <Route exact path="/sports" element={<News key="sports" setProgress={this.setProgress} pageSize={6} country='us' category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" setProgress={this.setProgress} pageSize={6} country='us' category="technology" />} />
      </Routes>

      </div>
      </Router>
    );
  }
}

  // const App = () =>  {
  //   const pageSize=6;
  
  //     const [progress, setProgress] = useState(0);
     
  //       return (
          
  //         <Router>
  //         <div>
    
  //         <LoadingBar
  //           color='#f11946'
  //           height={3}
  //           progress={progress}
  //           onLoaderFinished = {() => setProgress(0)}
  //         />
  
  // <Navbar/>
  //     {/* <News pageSize={6} country='us' category="general"/> */}

    
  //     <Routes>
  //           <Route exact path="/business" element={<News key="business" setProgress={setProgress} pageSize={pageSize} country='us' category="business" />} />
  //           <Route exact path="/entertainment" element={<News key="entertainment" setProgress={setProgress} pageSize={pageSize} country='us' category="entertainment" />} />
  //           <Route exact path="/" element={<News key="general" setProgress={setProgress} pageSize={pageSize} country='us' category="general" />} />
  //           <Route exact path="/health" element={<News key="health" setProgress={setProgress} pageSize={6} country='us' category="health" />} />
  //           <Route exact path="/science" element={<News key="science" setProgress={setProgress} pageSize={6} country='us' category="science" />} />
  //           <Route exact path="/sports" element={<News key="sports" setProgress={setProgress} pageSize={6} country='us' category="sports" />} />
  //           <Route exact path="/technology" element={<News key="technology" setProgress={setProgress} pageSize={6} country='us' category="technology" />} />
  //     </Routes>

  //     </div>
  //     </Router>
  //   );
  // }

  // export default;