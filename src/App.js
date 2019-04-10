import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import dictionary from './dictionary';
import combinations from './combinations';
import sentences from './sentences';
const R = require('ramda');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw: '',
      compiled: ''
    }
  }

  handleChange = e => {
    this.setState({
      raw: e.target.value,
      compiled: compiler(e.target.value)
    })
  }
  render() {
    return (
      <div className="container app">
        <h1>Emolang</h1>
        <h4>An Emoji-based artificial language for the Internet (and the real world).</h4>
        <div className="input-panel">
          <input type="text" value={this.state.raw} placeHolder="Try: Ya lubo kot" onChange={this.handleChange} className="form-control raw"/>
        </div>
        <p className="compiled">{this.state.compiled}</p>
        <div className="row top">
          <div className="col-sm-6">
            <h5>Available emojis</h5>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Emoji</th>
                    <th scope="col">Romanization</th>
                    <th scope="col">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    R.keys(dictionary).map((v, i) => (
                      <tr key={i}>
                        <td>{dictionary[v].chr}</td>
                        <td>{v}</td>
                        <td>{dictionary[v].meaning}</td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-6">
            <h5>Combinations</h5>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Emoji</th>
                    <th scope="col">Romanization</th>
                    <th scope="col">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    R.keys(combinations).map((v, i) => (
                      <tr key={i}>
                        <td>{combinations[v].chr}</td>
                        <td>{v}</td>
                        <td>{combinations[v].meaning}</td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: '40px'}}>
          <div className="col-sm">
            <h4>Make sentences!</h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Emoji</th>
                  <th scope="col">Romanization</th>
                  <th scope="col">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {
                  sentences.map((v, i) => (
                    <tr key={i}>
                      <td>{v.chr}</td>
                      <td>{v.roman}</td>
                      <td>{v.meaning}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const compiler = raw => {
  const words = raw.toLowerCase().split(' ')
  const compiledWords = words.map(word => {
    return dictionary[word] ?  dictionary[word].chr : word
  })

  return compiledWords.reduce((acc, val) => {
    if (isASCII(val)) {
      return acc + ' ' + val + ' '
    }
    else {
      return acc + val
    }
  })
}

function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}
