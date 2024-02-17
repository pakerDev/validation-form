import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const routes = [
    {
        name: "home",
        path: "/",
        Component: Home,
    },
    {
        name: "dashboard",
        path: "/dashboard",
        Component: Dashboard,
    },
    {
        name: "video",
        path: "/video/:code",
        Component: VideoPage,
    },
];

const Router = () => {
    return (
        <Routes>
            {routes.map((r) => {
                return <Route key={r.name} path={r.path} element={<r.Component />} />;
            })}
        </Routes>
    );
};

export default Router;
