import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CustomLocation } from '../types/calculator';
import { divIcon } from 'leaflet';
import { solarDataService } from '../services/solarDataService';
import { LoadingSpinner } from './LoadingSpinner';
import { useLoadingState } from '../hooks/useLoadingState';

// Create a custom div-based marker
const customIcon = divIcon({
  html: `<div style="
    width: 24px;
    height: 24px;
    background: #000;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(0,0,0,0.3);
  "></div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

interface LocationMapProps {
  onLocationSelect: (location: CustomLocation) => void;
}

interface LocationMarker {
  lat: number;
  lng: number;
}

const LocationPicker: React.FC<{ onLocationSelect: (location: LocationMarker) => void }> = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

export const LocationMap: React.FC<LocationMapProps> = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = React.useState<LocationMarker | null>(null);
  const { isLoading, error, withLoading } = useLoadingState({
    operationName: 'fetch-solar-data',
    minimumLoadingTime: 300
  });

  const handleLocationSelect = async (location: LocationMarker) => {
    setSelectedLocation(location);

    await withLoading(async () => {
      try {
        const solarData = await solarDataService.getSolarData(location.lat, location.lng);
        onLocationSelect({
          lat: location.lat,
          lng: location.lng,
          sunData: {
            latitude: solarData.latitude,
            annualIrradiance: solarData.annualIrradiance,
            monthlyIrradiance: solarData.monthlyIrradiance
          }
        });
      } catch (err) {
        throw new Error('Failed to fetch solar data for this location');
      }
    });
  };

  return (
    <div className="space-y-2">
      <div className="relative rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={[37.7749, -122.4194]} // Default to San Francisco
          zoom={4}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationPicker onLocationSelect={handleLocationSelect} />
          {selectedLocation && (
            <Marker 
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={customIcon}
            />
          )}
        </MapContainer>
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
      {error && (
        <div className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
          {error.message}
        </div>
      )}
      {selectedLocation && !isLoading && !error && (
        <div className="text-sm text-gray-600">
          Selected: {selectedLocation.lat.toFixed(4)}°, {selectedLocation.lng.toFixed(4)}°
        </div>
      )}
    </div>
  );
};