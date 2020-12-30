import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: ''
        }
    }

    onInputChange = (event) => {
        console.log(event);
        this.setState({
            [event.target.name]:event.target.value
        })
        console.log(this.state);
    }

    onLoginSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }
    render() {
        return(
            <div className="col-4 mx-auto card">
                <div className="card-body">
                    <form>
                        <h3>Login Form</h3>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" onChange={this.onInputChange}></input>
                           
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" onChange={this.onInputChange}></input>
                        </div>
                        <div>
                            <Link to="/recoverpassword">Forget password ?</Link>
                        </div>
                        <div>
                            <button type="button" className="btn btn-success">Login</button>
                        </div>
                        
                    </form>
                </div>
                <div>
                    <span>สมัครสมาชิก</span>
                    <Link to="/register">คลิก</Link>
                </div>
            </div>
        )
    }
}

export default LoginPage;