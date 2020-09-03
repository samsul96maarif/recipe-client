import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import HomePage from "./pages/recipe"
import backgroundImage from "./assets/images/double-bubble-outline.png"
import AddItem from "./pages/recipe/AddItem";
import EditItem from "./pages/recipe/EditItem";

function App() {
    return (
        <div className="App" style={{
            backgroundImage: `url(${backgroundImage})`,
        }}>
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
