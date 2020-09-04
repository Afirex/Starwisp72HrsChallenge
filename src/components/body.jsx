import React, { useState, useEffect } from "react";
import axios from 'axios';
import Post from "./Post";
import Pagination from "./Pagination";

function Body(props) {

    const [posts, setPosts] = useState([]);
    const [loading, setloading] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);
    const [postperpage] = useState(3);

    const fetchpost = async () => {
        setloading(true);
        const res = await axios.get('/university');
        //console.log(res.data);
        setPosts(res.data);
        setloading(false);
    }
    useEffect(() => {
        fetchpost();
    }, []);



    const indexOfLastPost = currentPage * postperpage;
    const indexOfFirstPost = indexOfLastPost - postperpage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);
    //console.log(posts.slice(indexOfFirstPost, indexOfLastPost));
    //console.log(indexOfFirstPost + " " + indexOfLastPost + " --- " + currentPage);
    function paginate(pageNumber) {
        const curr = currentPage;
        if (pageNumber === 1) { setcurrentPage(curr + 1); }
        else if (curr > 1) {
            setcurrentPage(curr - 1);
        }
    }
    const [visible, setvisible] = useState(false);
    const [visibleView, setvisibleView] = useState(false);
    function rends() {
        // console.log('inside rends');
        return <div><Post posts={currentPost} loading={loading} fetchpost={fetchpost} />
            <Pagination postperpage={postperpage} totalPost={posts.length} paginate={paginate} />
        </div>;
    }
    const [adddata, setUpdate] = useState({
        uni_name: "",
        Registration_date: "",
        Expiry_date: "",
        imgurl: "",
        no_of_students: "",
        email: "",
        web_url: "",
        contact_no: ""
    });
    function handleChange(evt) {
        const { name, value } = evt.target;
        setUpdate((prev) => ({ ...prev, [name]: value }));
        // console.log(adddata);
    }
    function submitUpdate(evt) {
        axios({
            url: '/add',
            method: 'POST',
            data: { adddata }
        })
            .then((response) => {
                alert('request sent'); fetchpost(); setUpdate({
                    uni_name: "",
                    Registration_date: "",
                    Expiry_date: "",
                    imgurl: "",
                    no_of_students: "",
                    email: "",
                    web_url: "",
                    contact_no: ""
                });
            })
            .catch(() => { alert("server Refused"); console.log('Connection not done'); });;
        setvisible(!visible);
    }
    function add() {
        return <div className='box3'>
            <h4 className="colortits">Add Data</h4><br />
            <label>College Name:<input type="text" className="form-control pads" name="uni_name" onChange={handleChange}>
            </input></label>
            <label>Registration_date<input type="text" className="form-control" name="Registration_date" onChange={handleChange}>
            </input></label>
            <label>Expiry_date<input type="text" className="form-control" name="Expiry_date" onChange={handleChange}>
            </input></label>
            <label>img_url<input type="text" className="form-control" name="imgurl" onChange={handleChange}>
            </input></label>
            <label>no_of_students<input type="text" className="form-control" name="no_of_students" onChange={handleChange}>
            </input></label>
            <label>email<input type="text" className="form-control" name="email" onChange={handleChange}>
            </input></label>
            <label>web_url<input type="text" className="form-control" name="web_url" onChange={handleChange}>
            </input></label>
            <label>contact_no<input type="text" className="form-control" name="contact_no" onChange={handleChange}>
            </input></label>
            <br /><button className="btn" onClick={submitUpdate}>Send Addition</button></div>;

    }
    return <div className="box2">
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="http://lifeisgta.ga" target="blank">Starwisp Afirex   </a>
                </div>
                <ul className="nav navbar-nav">
                    <li onClick={() => setvisible(!visible)}><a>Add</a></li>
                    <li onClick={() => setvisibleView(!visibleView)}><a>View</a></li>
                </ul>
                <ul>
                    <h5 className="logout"><a href="/" onClick={props.setlogout}>logout</a></h5>
                </ul>
            </div>
        </nav>
        {visible ? add() : null}
        {visibleView ? rends() :
            <footer>Click View to view info</footer>}
    </div>;
}

export default Body;
