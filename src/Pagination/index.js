import React from "react";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import './index.scss';

function pagination({
    total,
    pageId,
    _onPaginate
}) {
    return (
        <div className='paginate'>
            <Pagination
                totalPages={total}
                currentPage={pageId}
                theme="bottom-border"
                changeCurrentPage={(id) => _onPaginate(id)}
            />
        </div>
    );
}
export default pagination;