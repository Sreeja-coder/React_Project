import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const {totalItems,pageSize,onPageChange,currentPage} = props;
    console.log("current page",currentPage);
    const pageCount = Math.ceil(totalItems/pageSize);
    const pages = _.range(1,pageCount+1);
    
    if(pages == 1) return null;
    return ( <nav>
        <ul className="pagination">
            {pages.map(page => <li key={page} className={page === currentPage?"page-item active":"page-item"} ><a onClick={() => onPageChange(page)} className="page-link">{page}</a></li>)}
            
        </ul>
    </nav> );
}
Pagination.propTypes= {
    totalItems:PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    onPageChange:PropTypes.func.isRequired,
    currentPage:PropTypes.number.isRequired
}
export default Pagination;