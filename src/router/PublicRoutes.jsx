import About from "../pages/About";
import Gallery from "../pages/Gallery";
import Home from "../pages/Home";
import Notice from "../pages/Notice";
import Test from "../pages/Test";
import Vacancy from "../pages/Vacancy";
import Contact from "../pages/Contact";

import Blog from "../pages/Blog";
import Team from "../pages/Team";
import BlogDetails from "../pages/BlogDetails";
import Events from "../pages/Events";
import Achievement from "../pages/Achievement";
import QuestionBank from "../pages/QuestionBank";

export const PublicRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/notice",
    element: <Notice />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/vacancy",
    element: <Vacancy />,
  },
  // {
  //   path: "/academics",
  //   element: <Academeic />,
  // },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetails />,
  },
  {
    path: "/academics/events",
    element: <Events />,
  },
  {
    path: "academics/achievements",
    element: <Achievement />,
  },
  {
    path: "academics/question-bank",
    element: <QuestionBank />,
  },
];
export default PublicRoutes;
