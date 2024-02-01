import Header from "./header/Header";
import Inspector from "./inspector/Inspector"
import Auth from "./auth/Auth";
import './App.css';
import React, {useState} from "react";
import AddRequest from "./inspector/AddRequest";


const getRequestsAsWorker = async (id) => {
  try{

    const response = await fetch('http://localhost:3050/requestsAsWorker/'+id);
    const jsonData = await response.json();

    return await jsonData;

  } catch (e) {
    console.error(e);
  }
}

const getEmployeeChefId = async (id) => {
  try{

    const response = await fetch('http://localhost:3050/employee_chef/'+id);
    const jsonData = await response.json();

    return await jsonData;

  } catch (e) {
    console.error(e);
  }
}

const getRequestsAsAdmin = async (id) => {
  try{
    const response = await fetch('http://localhost:3050/requestsAsAdmin/'+id);
    const jsonData = await response.json();

    return await jsonData;
  } catch (e) {
    console.error(e);
  }
}

const getEmployeeNameByEmployeeChef = async (id) => {
  try{
    const response = await fetch('http://localhost:3050/employee/'+id);
    const jsonData = await response.json();
    return await jsonData;
  } catch (e) {
    console.error(e);
  }
}


function App() {
  const [user, setUser] = useState();
  const [asWorker, setAsWorker] = useState([]);
  const [asAdmin, setAsAdmin] = useState([]);
  const [employee_chef, setEmployee_chef] = useState();
  const authorize = (_user) => {
    if(!_user) return;
    setUser(_user);
    getRequestsAsWorker(_user.employee_id).then(e => {setAsWorker(e)});
    getEmployeeChefId(_user.employee_id).then(e => {setEmployee_chef(e)});
    if(!_user.isAdmin) return;
    getRequestsAsAdmin(_user.employee_id).then(reqs => {
      for(let i = 0; i < reqs.length; i++){
        getEmployeeNameByEmployeeChef(reqs[i].employee_chef_id).then( name => {
          reqs[i].name = name;
          reqs[i].decision = 'decision';
          reqs[i].chef_name = _user.employee_name;
        });
      }

      setAsAdmin(reqs);
    })
  }

  return (
    <div className="App">

        {
        user
            ? <div className="main-page">
                <AddRequest user={user} employee_chef={employee_chef}></AddRequest>
                <Header authorize={authorize} name={user.employee_name}/>
                <Inspector user={user} asWorker={asWorker} asAdmin={asAdmin}/>
              </div>

            : <Auth authorize={authorize}></Auth>


        }
    </div>
  );
}

export default App;
