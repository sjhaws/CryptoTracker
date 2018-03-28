import React from 'react';
import { Card, Grid, Header } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHeaders } from '../actions/headers';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

class Coin extends React.Component {
  state = { coin: {} }

  componentDidMount() {
    //this.props.match.params.id
    const { dispatch, match: { params: { id }} } = this.props;
    axios.get(`/api/coins/${id}`)
      .then( ({ data, headers }) => {
        dispatch(setHeaders(headers))
        this.setState({ coin: data })
      })
  }

  calcPrice = (price, change) => {
    const c = parseFloat(change)
    const p = parseFloat(price)
    if (c < 0)
      return p * (Math.abs((c / 100)) + 1)
    else
      return p / ((c / 100) + 1)
  }

  formatData = (coin) => {
    const { 
      percent_change_7d,
      percent_change_24h,
      percent_change_1h,
      price_usd,
    } = coin

    return [
      { time: '7 days', price: this.calcPrice(price_usd, percent_change_7d) },
      { time: '24 hours', price: this.calcPrice(price_usd, percent_change_24h) }, 
      { time: '1 hour', price: this.calcPrice(price_usd, percent_change_1h) },
      { time: 'Current', price: parseFloat(price_usd) }
    ]
  }

  render() {
    const { coin } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <Card>
              <Card.Content header={coin.name} />
              <Card.Content description={`$${coin.price_usd}`} />
              <Card.Content description={`${coin.price_btc} BTC`} />
              <Card.Content extra>
                <p>Rank: {coin.rank}</p>
                <p>Symbol: {coin.symbol}</p>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h1">{coin.name}</Header>
            <AreaChart 
              height={400} 
              width={800}
              data={this.formatData(coin)}
            >
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#8884D8"
                fill="#8884d8"
              />
              <Tooltip />
            </AreaChart>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default connect()(Coin)



