import React, { useState, useEffect } from "react";
import { MapPin, AlertCircle, CheckCircle, Loader } from "lucide-react";

const LocationAccess = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState("prompt");

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    setError(null);
    setLoading(true);
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 86400,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp,
        };

        console.log("locationData", locationData);
        setLocation(locationData);
        setLoading(false);
        setPermission("granted"); // Update permission state
        console.log("Location obtained:", locationData);
      },
      (error) => {
        setLoading(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location access denied by user");
            setPermission("denied");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable");
            break;
          case error.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("An unknown error occurred while retrieving location");
            break;
        }
        console.error("Geolocation error:", error);
      },
      options
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          setPermission(result.state);
          if (result.state === "granted") {
            getCurrentLocation();
          }

          result.addEventListener("change", () => {
            setPermission(result.state);
          });
        })
        .catch((err) => {
          console.warn("Permission query not supported:", err);
          console.log(
            "Permission query not supported - Trying to get location"
          );
          getCurrentLocation();
        });
    } else {
      console.log("Permissions API not supported - Trying to get location");
      getCurrentLocation();
    }
  }, []);

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

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };
        setLocation(locationData);
        console.log("Location updated:", locationData);
      },
      (error) => {
        console.error("Watch position error:", error);
        setError(`Watch error: ${error.message}`);
      },
      options
    );

    return watchId;
  };

  const clearLocation = () => {
    setLocation(null);
    setError(null);
  };

  const getPermissionIcon = () => {
    switch (permission) {
      case "granted":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "denied":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatCoordinate = (coord) => {
    return coord ? coord.toFixed(6) : "N/A";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Location Access
        </h2>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          {getPermissionIcon()}
          <span>Permission: {permission}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={getCurrentLocation}
            disabled={loading || permission === "denied"}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {permission!=='prompt' && loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                Get Location
              </>
            )}
          </button>

          <button
            onClick={clearLocation}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Error</span>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {location && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700 mb-3">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Location Retrieved</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Latitude:</span>
                <span className="font-mono">
                  {formatCoordinate(location.latitude)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Longitude:</span>
                <span className="font-mono">
                  {formatCoordinate(location.longitude)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Accuracy:</span>
                <span>
                  {location.accuracy
                    ? `${Math.round(location.accuracy)}m`
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Retrieved:</span>
                <span>{new Date(location.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        )}

        {permission === "denied" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm">
              Location access is blocked. Please enable location permissions in
              your browser settings and refresh the page.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">Usage in Code:</h3>
        <code className="text-xs text-gray-600 block">
          {location
            ? `const userLocation = {\n  lat: ${formatCoordinate(
                location.latitude
              )},\n  lng: ${formatCoordinate(location.longitude)}\n};`
            : "Location will appear here once retrieved"}
        </code>
      </div>
    </div>
  );
};

export default LocationAccess;
