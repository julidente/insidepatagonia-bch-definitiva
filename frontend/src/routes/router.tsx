import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../AppLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import PostDetail from "../pages/PostDetail";
import ActivityDetail from "../pages/ActivityDetail";
import Login from "../pages/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminActivities from "../pages/admin/AdminActivities";
import AdminActivityForm from "../pages/admin/AdminActivityForm";
import NotFound from "../pages/NotFound";
import RequireAuth from "./RequireAuth";
import AdminPosts from "../pages/admin/AdminPosts";
import AdminPostForm from "../pages/admin/AdminPostForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "blog",
        element: <Blog />
      },
      {
        path: "blog/:slug",
        element: <PostDetail />
      },
      {
        path: "destinos/:id",
        element: <ActivityDetail />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "admin",
            element: <AdminDashboard />
          },
          {
            path: "admin/activities",
            element: <AdminActivities />
          },
          {
            path: "admin/activities/new",
            element: <AdminActivityForm mode="create" />
          },
          {
            path: "admin/activities/:id/edit",
            element: <AdminActivityForm mode="edit" />
          },
          {
            path: "admin/posts",
            element: <AdminPosts />
          },
          {
            path: "admin/posts/new",
            element: <AdminPostForm mode="create" />
          },
          {
            path: "admin/posts/:id/edit",
            element: <AdminPostForm mode="edit" />
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

export default router;