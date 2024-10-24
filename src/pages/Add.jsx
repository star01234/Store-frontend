import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"; // Ensure you have this context
import StoreService from "../services/store.service"; // Import your service

const AddStore = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [store, setStore] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
    radius: "",
    adminId: user?.id || "",
  });

  const [error, setError] = useState("");
  console.log(user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prevStore) => ({
      ...prevStore,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate input fields
      for (const key in store) {
        if (!store[key]) {
          throw new Error(`${key} is required`);
        }
      }

      await StoreService.insertStore(store);

      await Swal.fire({
        title: "Success!",
        text: "Store added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/");
    } catch (error) {
      console.error("Error adding store:", error);
      setError(error.message || "Error adding store. Please try again.");

      // Show error alert
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to add store. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Store</h1>
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl rounded-lg p-10 space-y-10"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Store Name
          </label>
          <input
            type="text"
            name="name"
            value={store.name}
            onChange={handleChange}
            className="shadow-xl input border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={store.address}
            onChange={handleChange}
            className="shadow-xl input border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="number"
            name="lat"
            value={store.lat}
            onChange={handleChange}
            className="shadow-xl input border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="number"
            name="lng"
            value={store.lng}
            onChange={handleChange}
            className="shadow-xl input border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Radius
          </label>
          <input
            type="number"
            name="radius"
            value={store.radius}
            onChange={handleChange}
            className="shadow-xl input border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="btn bg-[#A020F0] text-white font-semibold py-2 rounded-lg w-full hover:bg-purple-600 transition duration-200"
        >
          Add Store
        </button>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Show error message if exists */}
      </form>
    </div>
  );
};

export default AddStore;
