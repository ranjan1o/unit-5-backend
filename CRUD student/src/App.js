import logo from './logo.svg';
import './App.css';

import { Switch, Route } from "react-router-dom";
import Homepage from './Components/Homepage/Homepage';
import StudentEditForm from './Components/Form/StudentEditForm';
function App() {
  return (
    <div className="App">
     

      <Switch>
            
  
          
               <Switch>
                <Route exact path="/students" >
                    <Homepage />

                </Route>

                <Route exact path="/students/:id" >
                    <StudentEditForm />
                </Route>

            </Switch>
    
              
      </Switch>
    </div>
  );
}

export default App;
