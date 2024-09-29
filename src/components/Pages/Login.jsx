import React, { useState } from 'react';
import Img from "../../assets/homepage.png"
import useAuthentication from '../../Hooks/useAuthentication';

const Login = () => {

const {LoginButton} = useAuthentication()
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl ">ComVest</h1>
      <div className="max-w-md w-full px-6 py-8 rounded-lg shadow-lg">
        <img src={Img} alt="imig" />
        <p className="text-lg mb-8">
        Empower your small business with Personal savings campaigns
        </p>
        <LoginButton/>
      </div>
    </div>
  );
};

export default Login;


















// import React, { useEffect } from 'react'
// import useAuthentication from '../Hooks/useAuthentication'
// import { useQuery } from '@tanstack/react-query';

// const Login = () => {

// const {connectCeloWallet,LoginButton,address,balance,getBalance,getUserAddress} = useAuthentication()

// useEffect(() => {

//     load()
// })


// const load=async()=>{
//     // getUserAddress(),
//     getBalance()

// }
// const { data: accountAddress } = useQuery({
//     queryKey: ['accountAddress'],
//   });
//   console.log("account address :",accountAddress)
//     return (
//         <div
//             style={{ minHeight: '90vh' }}
//             className="flex flex-col w-full border gap-2  rounded-md justify-center items-center"
//         >

//             <div>
//                 <h1 className='text-6xl '>

//                     CeloVest
//                 </h1>
//                 <span>Saving your way to the future</span>

//             </div>
//             <LoginButton/>
//             <span>Addess :{address?.toString()}</span>
//             <span>Balance :{balance}</span>
//             {/* d */}

//         </div>
//     )
// }

// export default Login