import React, { useState, useEffect, useRef, useContext } from "react";
import {
  MapPin,
  AlertCircle,
  CheckCircle,
  Loader,
  LocateFixed,
} from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Spinner from "../components/Spinner";
import locationData from "../assets/dataset";
import "../index.css";
import { UserLocationContext } from "../context/userLocation";
const LocationAccess = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState("prompt");
  const [progress, setProgress] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const { location, setLocationData } = useContext(UserLocationContext);

  const markLocation = (newlocation) => {
    const el = document.createElement("div");
    el.innerHTML =
      '<svg class="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>';
    const map = mapRef.current;
    new mapboxgl.Marker(el)
      .setLngLat([newlocation.longitude, newlocation.latitude])
      .addTo(map);
  };

  const checkLocationPermission = async () => {
    if (!navigator.permissions) {
      console.warn("Permissions API not supported in this browser.");
      return null;
    }
    try {
      const status = await navigator.permissions.query({ name: "geolocation" });
      setPermission(status.state);
      return status.state;
    } catch (err) {
      console.error("Permission check error:", err);
      return null;
    }
  };

  const handleRequest = async () => {
    setLoading(true);
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
        setLocationData(newLocation);
        markLocation(newLocation);
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [newLocation.longitude, newLocation.latitude],
            zoom: 12,
            essential: true,
          });
        }
        setSuccess("Granted Location Access Successfully.");
      },
      (error) => {
        console.log("Permission denied or error:", error);
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
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );
    setLoading(false);
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLocation = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setLocationData(newLocation);
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: [pos.coords.longitude, pos.coords.latitude],
              zoom: 12,
              essential: true,
            });
            markLocation(newLocation);
          }
          resolve(newLocation);
        },
        (err) => {
          console.log("currentLoc", err);
          reject(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
    setLoading(false);
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v9",
        projection: "mercator",
        zoom: 9,
        center: [location.longitude || 80, location.latitude || 13],
      });
      if (location.longitude && location.latitude) {
        mapRef.current.flyTo({
          center: [location.longitude, location.latitude],
          zoom: 12,
          essential: true,
        });
      }
      const map = mapRef.current;
      map.on("load", () => {
        markLocation(location);
        locationData.forEach((location) => {
          const el = document.createElement("div");
          el.innerHTML =
            '<svg class="w-8 h-8 sm:w-12 sm:h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>';

          new mapboxgl.Marker(el)
            .setLngLat([location.longitude, location.latitude])
            .addTo(map);
        });
      });

      map.addControl(new mapboxgl.NavigationControl());
      map.scrollZoom.disable();

      map.on("style.load", () => {
        map.setFog({});
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const permissionState = await checkLocationPermission();
      if (permissionState === "prompt") {
        await handleRequest();
      } else if (
        permissionState === "granted" &&
        !(location.latitude && location.longitude)
      ) {
        await getCurrentLocation();
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      setProgress(0);
      const start = Date.now();
      const duration = 3000;
      const animate = () => {
        const elapsed = Date.now() - start;
        const percentage = (elapsed / duration) * 100;
        setProgress(Math.max(0, percentage));

        if (elapsed < duration) {
          requestAnimationFrame(animate);
        } else {
          setError(null);
        }
      };
      animate();
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setProgress(0);
      const start = Date.now();
      const duration = 3000;
      const animate = () => {
        const elapsed = Date.now() - start;
        const percentage = (elapsed / duration) * 100;
        setProgress(Math.max(0, percentage));

        if (elapsed < duration) {
          requestAnimationFrame(animate);
        } else {
          setSuccess(null);
        }
      };
      animate();
    }
  }, [success]);

  mapboxgl.accessToken = import.meta.env.VITE_API_TOKEN;
  return (
    <div
      className={`relative w-full h-[100dvh] sm:h-full font-sans ${
        loading ? `opacity-40` : ""
      }`}
    >
      <div ref={mapContainerRef} className="w-full h-full" />
      {loading && (
        <Spinner
          style={"absolute top-1/2 left-1/2 transform -translate-x-1/2 z-20"}
        />
      )}
      {error && (
        <div
          className={`absolute w-3/4 rounded-2xl p-4 bg-white top-4 left-1/2 transform -translate-x-1/2 z-20 text-red-500 `}
        >
          <h1 className="text-xl font-bold">{error}</h1>
          <div
            className={`absolute bottom-0 left-0 h-1 transition-all duration-[50ms] ease-linear bg-red-500
            } `}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {success && (
        <div
          className={`absolute w-3/4 rounded-2xl p-4 bg-white top-4 left-1/2 transform -translate-x-1/2 z-20 text-green-500 `}
        >
          <h1 className="text-xl font-bold">{success}</h1>
          <div
            className={`absolute bottom-0 left-0 h-1 transition-all duration-[50ms] ease-linear bg-green-500
            } `}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <div className="absolute w-3/4 top-4 left-1/2 transform -translate-x-1/2 z-10">
        <input
          type="text"
          placeholder="Search location..."
          className="w-full px-4 py-2 rounded-lg shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>
      <div className="absolute right-8 top-5/6 transform -translate-y-5/6 md:right-12 z-10">
        <button
          onClick={getCurrentLocation}
          className="bg-white p-3 md:p-5 rounded-2xl shadow-md transition"
        >
          <LocateFixed className="w-6 h-6 md:w-8 md:h-8 text-blue-700" />
        </button>
      </div>
    </div>
  );
};

export default LocationAccess;
