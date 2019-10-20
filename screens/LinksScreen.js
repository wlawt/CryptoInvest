import React from 'react';
import { ScrollView, StyleSheet, Text, View , Image, Alert} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

import { Button, Content, Form, Item, Label, Input } from "native-base";

import BTC from '../assets/images/Bitcoin.png'
import ETH from '../assets/images/ETH.png'
import LTC from '../assets/images/LTC.png'
import XRP from '../assets/images/XRP.jpg'

class Data extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json())
    .then(data => this.setState({data}))
  }

  render() {
    if (!this.state.data) {
      return null;
    }
    console.log(this.state.data)
    return (
      <Text>{this.state.data ? this.state.data['title'] : "Null"}</Text>
    )
  }
}
export default class Trades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Coin", "Date of Trade", "Profit or Loss", "Amount earned"],
      tableTitle: [<Image style={{width: 40, height: 40, marginLeft: '15%'}} source={BTC}/>, <Image style={{width: 33, height: 33, marginLeft: '15%'}} source={ETH}/>, <Image style={{width: 33, height: 33, marginLeft: '15%'}} source={LTC}/>, <Image style={{width: 33, height: 33, marginLeft: '15%'}} source={XRP}/>],
      tableData: [
        ["2019-10-17", "Profit", "13"],
        ["2019-10-17", "Loss", "23"],
        ["2019-10-17", "Profit", "33"],
        ["2019-10-17", "Profit", "43"]
      ],
      email: null,
    }
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail = function() {
    console.log(this.state.email);
    fetch("https://f18ae97e.ngrok.io/sendEmail", {
      method: 'post',
      body: JSON.stringify({
        "email": this.state.email,
      })
    })}

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[40,40]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
        <Content>
            <Text h2>Get Portfolio Breakdown</Text>
            <Form>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({email})} />
              </Item>

              <Content>
                <Button
                  rounded
                  success
                  //onPress={() => Alert.alert("Check email for CSV file")}
                  onPress={() => this.sendEmail()}
                  style={styles.separate}
                >
                  <Text style={styles.textFormat}>Export To CSV</Text>
                </Button>
              </Content>
            </Form>
          </Content>
        </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 45,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 45  },
  text: { textAlign: 'center' },
  separate: { marginTop: 20 },
  textFormat: { paddingLeft: 120 },
});

Trades.navigationOptions = {
  title: 'Trades',
};
