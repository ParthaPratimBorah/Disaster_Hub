import React, { useEffect, useState, useRef } from 'react';
import { mapPoints } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

declare const L: any; // Declare Leaflet global

const CrisisMapPage: React.FC = () => {
    const { PALETTE } = useAppContext();
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const newMap = L.map(mapContainerRef.current).setView([22.5726, 88.3639], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(newMap);
        
        setMap(newMap);
        
        // Cleanup function to remove the map on component unmount
        return () => {
            newMap.remove();
        };
    }, []);
    
    // Invalidate map size after initialization to fix rendering issues
    useEffect(() => {
        if (map) {
            const timer = setTimeout(() => {
                map.invalidateSize();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [map]);


    useEffect(() => {
        if (map) {
            // Add Shelter Markers
            const shelterIcon = L.divIcon({
                html: `<div style="background-color: #28a745; padding: 5px; border-radius: 50%; box-shadow: 0 0 5px #000;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 7.5 7.5-2.1 9H6.6l-2.1-9L12 2z"/><path d="M12 22V12"/></svg></div>`,
                className: '',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            const shelterLayer = L.layerGroup();
            mapPoints.filter(p => p.type === 'shelter').forEach(point => {
                L.marker([point.position.lat, point.position.lng], { icon: shelterIcon })
                    .bindPopup(`<b>${point.name}</b><br/>Safe Shelter.`)
                    .addTo(shelterLayer);
            });
            shelterLayer.addTo(map);

            // Add User Location Marker
            const userLocationIcon = L.divIcon({
                html: `
                    <style>
                        .pulse-ring {
                            width: 24px;
                            height: 24px;
                            background-color: #3b82f6;
                            border-radius: 9999px;
                            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                        }
                        .pulse-dot {
                             position: absolute;
                             top: 50%;
                             left: 50%;
                             transform: translate(-50%, -50%);
                             width: 16px;
                             height: 16px;
                             background-color: #3b82f6;
                             border-radius: 9999px;
                             border: 2px solid white;
                        }
                        @keyframes ping {
                          75%, 100% {
                            transform: scale(2.5);
                            opacity: 0;
                          }
                        }
                    </style>
                    <div class="relative">
                       <div class="pulse-ring"></div>
                       <div class="pulse-dot"></div>
                    </div>
                `,
                className: '',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            L.marker([22.5726, 88.3639], { icon: userLocationIcon })
                .bindPopup("<b>Your Location</b>")
                .addTo(map);
        }
    }, [map]);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Emergency Map</h1>
            <p style={{color: PALETTE.text_secondary}}>Your location is being shared with authorities.</p>
            <div 
                ref={mapContainerRef} 
                className="relative w-full h-96 rounded-xl overflow-hidden" 
                style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow, zIndex: 0 }}
            />
            <div className="p-4 rounded-xl text-sm" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <h3 className="font-bold mb-2" style={{ color: PALETTE.text_primary }}>Legend</h3>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                    <span style={{ color: PALETTE.text_secondary }}>Your Location</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span style={{ color: PALETTE.text_secondary }}>Safe Shelter</span>
                </div>
            </div>
        </div>
    );
};

export default CrisisMapPage;