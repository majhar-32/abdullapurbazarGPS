import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import History from '../pages/about/History';
import Committee from '../pages/about/Committee';
import Headmaster from '../pages/about/Headmaster';
import Teachers from '../pages/about/Teachers';
import Contact from '../pages/Contact';
import Gallery from '../pages/Gallery';
import EventDetails from '../pages/EventDetails';
import ClassRoutine from '../pages/academic/ClassRoutine';
import Syllabus from '../pages/academic/Syllabus';
import Result from '../pages/academic/Result';
import Admission from '../pages/Admission';
import Notices from '../pages/Notices';
import NotFound from '../pages/NotFound';

// Admin imports
import AdminLayout from '../components/admin/AdminLayout';
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import NoticeList from '../pages/admin/notices/NoticeList';
import NoticeCreate from '../pages/admin/notices/NoticeCreate';
import NoticeEdit from '../pages/admin/notices/NoticeEdit';
import EventList from '../pages/admin/events/EventList';
import EventCreate from '../pages/admin/events/EventCreate';
import EventEdit from '../pages/admin/events/EventEdit';
import TickerSettings from '../pages/admin/settings/TickerSettings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/history',
        element: <History />,
      },
      {
        path: '/committee',
        element: <Committee />,
      },
      {
        path: '/headmaster',
        element: <Headmaster />,
      },
      {
        path: '/teachers',
        element: <Teachers />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/gallery',
        element: <Gallery />,
      },
      {
        path: '/gallery/:id',
        element: <EventDetails />,
      },
      {
        path: '/routine',
        element: <ClassRoutine />,
      },
      {
        path: '/syllabus',
        element: <Syllabus />,
      },
      {
        path: '/result',
        element: <Result />,
      },
      {
        path: '/admission',
        element: <Admission />,
      },
      {
        path: '/notices',
        element: <Notices />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  // Admin Routes
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'notices',
        element: <NoticeList />,
      },
      {
        path: 'notices/create',
        element: <NoticeCreate />,
      },
      {
        path: 'notices/edit/:id',
        element: <NoticeEdit />,
      },
      {
        path: 'events',
        element: <EventList />,
      },
      {
        path: 'events/create',
        element: <EventCreate />,
      },
      {
        path: 'events/edit/:id',
        element: <EventEdit />,
      },
      {
        path: 'settings/ticker',
        element: <TickerSettings />,
      },
    ],
  },
]);
