import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, type LatLngTuple } from 'leaflet';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import { mapPoints } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';
import { useDisasterContext } from '../../contexts/DisasterContext';

// Define custom icons for each disaster type
const shelterIcon = new Icon({
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

// A function to get the correct icon based on disaster type
const getIconForDisaster = (type: string) => {
  switch (type) {
    case 'Flood': return floodIcon;
    case 'Thunderstorm': return thunderstormIcon;
    case 'Earthquake': return earthquakeIcon;
    default: return new Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    });
  }
};

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

const MapPage: React.FC = () => {
  const { PALETTE } = useAppContext();
  const { alerts, isLoading, error } = useDisasterContext();
  const [showShelters, setShowShelters] = useState(true);
  const [showDangerZones, setShowDangerZones] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);

  if (isLoading) {
    return <div className="p-4 text-center">Loading map data...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  const defaultPosition: LatLngTuple = [28.6139, 77.2090]; // Centered on New Delhi

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Preparedness Map</h1>
      
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
          {/* Render markers for shelters */}
          {showShelters && mapPoints.filter(p => p.type === 'shelter').map(point => (
            <Marker key={point.id} position={[point.position.lat, point.position.lng]} icon={shelterIcon}>
              <Popup>{point.name}</Popup>
            </Marker>
          ))}
          {/* Render live disaster alerts from NDMA with specific icons */}
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
          {showDangerZones && (
            <Polygon 
              positions={dangerZoneCoordinates} 
              pathOptions={{ color: 'red', fillColor: 'rgba(220, 88, 109, 0.4)' }}
            />
          )}
          {/* Render evacuation routes as polylines */}
          {showRoutes && (
            <Polyline 
              positions={evacuationRouteCoordinates} 
              pathOptions={{ color: '#628ECB', weight: 4, dashArray: '8, 8' }}
            />
          )}
        </MapContainer>
      </div>
      <div className="p-4 rounded-xl space-y-3" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
        <h3 className="font-bold" style={{ color: PALETTE.text_primary }}>Map Layers</h3>
        <div className="flex justify-between items-center text-sm">
          <label style={{ color: PALETTE.text_secondary }}>🟩 Safe Shelters</label>
          <ToggleSwitch checked={showShelters} onChange={() => setShowShelters(s => !s)} />
        </div>
        <div className="flex justify-between items-center text-sm">
          <label style={{ color: PALETTE.text_secondary }}>🟥 Danger Zones</label>
          <ToggleSwitch checked={showDangerZones} onChange={() => setShowDangerZones(s => !s)} />
        </div>
        <div className="flex justify-between items-center text-sm">
          <label style={{ color: PALETTE.text_secondary }}>🟦 Evacuation Routes</label>
          <ToggleSwitch checked={showRoutes} onChange={() => setShowRoutes(s => !s)} />
        </div>
        <div className="flex justify-between items-center text-sm">
          <label style={{ color: PALETTE.text_secondary }}>🚨 Live Alerts</label>
          {/* Live Alerts will appear automatically based on context */}
        </div>
      </div>
    </div>
  );
};

export default MapPage;