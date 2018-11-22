import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input, Button, Popconfirm } from 'antd'
import { CARD_TITLE_PRIMARY } from 'constants'

import { Card } from 'components/common'

const StyledForm = styled.form`
  width: 30rem;
`

const StyledLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
`

const InputWrapper = styled.div`
  padding-bottom: 2rem;
`

class UserInfoForm extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    updateUserInfo: PropTypes.func,
  }

  constructor(props) {
    super(props)

    const { currentUser } = this.props

    this.state = {
      name: currentUser.name,
      email: currentUser.email,
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { updateUserInfo } = this.props

    updateUserInfo(this.state)
  }

  handleChange = (event) => {
    event.preventDefault()

    const { target: { name, value } } = event

    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <Card
        title="User Settings"
        headStyle={CARD_TITLE_PRIMARY}
      >
        <StyledForm>
          <InputWrapper>
            <StyledLabel>
            Email:
              <Input name="email" value={this.state.email} onChange={this.handleChange} />
            </StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledLabel>
            Name:
              <Input name="name" value={this.state.name} onChange={this.handleChange} />
            </StyledLabel>
          </InputWrapper>
          <Popconfirm
            placement="right"
            title="Are you sure you want to change your user info?"
            onConfirm={this.handleSubmit}
            okText="Yep"
            cancelText="Nope"
          >
            <Button type="primary">Update</Button>
          </Popconfirm>
        </StyledForm>
      </Card>
    )
  }
}

export default UserInfoForm
