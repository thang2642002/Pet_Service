const TableServiceReview = (props) => {
  const { handleShowUpdateModal, handleShowDeleteModal, listServiceReview } =
    props;

  return (
    <div className="table-user-container px-4 mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <th scope="col">Comment</th>
            <th scope="col">Rating</th>
            <th scope="col">User ID</th>
            <th scope="col">Service ID</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listServiceReview &&
            Array.isArray(listServiceReview) &&
            listServiceReview.map((item, index) => (
              <tr key={index}>
                <td>{item.service_review_id}</td>
                <td>{item.comment}</td>
                <td>{item.rating}</td>
                <td>{item.user_id}</td>
                <td>{item.service_id}</td>
                <td>
                  <button className="btn btn-secondary">View</button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleShowUpdateModal(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowDeleteModal(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableServiceReview;
