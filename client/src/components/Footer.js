import React from 'react';
import logo from '.././khohuai.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="information-footer">
                <div>
                    <figure>
                        <img src={logo} alt="khohuai" className="lottery-logo"></img>
                    </figure>
                </div>
                <div>
                    <h5>ติดต่อเรา</h5>
                    <p>Email : <a href="">khohuai@gmail.com</a></p>
                </div>
            </div>
            <div>
                Copyright © 2021 khohuai. All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer;