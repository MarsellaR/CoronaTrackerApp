import { React, useEffect } from "react";
import { Circles } from "./Circles";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import styles from "./Map.module.css";

const Map = ({ center, zoom, data, cases }) => {
  function FlyMapTo() {
    const map = useMap();

    useEffect(() => {
      map.flyTo([center.lat, center.long]);
    }, [center.lat, center.long]);

    return null;
  }
  return (
    <MapContainer
      style={{
        height: "300px",
        width: "100%",
        border: "10px solid white",
      }}
      center={[center.lat, center.long]}
      zoom={zoom}
      scrollWheelZoom={true}
      className={styles.mapContainer}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[center.lat, center.long]}></Marker>
      {Circles(data, cases)}
      <FlyMapTo />
    </MapContainer>
  );
};
export default Map;
/* 34.80746, -40.4796; */
