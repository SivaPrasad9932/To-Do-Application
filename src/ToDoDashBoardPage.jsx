
import { useCookies } from "react-cookie"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToDoAdd } from "./ToDoAdd";
import { useCallback, useState } from "react";
export function TodoDashBoardPage() {
    const [cookies, removeCookie] = useCookies(['user_id', 'user_name']);

    const [sApt, setSApt] = useState('');

    let navigate = useNavigate();

    let handleSignout = useCallback(() => {
        removeCookie('user_id');
        removeCookie('user_name');
        navigate('/');
    })

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-2">
                    <div className="fw-bold fs-6">  {cookies['user_name']} - Dashboard  </div>
                    <nav className="">
                        <div className="bi bi-pencil-square  mt-3"> <Link to="info">My Tasks</Link> </div>
                        <div className="bi my-4 bi-calendar-date"> Calendar</div>
                        <div className="bi bi-folder"> Categories </div>
                    </nav>
                </div>
                <div className="col-10">
                    <div role="header" className="d-flex justify-content-between">
                        <div className="w-50">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search appointments, categories" onChange={(e) => { setSApt(e.target.value) }} />
                                <button className="btn btn-secondary bi bi-search"></button>
                            </div>
                        </div>
                        <div className="2">
                            <Link to="add" className="btn mx-2 btn-primary bi bi-plus"> Add New</Link>
                            <button onClick={handleSignout} className="bi btn btn-warning bi-person-circle"> Signout</button>
                            <button  className="bi btn btn-dark bi-person mx-2">View Archives</button>
                        </div>
                    </div>
                    <div>


                        <Outlet context={sApt} />
                    </div>
                </div>
            </div>
        </div>
    )
}