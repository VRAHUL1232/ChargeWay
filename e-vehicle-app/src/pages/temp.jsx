import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, AlertCircle, Play, Square } from 'lucide-react';

const LocationWatcher = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isWatching, setIsWatching] = useState(false);
  const [watchId, setWatchId] = useState(null);

  const watchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return null;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };
        setLocation(locationData);
        setError(null); // Clear any previous errors
        console.log("Location updated:", locationData);
      },
      (error) => {
        console.error("Watch position error:", error);
        setError(`Watch error: ${error.message}`);
      },
      options
    );

    return id;
  };

  const startWatching = () => {
    const id = watchLocation();
    if (id) {
      setWatchId(id);
      setIsWatching(true);
    }
  };

  const stopWatching = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsWatching(false);
      console.log("Stopped watching location");
    }
  };

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy <= 10) return 'text-green-600';
    if (accuracy <= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Navigation className="text-blue-600" size={24} />
        <h1 className="text-2xl font-bold text-gray-800">Location Watcher</h1>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={startWatching}
          disabled={isWatching}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isWatching
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <Play size={16} />
          Start Watching
        </button>
        
        <button
          onClick={stopWatching}
          disabled={!isWatching}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            !isWatching
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <Square size={16} />
          Stop Watching
        </button>
      </div>

      {/* Status indicator */}
      <div className="mb-4">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
          isWatching ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isWatching ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
          }`}></div>
          <span className="text-sm font-medium">
            {isWatching ? 'Actively watching location' : 'Not watching'}
          </span>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">Error:</span>
          </div>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Location display */}
      {location && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="text-blue-600" size={20} />
            <h3 className="font-semibold text-blue-900">Current Location</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Latitude:</span>
              <span className="font-mono text-gray-900">
                {location.latitude.toFixed(6)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Longitude:</span>
              <span className="font-mono text-gray-900">
                {location.longitude.toFixed(6)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Accuracy:</span>
              <span className={`font-medium ${getAccuracyColor(location.accuracy)}`}>
                ±{location.accuracy.toFixed(0)}m
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Last Update:</span>
              <span className="text-gray-900">
                {formatTimestamp(location.timestamp)}
              </span>
            </div>
          </div>

          {/* Google Maps link */}
          <div className="mt-3 pt-3 border-t border-blue-200">
            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Click "Start Watching" to begin tracking your location. 
          Move around to see real-time updates. Remember to stop watching 
          when done to save battery.
        </p>
      </div>
    </div>
  );
};

export default LocationWatcher;