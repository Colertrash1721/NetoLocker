import { useEffect, useState } from "react";

type LatLng = {
  lat: string | number | null;
  lng: string | number | null;
};

export function useDirections(start?: LatLng, end?: LatLng) {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (
      start?.lat != null && start?.lng != null &&
      end?.lat != null && end?.lng != null
    ) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: Number(start.lat), lng: Number(start.lng) },
          destination: { lat: Number(end.lat), lng: Number(end.lng) },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error("Error fetching directions", result);
          }
        }
      );
    }
  }, [start, end]);

  return directions;
}
