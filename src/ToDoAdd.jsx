import axios from "axios";
import { useFormik } from "formik";

import { Cookies, useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ToDoAdd() {


    const [cookies,] = useCookies(['user_id', 'user_name']);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            date: new Date(),
            user_id: cookies['user_id']
        },
        onSubmit: (appointment) => {
            axios.post(`http://localhost:3000/appointments`, appointment)
                .then(() => { console.log('appointment added') });
            alert('Appointment added successfully..');
            navigate('/dashboard/info');
        }
    })

    return (
        <div className="container-fluid">
            <div className="fw-bold fs-5 mt-5">Add Appointment</div>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt className="form-label">Title</dt>
                    <dd><input type="text" className="form-control" name="title" onChange={formik.handleChange} /></dd>
                    <dt className="form-label" >Description</dt>
                    <dd><textarea rows={4} name="description" className="form-control" onChange={formik.handleChange} cols={40}></textarea></dd>
                    <dt className="form-label" >Date</dt>
                    <dd><input type="date" className="form-control w-25 " name="date" onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-primary " type="submit">Add</button>
                <Link to="/dashboard" className="btn btn-danger mx-2">Cancel</Link>
            </form>
        </div>
    )
}