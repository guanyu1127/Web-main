import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapPage = () => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [markerPosition, setMarkerPosition] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const handleAddressChange = (event) => setAddress(event.target.value);

  const handleSearchLocation = () => {
    if (!address) {
      alert("請輸入有效地址");
      return;
    }

    if (!window.google || !window.google.maps) {
      alert("Google Maps API 尚未加載完成");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        const newLocation = { lat: lat(), lng: lng() };
        setLocation(newLocation);
        setMarkerPosition(newLocation);
      } else {
        alert(`地址未找到或無效，錯誤原因：${status}`);
      }
    });
  };

  return (
    <div>
      <h1>地圖查詢</h1>
      <div>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="輸入地址"
        />
        <button onClick={handleSearchLocation}>查詢位置</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <LoadScript googleMapsApiKey="AIzaSyBtmw2VLVpCHzuM7_eur3F42a9Z-rDKeG4">
          <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={15}>
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapPage;
