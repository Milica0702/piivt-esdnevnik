import {Link } from "react-router-dom";
function Menu(){
    return(
       
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <Link className="navbar-brand" to="/">Home page</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/auth/student/login">Student login</Link>
                        <Link className="nav-item nav-link" to="/contact">Contact</Link>
                        <Link className="nav-item nav-link" to="/subjects">Subjects</Link>
                        <Link className="nav-item nav-link" to="/profesor/dashboard">Profesor dashboard</Link>
                    </div>
                </div>
            </nav>
        
    );
}
export default Menu;