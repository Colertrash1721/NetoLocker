import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getToken } from "../services/getToken";

const Libraries = ["places"];

const getMarkerIcon = () => {
  if (window.google && window.google.maps) {
    return {
      url: "https://maps.google.com/mapfiles/kml/shapes/truck.png",
      scaledSize: new window.google.maps.Size(30, 30),
    };
  }
  return null;
};

const TraccarMap = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const { token } = useParams();

  const authHeader = (username, password) =>
    "Basic " + btoa(`${username}:${password}`);

  // Dibuja la ruta usando Google Maps Directions API
  const drawRoute = (startLat, startLng, endLat, endLng) => {
    const directionsService = new window.google.maps.DirectionsService();

    const origin = { lat: parseFloat(startLat), lng: parseFloat(startLng) };
    const destination = { lat: parseFloat(endLat), lng: parseFloat(endLng) };

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error trazando la ruta:", status);
        }
      }
    );
  };

  const getTokenResponse = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MY_BACKEND_API}/short-link/decodeShortLink/${token}`
      );

      const { deviceName, username, password } = response.data;
      const email = `${username}.com`;

      setInterval(async () => {
        await fetchTraccarDevices(email, password);
        await fetchBackendRoute(deviceName);
      }, 10000);
    } catch (error) {
      console.error("Error al obtener credenciales:", error);
      setLoading(false);
    }
  };

  const fetchBackendRoute = async (deviceName) => {
    try {
      const routeResponse = await axios.get(
        `${process.env.REACT_APP_MY_BACKEND_API}/routes/${deviceName}`
      );

      const data = routeResponse.data.device;

      if (
        data.Startlatitud &&
        data.Startlongitud &&
        data.Endlatitud &&
        data.Endlongitud
      ) {
        drawRoute(
          data.Startlatitud,
          data.Startlongitud,
          data.Endlatitud,
          data.Endlongitud
        );
      }
    } catch (error) {
      console.log("Error al obtener ruta del backend:", error);
    }
  };

  const fetchTraccarDevices = async (username, password) => {
    try {
      const devicesResponse = await axios.get(
        `${process.env.REACT_APP_MY_API_URL}/devices`,
        {
          headers: {
            Authorization: authHeader(username, password),
          },
        }
      );

      console.log(devicesResponse);

      const positionsResponse = await axios.get(
        `${process.env.REACT_APP_MY_API_URL}/positions`,
        {
          headers: {
            Authorization: authHeader(username, password),
          },
        }
      );

      const devicesWithPositions = devicesResponse.data
        .map((device) => {
          const position = positionsResponse.data.find(
            (p) => p.deviceId === device.id
          );
          return {
            ...device,
            position: position
              ? {
                  lat: position.latitude,
                  lng: position.longitude,
                  speed: position.speed,
                  course: position.course,
                  address: position.address,
                  lastUpdate: new Date(position.deviceTime).toLocaleString(),
                }
              : null,
          };
        })
        .filter((device) => device.position);

      setDevices(devicesWithPositions);

      setLoading(false);
    } catch (error) {
      console.error("Error al obtener datos de Traccar:", error);
      setLoading(false);
    }
  };

  if (token) {
    getTokenResponse(token);
    getToken(token);
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#555",
        }}
      >
        Cargando datos de dispositivos...
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={Libraries}
    >
      <GoogleMap
        center={[18.488843,69.986673]}
        zoom={2}
        mapContainerStyle={{ height: "100vh", width: "100%" }}
        onLoad={(map) => setMap(map)}
        options={{
          disableDefaultUI: true,
          gestureHandling: "greedy",
        }}
      >
        {devices.map((device) => (
          <React.Fragment key={device.id}>
            <Marker
              position={{ lat: device.position.lat, lng: device.position.lng }}
              icon={getMarkerIcon()}
              onClick={() => setSelectedDevice(device)}
            />
            {selectedDevice?.id === device.id && (
              <InfoWindow
                position={{
                  lat: device.position.lat,
                  lng: device.position.lng,
                }}
                onCloseClick={() => setSelectedDevice(null)}
              >
                <div style={{ padding: "10px" }}>
                  <h3>{device.name}</h3>
                  <p>
                    <strong>Última actualización:</strong>{" "}
                    {device.position.lastUpdate}
                  </p>
                  <p>
                    <strong>Velocidad:</strong>{" "}
                    {device.position.speed
                      ? `${device.position.speed} km/h`
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Dirección:</strong>{" "}
                    {device.position.address || "Desconocida"}
                  </p>
                </div>
              </InfoWindow>
            )}
          </React.Fragment>
        ))}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default TraccarMap;
