import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { ToDoHome } from "./ToDoHome"
import { ToDoRegister } from "./ToDoResgister"
import { ToDoLogin } from "./ToDoLogin"
import { ToDoEdit } from "./ToDoEdit"
import { ToDoAdd } from "./ToDoAdd"
import { ToDoInfo } from "./ToDoInfo"
import { ToDoDelete } from "./ToDoDelete"
import { TodoDashBoardPage } from "./ToDoDashBoardPage"


export function ToDoIndex() {
    return (
        <div className="container-fluid">
            <BrowserRouter>
                <header className="p-3 m-1 bg-light d-flex justify-content-between">
                    <div>
                        <span className="bi fs-4 mx-2 bi-pencil-square"></span>
                        <span className="fs-4 fw-bold"> <Link to="/" className="text-secondary text-decoration-none">Task Manager</Link> </span>

                    </div>
                    <div>
                        <button className="btn me-2">Features</button>
                        <button className="btn">Pricing</button>
                        <button className="btn mx-2">About</button>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </header>
                <section className="mt-2">

                    <Routes>
                        <Route path="/" element={<ToDoHome />} />
                        <Route path="register" element={<ToDoRegister width='w-25' />} />
                        <Route path="login" element={<ToDoLogin width="w-25" />} />
                        <Route path="dashboard" element={<TodoDashBoardPage />} >
                            <Route path="info" element={<ToDoInfo />} />
                            <Route path="add" element={<ToDoAdd />} />
                            <Route path="delete/:id" element={<ToDoDelete />} />
                            <Route path="edit/:id" element={<ToDoEdit />} />

                        </Route>

                    </Routes>

                </section>
            </BrowserRouter>
        </div >
    )
}