/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: 0,

}

export default class App extends Component {
  state = {...initialState }

  addDigito = n => {
    if (n === '.' && this.state.displayValue.includes('.')){
      return 
    }

    // const clearDisplay = this.state.displayValue === '0'
    //   || this.state.clearDisplay 
    let clearDisplay = false
    if (this.state.displayValue === '0' || this.state.clearDisplay ){
      if (n == '.') {
        clearDisplay = false
      } else {
        clearDisplay = true
      }
    } 
    
    const currentValue = clearDisplay ? '' : this.state.displayValue // se o cleardisplay estiver true o valor vai ser vazio se false ele recebe o displayvalue
    const displayValue = currentValue + n

    this.setState({displayValue, clearDisplay: false})

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({values})
      console.log(values)
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({operation, current: 1, clearDisplay: true})
      console.log(operation)
    } else {
      const equals = operation === '='
      const values = [...this.state.values]

      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
        console.log('passou')

      } catch (error) {
        values[0] = this.state.values[0]     
        console.log('nao passou')   
      }

      values[1] = 0
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue}/>
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation}/>
          <Button label='7' onClick={this.addDigito}/>
          <Button label='8' onClick={this.addDigito}/>
          <Button label='9' onClick={this.addDigito}/>
          <Button label='*' operation onClick={this.setOperation}/>
          <Button label='4' onClick={this.addDigito}/>
          <Button label='5' onClick={this.addDigito}/>
          <Button label='6' onClick={this.addDigito}/>
          <Button label='-' operation onClick={this.setOperation}/>
          <Button label='1' onClick={this.addDigito}/>
          <Button label='2' onClick={this.addDigito}/>
          <Button label='3' onClick={this.addDigito}/>
          <Button label='+' operation onClick={this.setOperation}/>
          <Button label='0' double onClick={this.addDigito}/>
          <Button label='.' onClick={this.addDigito} />
          <Button label='=' operation onClick={this.setOperation}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
})