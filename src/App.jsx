// src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import HeaderComponent from "./components/Header";
import ButtonComponent from "./components/Button";
import MapComponent from "./components/Map";
import AppRoutes from "./routers/Router";

const base_url = import.meta.env.VITE_API_BASE_URL;
console.log(base_url);

function App() {
  <AppRoutes />
  const center = [13.83687318, 100.030047];
  const [stores, setStores] = useState([]);
  const [myLocation, setMylocation] = useState({ lat: "", lng: "" });
  const [selectedStore, setSelectedStore] = useState(null);

  const [deliveryZone, setDeliveryZone] = useState({
    lat: null,
    lng: null,
    radius: 1000,
  });

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // Earth radius in meters
    const phi_1 = (lat1 * Math.PI) / 180;
    const phi_2 = (lat2 * Math.PI) / 180;

    const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
    const delta_lambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) * Math.cos(phi_2) * Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${base_url}/api/v1/stores`);
        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  const handlerGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMylocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleLocationCheck = () => {
    if (!myLocation.lat || !myLocation.lng) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your valid location",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!selectedStore) {
      Swal.fire({
        title: "Error!",
        text: "Please select a store",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const distance = calculateDistance(myLocation.lat, myLocation.lng, selectedStore.lat, selectedStore.lng);

    if (distance <= deliveryZone.radius) {
      Swal.fire({
        title: "Success",
        text: "You are within the delivery zone for " + selectedStore.name,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "You are outside the delivery zone for " + selectedStore.name,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
    <AppRoutes />
      <HeaderComponent />
      <ButtonComponent onGetLocation={handlerGetLocation} onCheckDelivery={handleLocationCheck} />
      <MapComponent
        center={center}
        stores={stores}
        selectedStore={selectedStore}
        myLocation={myLocation}
        onSelectStore={setSelectedStore}
        onLocationSelect={setMylocation}
      />
    </>
  );
}

export default App;
