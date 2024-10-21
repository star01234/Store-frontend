import React from "react";

function ButtonComponent({ onGetLocation, onCheckDelivery }) {
  return (
    <div className="button-container">
      <button className="get-location-btn" onClick={onGetLocation}>
        Get My Location
      </button>
      <button className="get-location-btn" onClick={onCheckDelivery}>
        Check Delivery Availability
      </button>
    </div>
  );
}

export default ButtonComponent;
