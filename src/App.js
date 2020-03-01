import React, { Component } from "react";
import getWeb3 from "./getWeb3";

import "./App.css";

const netMap = [
  {
    "name": "Ethereum",
    "project": "Ethereum",
    "type": "mainnet",
    "networkId": 1
  },
  {
    "name": "Morden",
    "project": "Ethereum",
    "type": "testnet",
    "networkId": 2
  },
  {
    "name": "Ropsten",
    "project": "Ethereum",
    "type": "testnet",
    "networkId": 3
  },
  {
    "name": "Rinkeby",
    "project": "Ethereum",
    "type": "testnet",
    "networkId": 4
  },
  {
    "name": "Görli",
    "project": "Ethereum",
    "type": "testnet",
    "networkId": 5
  },
  {
    "name": "Kotti",
    "project": "Ethereum",
    "type": "testnet",
    "networkId": 6
  },
  {
    "name": "Kovan",
    "project": "Ethereum",
    "type": "testnet",
    "networkId": 42
  }
];

const lastBlock = process.env.REACT_APP_BLOCK || 0;

class App extends Component {
  state = { block: 0, web3: null, networkId: 0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      const networkId = await web3.eth.net.getId();
      const block = await web3.eth.getBlockNumber();

      this.setState({ web3, networkId, block });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3. Check console for details.`);
      console.error(error);
    }
  };

  render() {
    const { web3, networkId, block } = this.state;

    if (!web3) {
      return <div>Loading Web3...</div>;
    }

    const net = netMap.find(x => x.networkId === networkId);
    const diffBlocks = web3.utils.toBN(block)
      .sub(web3.utils.toBN(lastBlock))
      .toString();

    return (
      <>
        {net.type === 'mainnet' ?
          <h1>
            {diffBlocks} block(s) to Ethereum {net.type === 'mainnet' ? 'Mainnet' : `${net.name}`} since last update
          </h1> :
          <h1>
            Change network to Mainnet
          </h1>
        }
      </>
    );
  }
}

export default App;
