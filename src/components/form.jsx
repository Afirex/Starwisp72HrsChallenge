import React, { useState } from "react";
import Body from './body';
import axios from 'axios';
function Form() {
    const [loggedin, setstate] = useState(true);
    // true for debugging
    const [userinfo, dataset] = useState(
        {
            userid: "",
            password: ""
        });
    function handleSubmit(evt) {
        console.log(userinfo.userid + " || " + userinfo.password);
        axios({
            url: '/save',
            method: 'POST',
            data: userinfo
        })
            .then((response) => {
                console.log(response.data.msg);
                if (response.data.msg === 'found') {
                    setstate(true);
                }
                else {
                    alert("USER NOT FOUND");
                }
            })
            .catch(() => { console.log('Connection not done'); });;

        evt.preventDefault();
    }
    function ChangeHandler(evt) {
        const { name, value } = evt.target;
        dataset((prevval) => ({ ...prevval, [name]: value }));
        console.log(userinfo);
    }

    function form() {
        return <div className="box"><form onSubmit={handleSubmit}>
            <div className="form-group color">
                <label for="exampleInputEmail1" className="colortits">User ID</label>
                <input type="text" className="form-control" id="userid" aria-describedby="emailHelp"
                    name="userid" value={"" || userinfo.userid} onChange={ChangeHandler} placeholder="Enter User ID">
                </input>
                <small id="emailHelp" className="form-text text-muted">We'll never share your ID with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1" className="colortits">Password</label>
                <input type="password" name="password" value={"" || userinfo.password} onChange={ChangeHandler} className="form-control" id="password" placeholder="Password">
                </input></div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form></div>;
    }
    function setlogout() {
        setstate(false); console.log("logging out");
    }
    function rend() {
        return loggedin === true ? <Body setlogout={setlogout} /> : form();
    }

    return <div>
        {rend()}
    </div>

}


export default Form;