import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl";
// import "mapbox-gl.css";

function FindOnMap({ latLong }) {
  const mapContainer = useRef(null);
  const { lat, lng } = latLong;
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [lng, lat],
      zoom: 14,
    });
    new mapboxgl.Marker({
      color: "#000",
    })
      .setLngLat([lng, lat])
      .addTo(map);

    return () => map.remove();
  }, [latLong]);

  return (
    <div
      ref={mapContainer}
      className="map-container"
      style={{ height: "100vh" }}
    />
  );
}

export default FindOnMap;
