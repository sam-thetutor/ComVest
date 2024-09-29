import React, { useState } from "react";
import { FaWallet } from "react-icons/fa";
import BigNumber from "bignumber.js";
import { ClipLoader } from "react-spinners";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import { Web3 } from "web3";
import { CVTAddress, ComVestAddress } from "../components/constants/constants";
import CVTAbi from "../components/Utils/CVT.abi.json";
import ComVetAbi from "../components/Utils/Comvest.abi.json";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { formatEther } from "viem";
import moment from "moment/moment";

const rpc = "https://json-rpc.testnet.swisstronik.com";
const web3 = new Web3(window.ethereum);
web3.registerPlugin(new SwisstronikPlugin(rpc));

let ComVestContract = new web3.eth.Contract(ComVetAbi, ComVestAddress);
let CVTContract = new web3.eth.Contract(CVTAbi, CVTAddress);

const useAuthentication = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getUserStats = async () => {
    console.log("dweu");
    if (typeof window !== "undefined" && window.ethereum) {
      const accounts = await web3.eth.requestAccounts();
      const [balance, mySafes] = await Promise.all([
        await CVTContract.methods.balanceOf(accounts[0]).call(),
        await ComVestContract.methods.getMySafes().call(),
      ]);

      let balanceInEthers = formatEther(balance);

      console.log("all user safes :", mySafes, Number(balanceInEthers));
      queryClient.setQueryData(["userBalance"], Number(balanceInEthers));
      queryClient.setQueryData(["userAddress"], accounts[0]);
      queryClient.setQueryData(["userSafes"], mySafes);
      setButtonLoading(false);
      navigate("dashboard");
    }
  };

  const createPersonalGoal = async (data) => {
    if (typeof window !== "undefined" && window.ethereum) {
      const accounts = await web3.eth.requestAccounts();
      const formatedDate = moment(data.date).valueOf();
      const _amount = web3.utils.toWei(data.amount, "ether");
      console.log("big int :", data, _amount, formatedDate);
      
      const appRes = await CVTContract.methods
        .approve(ComVestAddress, _amount)
        .send({
          from: accounts[0],
        });

      console.log("approve results :", appRes);

      let newSafeResults = await ComVestContract.methods
        .createSafe(data.name, _amount, formatedDate)
        .send({
          from: accounts[0],
        });

        console.log("new safe results :",newSafeResults); 
    }
  };

  const LoginButton = () => {
    return (
      <>
        {buttonLoading ? (
          <ClipLoader color="lightblue" />
        ) : (
          <button
            onClick={getUserStats}
            className="bg-[#173F8A] text-white font-bold py-3 px-2 rounded-full flex items-center justify-center w-full hover:bg-[#9FB7FF] focus:outline-none focus:ring-2 focus:ring-[#FFC466] focus:ring-opacity-50"
          >
            <FaWallet color="orange" className="mr-2" />
            Login with Wallet
          </button>
        )}
      </>
    );
  };

  async function invalidatePesonalSafes() {
    await queryClient.invalidateQueries(["userSafes"]);
  }

  async function invalidateUserBalance() {
    await queryClient.invalidateQueries(["userBalance"]);
  }

  return {
    LoginButton,
    createPersonalGoal,
    invalidatePesonalSafes,
    invalidateUserBalance,
  };
};

export default useAuthentication;
