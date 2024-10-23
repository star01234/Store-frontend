import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddStore = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [radius, setRadius] = useState("");
  const [adminId, setAdminId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = () => {
      const userRole = localStorage.getItem("userRole");
      console.log("User Role:", userRole);

      if (userRole === "ROLES_ADMIN") {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
          setAdminId(user.id); 
          console.log("Admin ID:", user.id);
        } else {
          console.error("User data not found in localStorage or missing ID");
        }
      } else {
        Swal.fire({
          title: "You have no right",
          text: "You must be an administrator to access this page",
          icon: "warning",
          confirmButtonText: "ตกลง",
        }).then(() => {
          navigate("/home");
        });
      }
    };

    checkUserRole();
  }, [navigate]);

  // handleSubmit จัดการข้อมูลการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !adminId || !address || !lat || !lng || !radius) {
      Swal.fire({
        title: "Error!",
        text: "All fields (name, adminId, address, lat, lng, radius) must be provided!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; 
    }

    const storeData = {
      name,
      adminId,
      address,
      lat,  
      lng,  
      radius, 
    };

    console.log("Data to be sent:", storeData); 

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_RESTO_API}`,
        storeData
      );

      console.log(response.data);
      Swal.fire("Success!", "Store added successfully!", "success");
      navigate("/home"); // เปลี่ยนหน้าเมื่อสำเร็จ
    } catch (error) {
      console.error("Error adding store:", error.response ? error.response.data : error.message);
      Swal.fire("Error!", error.response ? error.response.data.message : "Failed to add store!", "error");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-xl input border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Admin ID
          </label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow-xl input border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="shadow-xl input border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="shadow-xl input border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Radius
          </label>
          <input
            type="text"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="shadow-xl input border rounded-lg p-3 w-full focus:outline-none focus:ring focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="btn bg-[#A020F0] text-white font-semibold py-2 rounded-lg w-full hover:bg-purple-600 transition duration-200"
        >
          Add Store
        </button>
      </form>
    </div>
  );
};

export default AddStore;
