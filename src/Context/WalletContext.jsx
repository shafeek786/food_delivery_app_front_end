import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "./AuthContext";
import toastr from "toastr";
const WalletContext = createContext(null);
export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const { userId } = useAuth();
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const getWalletBalance = async () => {
    try {
      const response = await axios.get(`/wallet/getbalance/${userId}`, {
        withCredentials: true,
      });
      setWalletBalance(response.data.wallet.balance);
      setTransactions(response.data.wallet.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const addToWallet = async (amount) => {
    try {
      console.log("addmoney", amount);
      const response = await axios.post(
        `/wallet/addtowallet/${userId}`,
        { amount },
        {
          withCredentials: true,
        }
      );
      console.log("wallet", response);
      if (response.data.success) {
        setWalletBalance(response.data.wallet.balance);
        toastr.success("Money added to wallet");
      } else {
        toastr.error("Failed to add money to wallet.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userId) {
      getWalletBalance();
    }
  }, [userId]);

  return (
    <WalletContext.Provider
      value={{ walletBalance, getWalletBalance, addToWallet, transactions }}
    >
      {children}
    </WalletContext.Provider>
  );
};
