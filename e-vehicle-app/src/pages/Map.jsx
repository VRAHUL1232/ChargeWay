import React, { useState, useEffect, useRef } from "react";
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

const LocationAccess = () => {
  const [location, setLocation] = useState({
    latitude: 20.593683,
    longitude: 78.962883,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState("prompt");
  const [progress, setProgress] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const checkLocationPermission = async () => {
    if (!navigator.permissions) {
      console.warn("Permissions API not supported in this browser.");
      return;
    }
    try {
      const status = await navigator.permissions.query({ name: "geolocation" });
      console.log("permission", status);
      setPermission(status.state);
    } catch (err) {
      console.error("Permission check error:", err);
      return;
    }
  };

  const handleRequest = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log("Permission denied or error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const getCurrentLocation = () => {
    setLoading(true)
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6),
          };
          console.log("currentLoc", pos);
          setLocation(coords);
          resolve(coords);
        },
        (err) => {
          console.log(err);
          reject(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
    setLoading(false)
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v9",
        projection: "mercator",
        zoom: 9,
        center: [location.longitude, location.latitude],
      });

      const map = mapRef.current;

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
    checkLocationPermission();
    handleRequest();
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

  mapboxgl.accessToken =
    "pk.eyJ1IjoicmFodWx2MTIzMiIsImEiOiJjbWJndXlndXQwMmhnMmxxdzFvNzk1N3B0In0.rtlr088E-pxFoa_kPOF2aA";

  return (
    <div
      className={`relative w-full h-[100dvh] sm:h-full font-sans ${
        loading && `opacity-35`
      }`}
    >
      <div ref={mapContainerRef} className="w-full h-full" />

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
