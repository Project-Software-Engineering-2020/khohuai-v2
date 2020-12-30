import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class RecoveryPassword extends Component {
    render() {
        return(
            <div className="col-4 mx-auto card">
                <div className="card-body">
                    <form>
                        <h3>Recovery Password</h3>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="username" onChange={this.onInputChange}></input>
                        </div>
                        <button type="submit" className="btn btn-success">recovery</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default RecoveryPassword;