
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, Outlet, useOutletContext, } from "react-router-dom";
import axios from "axios";
import { useMemo } from "react";
import { useCallback } from "react";

export function ToDoInfo() {

    const [appointments, setAppointments] = useState([{ id: null, user_id: null, title: null, description: null, date: Date() }]);
    const [cookies] = useCookies(['user_id', 'user_name']);
    let SearchAppointment = useOutletContext('');

    const LoadData = useCallback(() => {
        axios.get('http://localhost:3000/appointments').then(response => {
            setAppointments(response.data);
        });
    }, [cookies]);

    const UserAppointments = useMemo(() => {

        if (SearchAppointment === '') {
            return appointments.filter(
                a => a.user_id === cookies['user_id']
            );
        }

        const searchLower = SearchAppointment.toLowerCase();

        return appointments.filter(a =>
            a.user_id === cookies['user_id'] &&
            (
                a.title.toLowerCase().includes(searchLower) ||
                a.description.toLowerCase().includes(searchLower) ||
                a.date.includes(searchLower)
            )
        );

    }, [appointments, SearchAppointment, cookies]);



    useEffect(() => {
        LoadData();
    }, [LoadData]);



    return (
        <div className="container-fluid">
            <div role="filter" className="mt-4 bg-light p-2">
                <div className="d-flex justify-content-baseline align-items-center">
                    <button className="btn bi bi-funnel"> Filter</button>
                    <button className="btn bi bi-sort-alpha-down"></button>
                    <select className="form-select w-25">
                        <option>Select Date</option>
                    </select>
                </div>
            </div>
            <div className="mt-2">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            UserAppointments.map(UserAppointments =>
                                <tr key={UserAppointments.id}>
                                    <td>{UserAppointments.title}</td>
                                    <td>{UserAppointments.description}</td>
                                    <td>{UserAppointments.date}</td>
                                    <td className="d-flex  justify-content-end">
                                        <Link to={`/dashboard/edit/${UserAppointments.id}`} className="btn btn-warning bi bi-pen mx-2"></Link>
                                        <Link to={`/dashboard/delete/${UserAppointments.id}`} className="btn btn-danger bi bi-trash mx-2"></Link>
                                        <button className="btn btn-info bi bi-archive-fill ">Archive</button>

                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
