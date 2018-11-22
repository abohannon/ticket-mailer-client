import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Card, Form, Icon, Input, Button, Checkbox,
} from 'antd'

const FormItem = Form.Item

const StyledCard = styled(Card)`
  display: flex;
  width: 300px;
`

const Title = styled.h1`
  color: white;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: .3rem;
  font-weight: 200;
  margin-bottom: 1rem;
`

class Login extends Component {
  componentDidMount() {
    this.props.form.validateFields()
  }

  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  handleSubmit = (event) => {
    event.preventDefault()
    const { handleLogin, form } = this.props

    form.validateFields((err, values) => {
      if (err) {
        console.log(err)
      }

      handleLogin(values)
    })
  };

  render() {
    const cardProps = {
      bodyStyle: {
        width: '100%',
      },
    }

    const {
      form: {
        getFieldDecorator,
        getFieldsError,
        getFieldError,
        isFieldTouched,
      },
    } = this.props

    const emailError = isFieldTouched('email') && getFieldError('email')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    return (
      <div>
        <Title>Ticket Mailer</Title>
        <StyledCard {...cardProps}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem
              validateStatus={emailError ? 'error' : ''}
              help={emailError || ''}
            >
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please enter your email.' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0, .25)' }} />}
                  placeholder="Email"
                />,
              )}
            </FormItem>
            <FormItem
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please enter your password.' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0, .25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </FormItem>
            <FormItem style={{ marginBottom: 0 }}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>,
              )}
              <a className="login-form-forgot" style={{ float: 'right' }} href="">Forgot password</a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-buttom"
                disabled={this.hasErrors(getFieldsError())}
                block
              >
              Log in
              </Button>
            </FormItem>
          </Form>
        </StyledCard>
      </div>
    )
  }
}

export default Form.create()(Login)
