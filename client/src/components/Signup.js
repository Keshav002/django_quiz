import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
// import signupImg from '../images/signup-image.jpg'

function Signup() {
    const history = useHistory();
    const [user, setUser] = useState({
        username: "", email: "", role: "",  password: "", cpassword: ""
    });
    let name, value;

    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
        console.log(user)
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { username, email, role,  password } = user;
        const res = await fetch("/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, email, role, password
            })
        });
        const data = await res.json();
        if (data.access) {
            history.push("/login");
           
        } else {
            window.alert("Invalid Registration");
            console.log('Invalid Registration');
        }
    }

    return (
        <>
            {/* <!-- Sign up form --> */}
            <section class="signup">
                <div class="page-container mt-5" >
                    <div class="signup-content" >
                        <div class="signup-form" >
                            <h2 class="form-title">Sign up</h2>
                            <form method="POST" class="register-form" id="register-form" >
                                <div class="form-group" >
                                    <label htmlFor="name" ><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="username" id="name" autoComplete="off" value={user.username}
                                        onChange={handleInput} placeholder="Your Name" />
                                </div>
                                <div class="form-group">
                                    <label for="email"><i class="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" autoComplete="off" value={user.email}
                                        onChange={handleInput} placeholder="Your Email" />
                                </div>
                                <div class="form-group">
                                    <label for="role"><i class="zmdi zmdi-email"></i></label>
                                    <input type="text" name="role" id="role" autoComplete="off" value={user.role}
                                        onChange={handleInput} placeholder="Your Role [Teacher/Student]" />
                                </div>
                                <div class="form-group">
                                    <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="password" id="password" autoComplete="off" value={user.password}
                                        onChange={handleInput} placeholder="Password" />
                                </div>
                                <div class="form-group">
                                    <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off" value={user.cpassword}
                                        onChange={handleInput} placeholder="Repeat your password" />
                                </div>
                                <div class="form-group form-button">
                                    <input type="submit" name="signup" id="signup" class="form-submit" value="Register" onClick={PostData} />
                                </div>
                            </form>
                        </div>
                        <div class="signup-image">
                            <figure><img alt="" /></figure>
                            <NavLink to="/login" class="signup-image-link">I am already Registered</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup
