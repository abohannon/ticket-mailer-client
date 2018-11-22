import Landing from 'containers/Landing'
import Dashboard from 'containers/Dashboard'
import Tours from 'containers/Tours'
import Shows from 'containers/Shows'
import Orders from 'containers/Orders'
import UserSettings from 'containers/UserSettings'
import VerifyEmail from 'containers/VerifyEmail'

const routes = [
  {
    exact: true,
    path: '/',
    component: Landing,
  },
  {
    exact: true,
    path: '/signup',
    component: Landing,
  },
  {
    exact: true,
    path: '/verifyEmail',
    component: VerifyEmail,
  },
  {
    protected: true,
    path: '/dashboard',
    component: Dashboard,
    routes: [
      {
        path: '/dashboard/tours',
        component: Tours,
      },
      {
        path: '/dashboard/shows/all',
        component: Shows,
      },
      {
        path: '/dashboard/shows/:tour_title',
        component: Shows,
      },
      {
        path: '/dashboard/orders/:tour_title/:bundle_title',
        component: Orders,
      },
      {
        path: '/dashboard/sent',
        component: null,
      },
      {
        path: '/dashboard/settings/user',
        component: UserSettings,
      },
    ],
  },
]

export default routes
