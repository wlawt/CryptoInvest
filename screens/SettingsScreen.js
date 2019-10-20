import React from 'react';
import { View, TextInput, StyleSheet, Text, Clipboard, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.copyContentToClipboard = this.copyContentToClipboard.bind(this);
    this.state = {
      btc_address: null,
    };
  }

  componentDidMount() {
    fetch("https://f18ae97e.ngrok.io/getBTCAddress")
    .then(function(resp) {
      return resp.json()
    })
    .then(data => 
      this.setState({btc_address:data['address']}))}

    
  copyContentToClipboard = async () => {
    await Clipboard.setString(this.state.btc_address);
    alert("Copied to clipboard.");
  }

  render() {
    return (
      <View>
        <View style={styles.depositFields}>
          <Text>Please deposit BTC to the address below.</Text>
          <TextInput style={styles.btcAddress} selectable={true} editable={false}>{this.state.btc_address ? this.state.btc_address : ""}</TextInput>
          <Text onPress={this.copyContentToClipboard}>Click here to copy the address to the clipboard</Text>
        </View>
        <Text style={styles.recentDepositHistory}>Your Deposit History:</Text>
        <RecentDepositHistory />
      </View>
    )
  }
}

class RecentDepositHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Deposit Date', 'Amount'],
      tableData: [
        ['2019-10-19', '$73'],
        ['2019-10-19', '$108'],
        ['2019-10-18', '$63'],
        ['2019-10-17', '$35'],
        ['2019-10-17', '$22'],
        ['2019-10-17', '$38'],
        ['2019-10-17', '$29'],
      ]
    }
  }
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[30,30]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>
    )
  }
}


SettingsScreen.navigationOptions = {
  title: 'Deposit Cryptocurrency',
};


const styles = StyleSheet.create({
  depositFields: {
    marginLeft: '13%',
    marginTop: '15%',
  },
  btcAddress: {
    marginTop: '2%',
    paddingLeft: '5%',
    paddingRight: '5%',
    height: 60,
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 7,
    width: '81%'
  },
  container: { flex: 1, padding: 0, paddingTop: 20, backgroundColor: '#fff' },
  head: {  height: 33,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 33  },
  text: { textAlign: 'center' },

  recentDepositHistory: {
    fontSize: 25,
    marginLeft: '18%',
    marginTop: '7%',
  }
  

})