import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            username: '',
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
                        <h3>Register Form</h3>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control is-valid" name="username" onChange={this.onInputChange}></input>
                            <div className="valid-feedback">พบชื่อผู้ใช้</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control is-invalid" name="password" onChange={this.onInputChange}></input>
                            <div className="invalid-feedback">รหัสผ่านสั้นเกินไป</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="example-date-input">Birth Date</label>
                            <div>
                                <input className="form-control" type="date"></input>
                            </div>
                        </div>
                        <button type="button" className="btn btn-success">Login</button>
                    </form>
                </div>
                <div>
                    <span>ลงชื่อเข้าใช้</span>
                    <Link to="/login">คลิก</Link>
                </div>
            </div>
        )
    }
}

export default RegisterPage;