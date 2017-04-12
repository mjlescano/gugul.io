import { Component } from 'react'

export default class SearchInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value || ''
    }
  }

  handleChange = (evt) => {
    const { onChange } = this.props

    this.setState({ value: evt.target.value }, () => {
      if (onChange) onChange(this.state.value)
    })
  }

  handleKeyDown = (evt) => {
    if (evt.key === 'Enter' && !evt.ctrlKey) {
      evt.preventDefault()
      evt.stopPropagation()

      this.setState({ value: evt.target.value }, this.submit)
    }
  }

  submit () {
    const { onSubmit } = this.props
    if (onSubmit) onSubmit(this.state.value)
  }

  render () {
    return (
      <input
        {...this.props}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        value={this.state.value} />
    )
  }
}
