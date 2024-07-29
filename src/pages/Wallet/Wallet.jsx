import React, { useState } from "react";
import { useWallet } from "../../Context/WalletContext";

const Wallet = () => {
  const { walletBalance, addToWallet, transactions } = useWallet();
  console.log("transactions: ", transactions);
  const [amount, setAmount] = useState("");
  const [displayTransactions, setDisplayTransactions] = useState(5);

  const handleShowMore = () => {
    setDisplayTransactions((prev) => prev + 5);
  };
  const handleAddMoney = () => {
    const options = {
      key: "rzp_test_Ernm0SK2wP94Mz",
      amount: amount * 100, // Razorpay amount is in paise
      currency: "INR",
      name: "Foodie",
      description: "Add Money to Wallet",
      handler: function (response) {
        alert(
          "Payment successful! Payment ID: " + response.razorpay_payment_id
        );
        addToWallet(amount);
      },
      prefill: {
        name: "Customer Name",
        email: "Customer@gmail.com",
        contact: "7012983989",
      },
      notes: {
        address: "Palakkad",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-3.5 bg-gray-white border border-grey-600 rounded-[20px] shadow-lg flex flex-col py-10 px-10">
      <h1 className="text-4xl py-4 px-4">Wallet</h1>
      <div className="gradient-box h-16 rounded-t-[12px] w-full my-4"></div>
      <div className="flex flex-col md:flex-row p-2">
        <div className="flex-none w-full md:w-[35%] p-1">
          <div className="bg-white rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-2">
              Wallet Balance: ₹{walletBalance}
            </h4>
            <div className="px-2">
              <h4 className="text-lg font-semibold mb-4">
                Add money to wallet
              </h4>
              <input
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-800"
                onClick={handleAddMoney}
              >
                Add Money to Wallet
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 md:w-1/2 p-2">
          <h4 className="text-lg font-semibold mb-4">Wallet History</h4>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            {transactions.length === 0 ? (
              <p className="text-gray-600">No transactions yet.</p>
            ) : (
              <>
                {transactions
                  .slice(0, displayTransactions)
                  .map((transaction) => (
                    <div key={transaction.transactionId} className="mb-4">
                      <p className="text-gray-600">
                        <strong></strong> ₹{transaction.amount}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-gray-600">
                          {new Date(transaction.timestamp).toLocaleString()}
                        </p>
                        <p className="text-gray-600 text-right">
                          <strong></strong> {transaction.type}
                        </p>
                      </div>
                      <hr />
                    </div>
                  ))}

                {displayTransactions < transactions.length && (
                  <p
                    className="text-gray-400 py-2 rounded cursor-pointer"
                    onClick={handleShowMore}
                  >
                    Show More
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
