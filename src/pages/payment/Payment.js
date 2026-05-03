import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and payment processing logic here
    console.log("Payment Details:", formData);
    setSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        cardholderName: "",
        cardNumber: "",
        cvv: "",
        expiryDate: "",
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10">
        <p className="text-lg font-semibold mb-6">Enter Your Payment Details</p>
        
        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Payment processed successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primeColor"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primeColor"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength="5"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primeColor"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="4"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primeColor"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-primeColor text-white text-lg hover:bg-black duration-300"
          >
            Process Payment
          </button>
        </form>

        <Link to="/" className="mt-4 inline-block">
          <button className="w-52 h-10 bg-gray-400 text-white text-lg hover:bg-gray-600 duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;