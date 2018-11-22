import React from 'react'
import { mount } from 'enzyme'
import Root from 'Root'
import Dashboard from 'containers/Dashboard'
import SideNav from 'components/SideNav'
import Main from 'components/Main'
import { StaticRouter } from 'react-router-dom'
import routes from 'routes/staticRoutes'
import history from 'helpers/history'

let wrapped
const context = {}

beforeEach(() => {
  wrapped = mount(
    <Root>
      <StaticRouter context={context}>
        <Dashboard routes={routes} history={history} />
      </StaticRouter>
    </Root>,
  )
})

afterEach(() => {
  wrapped.unmount()
})

it('renders the SideNav component', () => {
  expect(wrapped.find('.wrapper-dashboard').find(SideNav).length).toEqual(1)
})

it('renders the Main component', () => {
  expect(wrapped.find('.wrapper-dashboard').find(Main).length).toEqual(1)
})
