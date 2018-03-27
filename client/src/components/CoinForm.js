import React from "react"
import {Form} from "semantic-ui-react"
import {connect} from "react-redux"
import {addCoin} from "../actions/coins"

class CoinForm extends React.Component {
state = { coin: ""}

handleChange = (e) => {
  const {name, value} = e.target
  this.setState({ [name]: value.toLowerCAse().replace(" ", "") })
}

handleSubmit = (e) => {
  e.preventDefault()
  const {dispatch} = this.props
  const {coin} = this.state
  dispatch(addCoin(coin))
  this.setState({coin: ""})
}

render(){
  return(
    <Form>
      <Form.Input
        label = "Watch Coin"
        value = {this.state.coin}
        onChange = {this.handleChange}
        name="coin"
        required
        />
    </Form>
  )
}
}



export default connect()(CoinForm)