import React from 'react'
import { mount } from 'enzyme'
import Root from '../../Root'
import Landing from '../Landing'
import Login from '../../components/Login'

let wrapped

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Landing />
    </Root>,
  )
})

afterEach(() => {
  wrapped.unmount()
})

it('renders the Login component', () => {
  expect(wrapped.find('.wrapper-landing').find(Login).length).toEqual(1)
})
