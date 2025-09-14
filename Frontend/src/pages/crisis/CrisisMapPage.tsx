import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, type LatLngTuple } from 'leaflet';
import { mapPoints } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';
import { useDisasterContext } from '../../contexts/DisasterContext';

// Define custom icons for each disaster type
const crisisShelterIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const floodIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const thunderstormIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const earthquakeIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const alertIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const userLocationIcon = new Icon({
  iconUrl: 'data:image/svg+xml;charset=utf-8,' +
    '<svg viewBox="0 0 24 24" fill="blue" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">' +
    '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>' +
    '<circle cx="12" cy="10" r="3"></circle>' +
    '</svg>',
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

// A function to get the correct icon based on disaster type
const getIconForDisaster = (type: string) => {
  switch (type) {
    case 'Flood': return floodIcon;
    case 'Thunderstorm': return thunderstormIcon;
    case 'Earthquake': return earthquakeIcon;
    default: return alertIcon;
  }
};

const CrisisMapPage: React.FC = () => {
  const { PALETTE } = useAppContext();
  const { alerts, isLoading, error } = useDisasterContext();
  const defaultPosition: LatLngTuple = [28.6139, 77.2090]; // Centered on New Delhi

  // Define the coordinates here to resolve the error
  const dangerZoneCoordinates: LatLngTuple[] = [
    [28.71, 77.20],
    [28.71, 77.25],
    [28.68, 77.25],
    [28.68, 77.20]
  ];
  
  const evacuationRouteCoordinates: LatLngTuple[] = [
    [28.6139, 77.2090],
    [28.65, 77.22],
    [28.68, 77.24]
  ];

  if (isLoading) {
    return <div className="p-4 text-center">Loading emergency map...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Emergency Map</h1>
      <p style={{ color: PALETTE.text_secondary }}>Your location is being shared with authorities.</p>

      <div className="relative w-full h-96 rounded-xl overflow-hidden" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
        <MapContainer
          center={defaultPosition}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* User's current location with a custom pulsing icon */}
          <Marker position={defaultPosition} icon={userLocationIcon}>
            <Popup>Your Location</Popup>
          </Marker>

          {/* Render markers for shelters */}
          {mapPoints.filter(p => p.type === 'shelter').map(point => (
            <Marker key={point.id} position={[point.position.lat, point.position.lng]} icon={crisisShelterIcon}>
              <Popup>{point.name}</Popup>
            </Marker>
          ))}
          {/* Render live disaster alerts from NDMA */}
          {alerts.map(alert => (
            alert.geo && (
              <Marker key={alert.id} position={[alert.geo.lat, alert.geo.lng]} icon={getIconForDisaster(alert.type)}>
                <Popup>
                  <h3 className="font-bold">{alert.title}</h3>
                  <p>{alert.description}</p>
                  <a href={alert.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Read more
                  </a>
                </Popup>
              </Marker>
            )
          ))}
          {/* Render danger zones as polygons */}
          <Polygon 
            positions={dangerZoneCoordinates} 
            pathOptions={{ color: 'red', fillColor: 'rgba(220, 88, 109, 0.4)' }}
          />
          {/* Render evacuation routes as polylines */}
          <Polyline 
            positions={evacuationRouteCoordinates} 
            pathOptions={{ color: '#628ECB', weight: 4, dashArray: '8, 8' }}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default CrisisMapPage;