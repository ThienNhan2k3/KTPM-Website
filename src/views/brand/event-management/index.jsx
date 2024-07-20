import SearchIcon from "@assets/images/search-icon.png";
import EditIcon from "@assets/images/edit-icon.png";
import "./styles.css";

export default function EventManagement() {
  return (
    <div className="col">
      <div className="row">
        <div className="col input-group mx-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            name="search"
            style={{ 
              width: "500px" ,
              height: "fit-content"
            }}
          />
          <div className="input-group-btn">
            <button className="btn btn-default" type="submit">
              <img src={SearchIcon} alt="" />
            </button>
          </div>
        </div>
        <button className="col mx-2 quiz-button">Quiz</button>
        <button className="col mx-2 lx-button">Lắc Xì</button>
        <button className="col mx-2 add-button">Thêm</button>
      </div>
      <table className="table table-bordered my-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Date create</th>
            <th scope="col">Date end</th>
            <th scope=""></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Marathon</td>
            <td>Donate</td>
            <td>15/02/2024</td>
            <td>18/02/2024</td>
            <td>
            <button
                style={{ 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  padding: "0",  // Remove padding to ensure button size fits the image
                  border: "none",  // Remove border if not needed
                  //background: "none",  // Optional: Remove background if transparent button is desired
                }}
              >
                <img
                  src={EditIcon}
                  alt="edit"
                  style={{ 
                    width: "20px",  // Adjust width of the image as needed
                    height: "20px",  // Adjust height of the image as needed
                  }}
                />
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Marathon2</td>
            <td>Donate</td>
            <td>15/02/2024</td>
            <td>18/02/2024</td>
            <td>
            <button
                style={{ 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  padding: "0",  // Remove padding to ensure button size fits the image
                  border: "none",  // Remove border if not needed
                  //background: "none",  // Optional: Remove background if transparent button is desired
                }}
              >
                <img
                  src={EditIcon}
                  alt="edit"
                  style={{ 
                    width: "20px",  // Adjust width of the image as needed
                    height: "20px",  // Adjust height of the image as needed
                  }}
                />
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Marathon3</td>
            <td>Donate</td>
            <td>15/02/2024</td>
            <td>18/02/2024</td>
            <td>
            <button
                style={{ 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  padding: "0",  // Remove padding to ensure button size fits the image
                  border: "none",  // Remove border if not needed
                  //background: "none",  // Optional: Remove background if transparent button is desired
                }}
              >
                <img
                  src={EditIcon}
                  alt="edit"
                  style={{ 
                    width: "20px",  // Adjust width of the image as needed
                    height: "20px",  // Adjust height of the image as needed
                  }}
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
