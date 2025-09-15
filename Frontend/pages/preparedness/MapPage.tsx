import React, { useState, useEffect, useRef } from 'react';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import { mapPoints, ShelterIcon, SearchIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

declare const L: any; // Declare Leaflet global object

const MapPage: React.FC = () => {
    const { PALETTE } = useAppContext();
    const [map, setMap] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showShelters, setShowShelters] = useState(true);
    const [showDangerZones, setShowDangerZones] = useState(true);

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const shelterLayerRef = useRef<any>(null);
    const dangerLayerRef = useRef<any>(null);
    const searchMarkerRef = useRef<any>(null);

    // Initialize map
    useEffect(() => {
        if (!mapContainerRef.current) return;

        const newMap = L.map(mapContainerRef.current).setView([22.5726, 88.3639], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(newMap);
        
        setMap(newMap);

        // Cleanup function to remove the map on component unmount
        return () => {
            newMap.remove();
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    // Invalidate map size after initialization to fix rendering issues
    useEffect(() => {
        if (map) {
            const timer = setTimeout(() => {
                map.invalidateSize();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [map]);

    // Handle Shelter Layer Toggle
    useEffect(() => {
        if (map) {
            if (shelterLayerRef.current) {
                map.removeLayer(shelterLayerRef.current);
            }
            if (showShelters) {
                const shelterIcon = L.divIcon({
                    html: `<div style="background-color: #28a745; padding: 5px; border-radius: 50%; box-shadow: 0 0 5px #000;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 7.5 7.5-2.1 9H6.6l-2.1-9L12 2z"/><path d="M12 22V12"/></svg></div>`,
                    className: '',
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                });
                const newShelterLayer = L.layerGroup();
                mapPoints.filter(p => p.type === 'shelter').forEach(point => {
                    L.marker([point.position.lat, point.position.lng], { icon: shelterIcon })
                        .bindPopup(`<b>${point.name}</b><br/>Safe Shelter.`)
                        .addTo(newShelterLayer);
                });
                newShelterLayer.addTo(map);
                shelterLayerRef.current = newShelterLayer;
            }
        }
    }, [map, showShelters]);
    
    // Handle Danger Zone Layer Toggle
    useEffect(() => {
        if (map) {
            if (dangerLayerRef.current) {
                map.removeLayer(dangerLayerRef.current);
            }
            if (showDangerZones) {
                const newDangerLayer = L.layerGroup();
                 mapPoints.filter(p => p.type === 'danger').forEach(point => {
                    L.circle([point.position.lat, point.position.lng], {
                        radius: point.radius || 500,
                        color: PALETTE.accent,
                        fillColor: '#dc3545',
                        fillOpacity: 0.4
                    }).bindPopup(`<b>${point.name}</b><br/>Danger Zone.`).addTo(newDangerLayer);
                });
                newDangerLayer.addTo(map);
                dangerLayerRef.current = newDangerLayer;
            }
        }
    }, [map, showDangerZones, PALETTE.accent]);


    const handleSearch = async () => {
        if (!searchQuery || !map) return;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon, display_name } = data[0];
                const newPos: [number, number] = [parseFloat(lat), parseFloat(lon)];
                map.setView(newPos, 14);

                if (searchMarkerRef.current) {
                    map.removeLayer(searchMarkerRef.current);
                }
                const newMarker = L.marker(newPos).addTo(map).bindPopup(`<b>${display_name}</b>`).openPopup();
                searchMarkerRef.current = newMarker;

            } else {
                alert('Location not found.');
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
            alert('Failed to search for location.');
        }
    };


    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Preparedness Map</h1>
            <div className="flex gap-2">
                <div 
                    className="w-full flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}
                >
                    <SearchIcon className="w-5 h-5" style={{ color: PALETTE.text_secondary }} />
                    <input 
                        type="text"
                        placeholder="Search for a location..."
                        className="bg-transparent w-full outline-none"
                        style={{ color: PALETTE.text_primary }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                 <button 
                    onClick={handleSearch}
                    className="p-3 rounded-xl font-semibold transition-all duration-200"
                    style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                >
                    Search
                </button>
            </div>
            <div 
                ref={mapContainerRef} 
                className="relative w-full h-80 rounded-xl overflow-hidden" 
                style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow, zIndex: 0 }}
            />
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
            </div>
        </div>
    );
};

export default MapPage;