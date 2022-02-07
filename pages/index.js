import Head from 'next/head'
import Web3 from "web3";
import { useState, useEffect } from 'react';

import {ADDRESS, ABI} from "../config.js"




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
