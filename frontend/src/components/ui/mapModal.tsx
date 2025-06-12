import React from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useDirections } from "@/hooks/container/useDirections";

type MapModalProps = {
  lat?: number;
  lng?: number;
  start?: { lat: string | number | null; lng: string | number | null };
  end?: { lat: string | number | null; lng: string | number | null };
  onClose: () => void;
};

const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function MapModal({ lat, lng, start, end, onClose }: MapModalProps) {
  const location = { lat: lat!, lng: lng! };
  const directions = useDirections(start, end);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-2/4">
        <button
          className="mb-2 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
        <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={14}>
          <Marker position={location} />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  );
}
