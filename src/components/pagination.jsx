import React, { Component } from 'react'
import _ from 'lodash'

class Pagination extends Component {
    render() { 
        const {pageSize, itemsCount, currentPage, onPageChange} = this.props;

        const pagesCount = Math.ceil(itemsCount / pageSize);
        if (pagesCount === 1) return null;
        const pages = _.range(1, pagesCount+1);

        return ( 
            <React.Fragment>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {pages.map(page =>(
                            <li key={page} className={page === currentPage ? "page-item active":"page-item"}><button className="page-link clickable" onClick={() => onPageChange(page)}>{page}</button></li>
                        ))}
                    </ul>
                </nav>
            </React.Fragment>
         );
    }
}
 
export default Pagination;