import * as yup from "yup";
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
export function ToDoRegister(props) {

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id: "",
            user_name: "",
            password: "",
            email: ""
        },
        validationSchema: yup.object({
            user_id: yup.string().required('user_id requires').min(3, 'Id too short'),
            user_name: yup.string().required('UserName').min(4, 'Name too short'),

            password: yup.string().required('Password Required').matches(/^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, 'Password Must have one Lowercase one Uppercase,and spacial charcter and number'),

            email: yup.string().required("Email required").email("Invalid email format")

        }),

        onSubmit: (user) => {
            axios.post(`http://localhost:3000/users`, user)
                .then(() => {
                    console.log("VALUES INSERTED")
                    alert('Registered Successfully..');
                    navigate("/login");

                })

        }
    })

    return (
        <div className="container-fluid">

            <h3 className="text-primary fw-bold text-center">User Resgistartion</h3>
            <form action="" className={`p-4 ${props.width} mt-2`} onSubmit={formik.handleSubmit}>
                <dl>
                    <dt className="text-primary">UserId</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="user_id" placeholder="Enter User Id" /></dd>


                    <div className="text-danger">
                        {formik.errors.user_id}
                    </div>

                    <dt className="text-primary">UserName</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="user_name" placeholder="Enter Useranme" /></dd>

                    <div className="text-danger">
                        {formik.errors.user_name}
                    </div>

                    <dt className="text-primary">Password</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="password" placeholder="Enter Password" /></dd>


                    <div className="text-danger">
                        {formik.errors.password}
                    </div>


                    <dt className="text-primary">Email</dt>
                    <dd><input type="email" className="form-control" name="email" onChange={formik.handleChange} placeholder="Enter Email" /></dd>


                    <div className="text-danger">
                        {formik.errors.email}
                    </div>


                    <button type="submit" className="btn btn-success w-100">Register</button>
                    <div className="mt-3">
                        <Link to="/login"> Existing User - Signin </Link>
                    </div>
                </dl>


            </form>

        </div >
    )
}