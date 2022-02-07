import Head from 'next/head'
import Web3 from "web3";
import { useState, useEffect } from 'react';

import {ADDRESS, ABI} from "../config.js"

  export default function publicMint() {

  // FOR WALLET
  const [signedIn, setSignedIn] = useState(false)

  const [walletAddress, setWalletAddress] = useState(null)

  // FOR MINTING
  const [how_many_xCny, set_how_many_xCny] = useState(1)

  const [xCnyContract, setxCnyContract] = useState(null)

  // INFO FROM SMART Contract

  const [totalSupply, setTotalSupply] = useState(0)

  const [saleStarted, setSaleStarted] = useState(false)

  const [publicPrice, setpublicPrice] = useState(0)

  useEffect( async() => { 

    signIn()

  }, [])

  async function signIn() {
    if (typeof window.web3 !== 'undefined') {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);
     
    } else {
      alert("No Ethereum interface injected into browser. Read-only access");
    }

    window.ethereum.enable()
      .then(function (accounts) {
        window.web3.eth.net.getNetworkType()
        // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
        .then((network) => {console.log(network);if(network != "main"){alert("You are on " + network+ " network. Change network to mainnet or you won't be able to do anything here")} });  
        let wallet = accounts[0]
        setWalletAddress(wallet)
        setSignedIn(true)
        callContractData(wallet)

  })
  .catch(function (error) {
  // Handle error. Likely the user rejected the login
  console.error(error)
  })
  }

//

  async function signOut() {
    setSignedIn(false)
  }
  
  async function callContractData(wallet) {
    // let balance = await web3.eth.getBalance(wallet);
    // setWalletBalance(balance)
    const xCnyContract = new window.web3.eth.Contract(ABI, ADDRESS)
    setxCnyContract(xCnyContract)

    const salebool = await xCnyContract.methods.saleIsActive().call() 
    // console.log("saleisActive" , salebool)
    setSaleStarted(salebool)

    const totalSupply = await xCnyContract.methods.totalSupply().call() 
    setTotalSupply(totalSupply)

  }
  
  async function mintxCny(how_many_xCny) {
    if (xCnyContract) {
 
      const price = Number(publicPrice)  * how_many_xCny 

      const gasAmount = await xCnyContract.methods.publicMintxCny(how_many_xCny).estimateGas({from: walletAddress, value: price})
      console.log("estimated gas",gasAmount)

      console.log({from: walletAddress, value: price})

      xCnyContract.methods
            .publicMintxCny(how_many_xCny)
            .send({from: walletAddress, value: price, gas: String(gasAmount)})
            .on('transactionHash', function(hash){
              console.log("transactionHash", hash)
            })
          
    } else {
        console.log("Wallet not connected")
    }
    
  };



  return (
    <div id="bodyy" className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Mint | 0xCNY</title>
        <link rel="icon" href="/images/favicon.ico" />

        <meta property="og:title" content="0xCNY" key="ogtitle" />
        <meta property="og:description" content="In Celebration of Chinese New Year we bring you 0xCNY, an alpha DAO." key="ogdesc" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta property="og:url" content="https://mint.0xcny.io/" key="ogurl"/>
        <meta property="og:image" content="images/logo.gif" key="ogimage"/>
        <meta property="og:site_name" content="https://mint.0xcny.io/" key="ogsitename" />

        <meta name="twitter:card" content="summary_large_image" key="twcard"/>
        <meta property="twitter:domain" content="https://mint.0xcny.io/" key="twdomain" />
        <meta property="twitter:url" content="https://mint.0xcny.io/" key="twurl" />
        <meta name="twitter:title" content="0xCNY" key="twtitle" />
        <meta name="twitter:description" content="In Celebration of Chinese New Year we bring you 0xCNY, an alpha DAO." key="twdesc" />
        <meta name="twitter:image" content="images/logo.gif" key="twimage" />
      </Head>


    
      <div >
          <div className="flex items-center justify-between w-full pb-6">
            <a href="/" className=""><img src="images/logo.gif" width="400" alt="" className="logo-image" /></a>
          
             
          </div>
          <div className="flex auth my-8 font-bold  justify-center items-center vw2">
            {!signedIn ? <button onClick={signIn} className="PalatinoLinotype inline-block border-1 rounded-full border-black bg-white border-opacity-100 no-underline text-sm hover:text-white py-3 px-6 mx-4 shadow-lg hover:bg-red-900 hover:text-white">CONNECT WALLET WITH METAMASK</button>
            :
            <button onClick={signOut} className="PalatinoLinotype inline-block border-2 border-black bg-white border-opacity-100 no-underline hover:text-black py-2 px-4 mx-4 shadow-lg hover:bg-blue-500 hover:text-gray-100">WALLET CONNECTED: {walletAddress}</button>}
          </div>
        </div>

        <div className="md:w-2/3 w-4/5">
       
        
          <div className="mt-4 py-4">

            <div className="flex flex-col items-center">

                <span className="flex PalatinoLinotype text-4xl gold-color items-center bg-grey-lighter rounded rounded-r-none mb-4 ">TOTAL MINTED: <span className="gold-color text-4xl"> {!signedIn ?  <>-</>  :  <>{totalSupply}</> } / 888</span></span>
               <span className="flex PalatinoLinotype text-3xl gold-color items-center bg-grey-lighter rounded rounded-r-none my-4 ">Max: WL = 1 Public = 3/wallet</span>
<span className="flex PalatinoLinotype text-3xl gold-color items-center bg-grey-lighter rounded rounded-r-none my-4 ">Price: WL = 0.066 / Public = 0.088</span>
                <div id="mint" className="flex justify-around  mt-8 mx-6">
                  <span className="flex PalatinoLinotype text-5xl gold-color items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold">MINT HAPPY CNY</span>
                  
                  <input 
                                      type="number" 
                                      min="1"
                                      max="20"
                                      value={how_many_xCny}
                                      onChange={ e => set_how_many_xCny(e.target.value) }
                                      name="" 
                                      className="PalatinoLinotype pl-4 text-4xl  inline bg-grey-lighter  py-2 font-normal rounded text-grey-darkest  font-bold"
                                  />
                  
                  <span className="flex PalatinoLinotype text-4xl gold-color items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold">!</span>
    
                </div>
                {saleStarted ? 
                <button onClick={() => mintxCny(how_many_xCny)} className="mt-4 PalatinoLinotype text-2xl rounded-full border-6 bg-white text-black py-4 px-6 hover:text-red-900 ">MINT</button>        
                  : <button className="mt-4 PalatinoLinotype rounded-full text-2xl border-6 bg-white py-4 px-8 text-black hover:text-red-900">SALE IS NOT ACTIVE OR NO WALLET IS CONNECTED</button>        
            
              }
                
            </div> 
            </div>
 
          </div>  
    </div>  
    )
  }
