import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import Header from './Components/common/Header';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Dashboard from './Components/Dashboard/Dashboard';
import PostJob from './Components/Dashboard/PostJob';
import AppliedJobs from './Components/Dashboard/AppliedJobs';
import ProtectedRoute from './Components/common/ProtectedRoute';

function App(props) {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/forgotpassword" component={ForgotPassword}></Route>
        <Route path="/resetpassword" component={ResetPassword}></Route>
        <ProtectedRoute path={"/dashboard"} component={Dashboard} />
        <ProtectedRoute path={"/postjob"} component={PostJob} allowedRole={0} />
        <ProtectedRoute path={"/appliedjobs"} component={AppliedJobs} allowedRole={1} />
      </Switch>
    </Router>
  );
}

export default App;
