import React from 'react'
import { mount } from 'enzyme'
import { Input, Button } from 'antd'
import Login from '../Login'

let wrapped

beforeEach(() => {
  wrapped = mount(<Login />)
})

afterEach(() => {
  wrapped.unmount()
})

it('has two input fields', () => {
  expect(wrapped.find(Input).length).toEqual(2)
})

it('has one button', () => {
  expect(wrapped.find(Button).length).toEqual(1)
})

describe('the input fields', () => {
  beforeEach(() => {
    wrapped.find(Input).at(0).props().onChange({ target: { value: 'test@test.com' } })
    wrapped.find(Input).at(1).props().onChange({ target: { value: 'password' } })

    wrapped.update()
  })

  it('can process user input', () => {
    expect(wrapped.find(Input).at(0).prop('value')).toEqual('test@test.com')
    expect(wrapped.find(Input).at(1).prop('value')).toEqual('password')
  })
})
