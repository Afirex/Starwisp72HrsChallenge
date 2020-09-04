import React, { useState, useEffect } from "react";
import axios from 'axios';

const Posts = ({ posts, loading, fetchpost }) => {

    const [visible, setvisible] = useState(false);

    const [userinfo, dataset] = useState(
        {
            uid: "",
        });

    const [updatedata, setUpdate] = useState({
        uni_name: "",
        Registration_date: "",
        Expiry_date: "",
        imgurl: "",
        no_of_students: "",
        email: "",
        web_url: "",
        contact_no: ""
    });

    if (loading) { return <h2> fetching</h2> }

    function postDelete(evt) {
        const id = evt.target.name;
        // console.log(id);
        dataset({ uid: id });
        axios({
            url: '/delete',
            method: 'POST',
            data: { uid: id }
        })
            .then((response) => {
                fetchpost();
            })
            .catch(() => { console.log('Connection not done'); });;
    }


    function set(name) { dataset(() => ({ uid: name })); };
    function handleClick(evt) {
        const { name, value } = evt.target;
        setvisible(!visible);
        set(name);
    }
    function rends() {
        return <div className='list-group mb-4'>
            <h4 className='colortits'>College name | | Registration_date | | Expiry_date | | no_of_students | | email | | web_url | | contact_no | |
        </h4>
            {posts.map(post => (
                <div className="flex">
                    <input type="text" className="form-control"
                        name="uni_name"
                        onChange={ChangeHandler} value={post.uni_name}>
                    </input>
                    <input type="text" className="form-control"
                        name="Registration_date"
                        onChange={ChangeHandler} value={post.Registration_date.slice(0, 10) || ""}>
                    </input>
                    <input type="text" className="form-control"
                        name="userid"
                        onChange={ChangeHandler} value={post.Expiry_date.slice(0, 10)}>
                    </input>
                    <input type="text" className="form-control"
                        name="userid" value={post.no_of_students}
                        onChange={ChangeHandler}>
                    </input>
                    <input type="text" className="form-control"
                        name="userid" value={post.email}
                        onChange={ChangeHandler}>
                    </input>
                    <input type="text" className="form-control"
                        name="userid" value={post.web_url}
                        onChange={ChangeHandler}>
                    </input>
                    <input type="text" className="form-control"
                        name="userid" value={post.contact_no}
                        onChange={ChangeHandler}>
                    </input>
                    <button className="btn" name={post.uid} onClick={handleClick} >Edit</button>
                    <button className="btn" name={post.uid} onClick={postDelete}>Delete</button>
                </div>
            ))}
        </div>;
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setUpdate((prev) => ({ ...prev, [name]: value }));
        //console.log(updatedata);
    }
    function submitUpdate(evt) {
        const { name } = evt.target;
        axios({
            url: '/update',
            method: 'POST',
            data: { uid: name, data: updatedata }
        })
            .then((response) => {
                alert('request sent'); fetchpost();
            })
            .catch(() => { console.log('Connection not done'); });;
        setvisible(!visible);
    }
    function Edit() {
        return <div className='box2'>
            <h4 className="colortits">only Fill columns to be updated, Rest Leave empty</h4><br />
            <label>College Name:<input type="text" className="form-control pads" name="uni_name" onChange={handleChange}>
            </input></label>
            <label>Registration_date<input type="text" className="form-control" name="Registration_date" onChange={handleChange}>
            </input></label>
            <label>Expiry_date<input type="text" className="form-control" name="Expiry_date" onChange={handleChange}>
            </input></label>
            <label>no_of_students<input type="text" className="form-control" name="no_of_students" onChange={handleChange}>
            </input></label>
            <label>email<input type="text" className="form-control" name="email" onChange={handleChange}>
            </input></label>
            <label>web_url<input type="text" className="form-control" name="web_url" onChange={handleChange}>
            </input></label>
            <label>contact_no<input type="text" className="form-control" name="contact_no" onChange={handleChange}>
            </input></label>
            <button className="btn" name={userinfo.uid} onClick={submitUpdate}>SEND UPDATE REQUEST</button></div>;
    }
    function ChangeHandler() { }
    return <div><div className="flex">
        {rends()}</div>
        {visible ? Edit() : null}
    </div>;
}




export default Posts;