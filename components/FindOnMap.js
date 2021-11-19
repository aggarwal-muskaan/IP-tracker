import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function FindOnMap({ latLong }) {
  const mapContainer = useRef(null);
  // const map = useRef(null);
  const { lat, lng } = latLong;
  useEffect(() => {
    console.log(lat, lng);
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 11,
    });

    return () => map.remove();
  }, [latLong]);

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "50vh" }}
      />
    </div>
  );
}

export default FindOnMap;
