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

  render () {
    return (
      <input
        {...this.props}
        onChange={this.handleChange}
        value={this.state.value} />
    )
  }
}
