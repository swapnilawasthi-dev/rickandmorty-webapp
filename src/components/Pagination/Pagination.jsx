import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

const Pagination = ({ handlePageClick, totalPages }) => {
  return (
    <div className={styles.container}>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={styles.breakme}
        pageCount={totalPages}
        previousClassName={styles.previous}
        marginPagesDisplayed={1}
        disabledClassName={styles.disabled}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        subContainerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default Pagination;
