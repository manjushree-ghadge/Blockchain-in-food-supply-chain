import React, { useEffect,useState } from "react";
import TrackProduct from "./contracts/TrackProduct.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs } from 'antd';
import FirstStage from "./components/first_stage";
import SecondStage from "./components/second_stage";
import ThirdStage from "./components/third_stage";
import FourthStage from "./components/fourth_stage";
import ProductDetail from "./components/get_details";

const { TabPane } = Tabs;

function App(){

  const [contract, setContract] = useState()
  const [accounts, setAccounts] = useState()

  useEffect(()=>{ 
    async function connect(){
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = await TrackProduct.networks[networkId];
        const instance = new web3.eth.Contract(
            TrackProduct.abi,
            deployedNetwork && deployedNetwork.address,
        );
        instance.address = ["0x1B32a7F1826CD12E881109BeF306558DeA0A3C0e"]
        setAccounts(accounts);
        setContract(instance);
        console.log(instance);
      } catch (error) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.log(error);
      }
    }
    connect();
  },[])

  return (
    <div className="App">
      <Tabs defaultActiveKey="1" style={{marginLeft: '80px', marginRight: '80px'}}>
        <TabPane tab="Stage 1" key="1">
          <FirstStage accounts={accounts} contract={contract}/>
        </TabPane>
        <TabPane tab="Stage 2" key="2">
          <SecondStage accounts={accounts} contract={contract}/>
        </TabPane>
        <TabPane tab="Stage 3" key="3">
          <ThirdStage accounts={accounts} contract={contract}/>
        </TabPane>
        <TabPane tab="Stage 4" key="4">
          <FourthStage accounts={accounts} contract={contract}/>
        </TabPane>
        <TabPane tab="Get Detail" key="5">
          <ProductDetail accounts={accounts} contract={contract}/>
        </TabPane>
      </Tabs>
    </div>
  );

}

export default App;
