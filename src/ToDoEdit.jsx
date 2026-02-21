import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";

export function ToDoEdit() {
    let params = useParams();
    let navigate = useNavigate();
    let [cookie] = useCookies(['user_id', 'user_name'])
    const [appointment, Setappointment] = useState({ id: 0, user_id: " ", title: " ", description: " ", date: Date(), });

    function LoadData() {
        axios.get(`http://localhost:3000/appointments/${params.id}`)
            .then(res => {
                Setappointment(res.data);

            })
    }
    useEffect(() => {
        LoadData();
    }, [])

    let formik = useFormik({
        initialValues: {
            title: appointment.title,
            description: appointment.description,
            date: appointment.date,
            user_id: cookie['user_id']
        },
        enableReinitialize: true,
        onSubmit: (data) => {
            axios.put(`http://localhost:3000/appointments/${params.id}`, data);
            alert('Appointment Updated');
            navigate(`/dashboard/info`)

        }


    })

    return (

        <div className="container-fluid">
            <div className="fw-bold fs-5 mt-5">Edit Appointment</div>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt className="form-label">Title</dt>
                    <dd><input type="text" className="form-control" name="title" value={formik.values.title} onChange={formik.handleChange} /></dd>
                    <dt className="form-label" >Description</dt>
                    <dd><textarea rows={4} name="description" className="form-control" value={formik.values.description} onChange={formik.handleChange} cols={40}></textarea></dd>
                    <dt className="form-label" >Date</dt>
                    <dd><input type="date" className="form-control w-25 " name="date" value={formik.values.date} onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-primary " type="submit">Save</button>
                <Link to="/dashboard" className="btn btn-danger mx-2">Cancel</Link>
            </form>
        </div>
    )
}