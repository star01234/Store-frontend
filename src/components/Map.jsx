import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationMap from "./LocationMap"; 

const storeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9198/9198446.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

const selectedStoreIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7877/7877890.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

const houseIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7720/7720526.png",
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [0, -40],
});

function MapComponent({ center, stores, selectedStore, myLocation, onSelectStore, onLocationSelect }) { 
    console.log(stores);
    return (
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: "75vh", width: "100vw" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
  
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.lat, store.lng]}
            icon={selectedStore && selectedStore.id === store.id ? selectedStoreIcon : storeIcon}
            eventHandlers={{ click: () => onSelectStore(store) }}
          >
            <Popup>
              <b>{store.name}</b>
              <p>{store.address}</p>
              <p>Delivery Radius: {store.radius} meters</p>
              <a href={store.direction}>Get Direction</a>
            </Popup>
          </Marker>
        ))}
        <LocationMap myLocation={myLocation} icon={houseIcon} onLocationSelect={onLocationSelect} />  
      </MapContainer>
    );
  }
  
  export default MapComponent;
  