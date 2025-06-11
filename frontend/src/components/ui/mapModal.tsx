"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type MapModalProps = {
  lat: number;
  lng: number;
  onClose: () => void;
};

const containerStyle = {
  width: "90%",
  height: "500px",
};

export default function MapModal({ lat, lng, onClose }: MapModalProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md">
        <button className="mb-2 px-4 py-2 bg-red-500 text-white rounded" onClick={onClose}>
          Cerrar
        </button>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat, lng }} zoom={14}>
            <Marker position={{ lat, lng }} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
