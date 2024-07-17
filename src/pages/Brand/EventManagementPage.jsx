import SearchIcon from "../../assets/images/search-icon.png";
import React from 'react';
import "./EventManagementPage.css";

export default function EventManagementPage() {
    return (
        <div className="col">
            <div class="row">
                <div className="col input-group mx-2" style={{ width: '400px' }}> 
                    <input type="text" className="form-control" placeholder="Search" name="search" style={{ width: '200px' }} />
                    <div className="input-group-btn">
                        <button class="btn btn-default" type="submit">
                            <img src={SearchIcon} alt="" />
                        </button>
                    </div>
                </div>
                <button class='col mx-2 quiz-button' >Quiz</button>
                <button class='col mx-2 lx-button'>Lắc Xì</button>
                <button class='col mx-2 add-button'>Thêm</button>
            </div>
            <table class="table">
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
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
                </table>
        </div>
    )
}