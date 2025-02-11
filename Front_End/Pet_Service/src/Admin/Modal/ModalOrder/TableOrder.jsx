import ReactPaginate from "react-paginate";

const TableOrder = (props) => {
  const {
    handleShowViewModal,
    listOrder,
    totalPages,
    currentPage,
    setCurrentPage,
  } = props;

  const handlePageChange = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <th scope="col">Total Amount</th>
            <th scope="col">Status</th>
            <th scope="col">cart_ID</th>
            <th scope="col">User ID</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listOrder &&
            Array.isArray(listOrder) &&
            listOrder.map((item, index) => (
              <tr key={index}>
                <td>{item.order_id}</td>
                <td>{item.total_amount}</td>
                <td>{item.status}</td>
                <td>{item.cart_id}</td>
                <td>{item.user_id}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleShowViewModal(item)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default TableOrder;
