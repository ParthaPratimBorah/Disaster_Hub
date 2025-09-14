import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import { Icon } from 'leaflet';
import { useDisasterContext } from '../contexts/DisasterContext';

// Define a custom icon for the markers
const alertIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const DisasterMap: React.FC = () => {
  const { alerts, isLoading, error } = useDisasterContext();

  if (isLoading) {
    return <div className="p-4 text-center">Loading alerts...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  const defaultPosition = [23.5, 80] as [number, number]; // Center of India

  return (
    <div className="h-full w-full">
      <MapContainer center={defaultPosition} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {alerts.map((alert) => (
          alert.geo ? (
            <Marker 
              key={alert.id} 
              position={[alert.geo.lat, alert.geo.lng]} 
              icon={alertIcon}
            >
              <Popup>
                <h3 className="font-bold">{alert.title}</h3>
                <p>{alert.description}</p>
                <a href={alert.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Read more
                </a>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
};

export default DisasterMap;