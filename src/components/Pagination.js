import React from "react";


const Pagination = ({ postperpage, totalPost, paginate }) => {

    return <div>
        <nav> <ul className="pagination">
            <li key={1} className="page-item">
                <a onClick={() => paginate(2)} className="page-link"> prev </a>
            </li>
            <li key={2} className="page-item">
                <a onClick={() => paginate(1)} className="page-link"> next </a>
            </li>
        </ul></nav>
        <a href="/" className="btn">Update Connection</a>
    </div>

}

export default Pagination;