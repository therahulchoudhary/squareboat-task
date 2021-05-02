import { React } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const history = useHistory();
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const clearSession = () => {
        sessionStorage.removeItem('userData');
        history.push('/');
    }
    return (
        <Navbar expand="lg" fixed="top" className="top_navbar">
            <Link className="navbar_brand">My<span style={{ color: '#43AFFF' }}>Jobs</span></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {!user ? <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"></Nav>
                {(location.pathname !== '/login' && location.pathname !== '/signup') && <Link to="/login" className="login_signup_btn">Login/Signup</Link>}
            </Navbar.Collapse> :
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    {user.userRole == 0 && <Link to="/postjob" style={{ color: 'white', marginRight: 35 }} className={location.pathname === "/postjob" && 'active_style'}>Post a job</Link>}
                    {user.userRole == 1 && <Link to="/appliedjobs" style={{ color: 'white', marginRight: 35 }} className={location.pathname === "/appliedjobs" && 'active_style'}>Applied jobs</Link>}
                    <Link to="/dashboard" className="profile_button_div">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="profile_icon">{user.name.slice(0, 1)}</span>
                            <i className="fa fa-caret-down" style={{ color: '#D9EFFF' }} aria-hidden="true"></i>
                        </div>

                    </Link>
                    <div className="logout_button_div">
                        <button onClick={clearSession}>Logout</button>
                    </div>
                </Navbar.Collapse>}
        </Navbar >
    )
}

export default Header;