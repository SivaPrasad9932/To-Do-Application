import { useFormik } from "formik"
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function ToDoLogin(props) {


    const [users, SetUsers] = useState([{ user_id: null, user_name: null, password: null, email: null }]);
    const [Cookies, SetCookies,] = useCookies(['user_id', 'user_name']);
    let naviagte = useNavigate();

    function LoadData() {
        axios.get(`http://localhost:3000/users`)
            .then(res => { SetUsers(res.data) })


    }
    useEffect(() => {
        LoadData()
    }, [])

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: yup.object({
            username: yup.string().required("Username Required"),
            password: yup.string().required("password Required")

        }),
        onSubmit: (user) => {
            var validuser = users.find(item => item.user_name === user.username);
            if (validuser) {
                if (validuser.password === user.password) {
                    SetCookies("user_id", validuser.user_id),
                        SetCookies("user_name", validuser.user_name),
                        naviagte("/dashboard/info")
                } else {
                    alert('inavlid password')
                }
            } else {
                alert('invalid username')
            }
        }



    })
    return (
        <div>
            <div className="container-fluid mt-2 ">
                <form action="" className={`${props.width} mt-2`} onSubmit={formik.handleSubmit}>
                    <h3 className="bi bi-person-fill text-primary" >User Login</h3>
                    <dl>
                        <dt className="text-primary">UserName</dt>
                        <dd><input type="text" className="form-control" onChange={formik.handleChange} name="username" placeholder="Enter Username" /></dd>

                        <dd className="text-danger">
                            {formik.errors.username}
                        </dd>

                        <dt className="text-primary" >Password</dt>
                        <dd><input type="password" className="form-control" onChange={formik.handleChange} name="password" placeholder="Enter Password" /></dd>

                        <dd className="text-danger">
                            {formik.errors.password}
                        </dd>

                        <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>



                        <div className="mt-4">
                            <Link to="/register">New User Register</Link>
                        </div>
                    </dl>
                </form>
            </div>
        </div>
    )
}