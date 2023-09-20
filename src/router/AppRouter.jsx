import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../Auth"
import { CalendarPage } from "../calendar/page/CalendarPage"


export const AppRouter = () => {
    const authStatus = 'authenticated' //'not-authenticated'
    return (
        <Routes>
            {
                (authStatus === 'not-authenticated')
                    ? <Route path="/auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />
            }

            <Route path="/*" element={<Navigate to='/auth/login' />} />

        </Routes>
    )
}
