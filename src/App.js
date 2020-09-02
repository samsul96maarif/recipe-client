import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/home"
import backgoround from "./assets/images/double-bubble-outline.png"
import AddItem from "./pages/home/AddItem";
import EditItem from "./pages/home/EditItem";

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${backgoround})`}}>
        <Router>
            <Switch>
                <Route exact path={"/"} component={HomePage}/>
                <Route path={"/recipes/add"} component={AddItem}/>
                <Route exact path="/recipes/:recipeId" component={EditItem}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
