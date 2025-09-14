import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { LatLngTuple } from 'leaflet';

// Define the shape of the data, adding a 'type' property
interface DisasterAlert {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  geo?: {
    lat: number;
    lng: number;
  };
  type: string; // <-- New property for the disaster type
}

// Define the shape of the context
interface DisasterContextType {
  alerts: DisasterAlert[];
  isLoading: boolean;
  error: string | null;
}

const DisasterContext = createContext<DisasterContextType | undefined>(undefined);

// Helper function to determine the disaster type from the title
const getDisasterTypeFromTitle = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('flood')) return 'Flood';
  if (lowerTitle.includes('cyclone')) return 'Cyclone';
  if (lowerTitle.includes('earthquake')) return 'Earthquake';
  if (lowerTitle.includes('rain')) return 'Rain';
  if (lowerTitle.includes('thunderstorm') || lowerTitle.includes('lightning')) return 'Thunderstorm';
  return 'Other';
};

// Define the provider component
export const DisasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const rssFeedUrl = 'http://sachet.ndma.gov.in/feed.xml';
        const response = await fetch(`${proxyUrl}${encodeURIComponent(rssFeedUrl)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch RSS feed');
        }
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = xmlDoc.querySelectorAll('item');

        const parsedAlerts: DisasterAlert[] = Array.from(items).map((item, index) => {
          const title = item.querySelector('title')?.textContent || 'No title';
          const description = item.querySelector('description')?.textContent || 'No description';
          const link = item.querySelector('link')?.textContent || '#';
          const pubDate = item.querySelector('pubDate')?.textContent || 'No date';
          
          // Using a regular expression to extract lat/lng from the title or description if available
          const geoStringMatch = description.match(/(-?\d+\.\d+)\s(-?\d+\.\d+)/) || title.match(/(-?\d+\.\d+)\s(-?\d+\.\d+)/);
          const geo = geoStringMatch ? { lat: parseFloat(geoStringMatch[1]), lng: parseFloat(geoStringMatch[2]) } : undefined;

          // Determine the disaster type
          const type = getDisasterTypeFromTitle(title);
          
          return {
            id: `${title}-${index}`,
            title,
            description,
            link,
            pubDate,
            geo,
            type,
          };
        });

        // The NDMA feed can be inconsistent, so we filter out alerts without coordinates.
        setAlerts(parsedAlerts.filter(alert => alert.geo)); 
        setError(null);
      } catch (err: any) {
        console.error('Error fetching disaster data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
    const intervalId = setInterval(fetchAlerts, 300000); // Poll every 5 minutes

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <DisasterContext.Provider value={{ alerts, isLoading, error }}>
      {children}
    </DisasterContext.Provider>
  );
};

// Custom hook to use the context
export const useDisasterContext = () => {
  const context = useContext(DisasterContext);
  if (context === undefined) {
    throw new Error('useDisasterContext must be used within a DisasterProvider');
  }
  return context;
};