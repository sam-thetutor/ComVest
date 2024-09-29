import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import moment from "moment";
import { FaUserFriends, FaMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineGroupAdd } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import useAuthentication from '../../Hooks/useAuthentication';
import "react-datepicker/dist/react-datepicker.css";


const Dashboard = () => {
    const { data: userAddress } = useQuery({
        queryKey: ["userAddress"],
      });
      const { data: userBalance } = useQuery({
        queryKey: ["userBalance"],
      });
      const { data: userSafes } = useQuery({
        queryKey: ["userSafes"],
      });
      const navigate = useNavigate();


      const {
        createPersonalGoal,
        invalidateUserBalance,
        invalidatePesonalSafes,
      } = useAuthentication();
    

      const [showPersonalModal, setPersonalModal] = useState(false);
  const [newPersonalGoal, setNewPersonalGoal] = useState({
    name: "",
    amount: 0,
    date: new Date(),
  });

  const { mutateAsync: HandleCreateNewSafe } = useMutation({
    mutationFn: () => createPersonalGoal(newPersonalGoal),
    onSuccess: async () => {
      await invalidatePesonalSafes();
      await invalidateUserBalance();
      setPersonalModal(false);
    },
  }
);






const handleInputChange = (e) => {
    setNewPersonalGoal({ ...newPersonalGoal, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date) => {
    setNewPersonalGoal({ ...newPersonalGoal, date });
  };


  return (
    <>
    {userAddress ? (
      <div className="bg-[#FFFFFF] text-white pb-12 min-h-screen">
        <header className="text-[#333333] py-4 px-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>

        <main className="p-6">
          <div>
            <div className="bg-[#173F8A] text-white rounded-lg p-4 mb-4">
              <h2 className="text-lg font-bold mb-2">Your Balance</h2>
              <p className="text-3xl font-bold">
                {userBalance && userBalance} CVT
              </p>
              {/* <span className="text-[8px]">{userAddress && userAddress}</span> */}
            </div>

            <div className="bg-[#173F8A] text-white rounded-lg p-4 mb-4">
              <h2 className="text-lg font-bold mb-2">Your Activity</h2>
              <div className="flex justify-between">
                <div>
                  <p className="">Personal Safes</p>
                  <p className="text-2xl font-bold">
                    {userSafes && userSafes?.length}
                  </p>
                </div>
               
              </div>
            </div>

            <div className="bg-[#FFFFFF] rounded-lg p-4">
             
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPersonalModal(true)}
                  className="bg-[#F5E5E6] text-black font-bold py-3 px-6 rounded-lg flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FFC466] focus:ring-opacity-50"
                >
                    <MdPersonAddAlt1
                      color="orange"
                      size={30}
                      className="mb-2"
                    />
                  Personal Safe
                </button>

               
              </div>
            </div>
          </div>
        </main>

        {showPersonalModal && (
          <div className="fixed inset-0 bg-black p-2 bg-opacity-60 flex items-center justify-center">
            <div className="bg-[#173F8A] rounded-lg p-6 max-w-md w-full">
              <h2 className="text-lg font-bold mb-4">New Personal Safe</h2>
              <input
                type="text"
                name="name"
                placeholder="Enter safe name"
                className=" rounded-full text-lg  text-black py-2 px-4 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC466] focus:ring-opacity-50"
                value={newPersonalGoal.name}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="amount"
                placeholder=" Target Amount"
                className=" rounded-full py-2 text-lg text-black w-full px-4 flex-1 focus:outline-none focus:ring-2 focus:ring-[#FFC466] focus:ring-opacity-50 mr-2"
                value={newPersonalGoal.amount}
                onChange={handleInputChange}
              />

              <label htmlFor="date" className="mt-6">
                {" "}
                Safe Locked until
              </label>
              <div className="bg-white text-lg text-black rounded-full py-2 px-4 flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFC466] focus:ring-opacity-50">
                <FaCalendarAlt className="mr-2" />
                <DatePicker
                  selected={newPersonalGoal.date}
                  onChange={handleDateChange}
                  className="bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex mt-4 justify-end">
                <button
                  className="bg-[#FFC466] text-white font-bold py-2 px-4 rounded-full hover:bg-[#9FB7FF] focus:outline-none focus:ring-2 focus:ring-[#FFC466] focus:ring-opacity-50 mr-2"
                  onClick={HandleCreateNewSafe}
                >
                  Create Safe
                </button>
                <button
                  className="bg-red-400 text-white font-bold py-2 px-4 rounded-full hover:bg-[#9FB7FF] focus:outline-none focus:ring-2 focus:ring-[#FFC466] focus:ring-opacity-50"
                  onClick={() => setPersonalModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      
      </div>
    ) : (
      navigate("/")
    )}
  </>
  )
}

export default Dashboard
