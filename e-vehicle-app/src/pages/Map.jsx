import React, { useState, useEffect, useRef, useContext } from "react";
import {
  LocateFixed,
} from "lucide-react";
import { X, Clock, MapPin, Fuel, Zap, Car, CreditCard, Star, Wifi, Store, Wrench } from 'lucide-react';
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Spinner from "../components/Spinner";
import "../index.css";
import { UserLocationContext } from "../context/userLocation";
import { StationLocationContext } from "../context/stationLocation";
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";
import axiosInstance from "../middleware/axiosInstance";


const LocationAccess = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [permission, setPermission] = useState("prompt");
  const [progress, setProgress] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const { location, setLocationData } = useContext(UserLocationContext);
  const { stationData } = useContext(StationLocationContext);
  const [selectedStation, setSelectedStation] = useState(null);
  const popupRef = useRef(null);
  const [routeData, setRouteData] = useState(null);
  mapboxgl.accessToken = import.meta.env.VITE_API_TOKEN;
  const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST;
  const [isOpen, setIsOpen] = useState(false);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  const [stationFeatures, setStationFeatures] = useState([]);

  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const markLocation = (newlocation) => {
    const el = document.createElement("div");
    el.innerHTML = `
  <svg 
    class="w-8 h-8 sm:w-12 sm:h-12" 
    viewBox="0 0 20 20" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="8" fill="#2563EB" />
    <circle cx="10" cy="10" r="4" fill="white" />
  </svg>
`;
    const map = mapRef.current;
    new mapboxgl.Marker(el)
      .setLngLat([newlocation.longitude, newlocation.latitude])
      .addTo(map);
  };

  const searchFilterLocation = () => {
    const filteredData = stationData?.data
      .filter((location) => {
        if (location.name.toLowerCase().includes(search.toLowerCase().trim()) || location.address.toLowerCase().includes(search.toLowerCase().trim())) {
          return true;
        }
      });
    return filteredData;
  };

  const handleStationClick = async (id) => {
    const currentStation = stationData?.data.find((location) => location.s_id === id);
    mapRef.current.flyTo({
      center: [currentStation.lng, currentStation.lat],
      offset: [0, -100],
      zoom: 15,
      essential: true,
    });
    try {
      setLoading(true);
      const response = await axios.get(`${VITE_LOCALHOST}/availableSlot/${id}`);
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${location.longitude},${location.latitude};${currentStation.lng},${currentStation.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const json = await query.json();
      console.log(json, "json data")
      const newDistance = json.routes[0].distance;
      const newDuration = json.routes[0].duration;
      setDistance((newDistance / 1000).toFixed(1));
      setTime((newDuration / 60).toFixed(0));
      console.log(newDistance, newDuration, "new distance and time");
      setStationFeatures(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setSelectedStation(currentStation);
    console.log("Selected Station:", currentStation);
    openModal();
  }

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleRequest = async () => {
    setLoading(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          maximumAge: 0,
        });
      });
      const newLocation = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      };

      setLocationData(newLocation);
      console.log(newLocation);
      markLocation(newLocation);

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [newLocation.longitude, newLocation.latitude],
          zoom: 12,
          essential: true,
        });
      }

      setSuccess("Granted Location Access Successfully.");
      setPermission("granted");
    } catch (error) {
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
    }
    setLoading(false);
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    if (location.latitude && location.longitude) {
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [location.longitude, location.latitude],
          zoom: 12,
          essential: true,
        });
      }
      setLoading(false);
      return;
    }
    await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setLoading(false);
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
          setLoading(false);
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

  const getRoute = async (destination) => {
    try {
      setLoading(true);
      if (permission !== "granted") {
        setError("Location access is not granted");
        setLoading(false);
        return;
      }
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${location.longitude},${location.latitude};${destination.longitude},${destination.latitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const json = await query.json();
      console.log("Route JSON:", json);
      const data = json.routes[0].geometry;

      setRouteData({
        type: 'Feature',
        properties: {},
        geometry: data,
      });
      console.log("Route Data:", data);
    } catch (error) {
      console.error("Error fetching route:", error);
      setError("Failed to fetch route data");
    } finally {
      setLoading(false);
    }
  };

  const clearRoute = () => {
    if (mapRef.current && mapRef.current.getSource('route')) {
      mapRef.current.removeLayer('route');
      mapRef.current.removeSource('route');
      setRouteData(null);
    }
  };

  const getDate = (date) => {
    const d = new Date(date);
    console.log(date, "curent date of the solts");
    const formatted = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));

    return formatted;
  }

  const getTime = (start, end) => {
    return start.slice(0, 5) + ' - ' + end.slice(0, 5)
  }

  const getCost = (cost, start, end) => {
    const st = Number(start.slice(0, 2)) * 60 + Number(start.slice(3, 2));
    const ed = Number(end.slice(0, 2)) * 60 + Number(end.slice(3, 2));
    return ((ed - st) / 60) * cost;
  }

  useEffect(() => {
    if (!mapRef.current || !routeData) return;
    mapRef.current.flyTo({
      center: [location.longitude, location.latitude],
      zoom: 12,
      offset: [0, -100],
      essential: true,
    });
    if (mapRef.current.getSource('route')) {
      mapRef.current.removeLayer('route');
      mapRef.current.removeSource('route');
    }

    mapRef.current.addSource('route', {
      type: 'geojson',
      data: routeData,
    });

    mapRef.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#3b82f6',
        'line-width': 6,
      },
    });
  }, [routeData]);

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
        stationData?.data.map((location) => {
          const el = document.createElement("div");
          el.innerHTML =
            '<svg class="w-8 h-8 sm:w-12 sm:h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>';
          new mapboxgl.Marker(el)
            .setLngLat([location.lng, location.lat])
            .addTo(map);
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 25,
          }).setHTML(`
    <div class="text-sm rounded-lg text-gray-800">
      <h3 class="font-bold text-lg text-green-700">${location.name + location.s_id}</h3>
      <p>${location.address || "No address available"}</p>
    </div>
  `);
          el.addEventListener("mouseenter", () =>
            popup.addTo(map).setLngLat([location.lng, location.lat])
          );
          el.addEventListener("mouseleave", () => popup.remove());
          el.addEventListener("click", () => {
            clearRoute();
            handleStationClick(location.s_id);
          });
        });
      });

      map.addControl(new mapboxgl.NavigationControl());
      map.scrollZoom.disable();
    }
    return () => { };
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
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closeModal();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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

  return (
    <div
      className={`relative w-full h-[100dvh] sm:h-full font-sans ${loading ? `opacity-40` : ""
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%', opacity: 1 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 1 }}
            transition={{ duration: 0.5 }}

            className="fixed bottom-0 left-0 md:left-64 right-0 h-auto bg-white rounded-t-4xl p-6 md:p-8 z-50 flex flex-col gap-2 md:gap-4 items-start justify-center"
          >
            <div className="flex flex-row justify-between gap-2 w-full items-center">
              <h2 className="text-2xl font-bold truncate max-w-full">{selectedStation.name}</h2>
              <button
                onClick={() => { closeModal(); clearRoute() }}
                className="text-red-800 font-bold text-2xl "
              >
                X
              </button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:gap-y-4 w-full items-center justify-between">
              <p className="truncate max-w-full">{selectedStation.address}</p>
              <div className="text-green-700 text-lg font-bold xl:w-1/4 ">
                Contact: <span className="text-black font-semibold">{selectedStation.phone_number}</span>
              </div>
              <div className="text-green-700 text-lg  font-bold xl:w-1/4">
                Review: <span className="text-black">{selectedStation.review} <span style={{ color: 'gold', fontSize: '24px' }}>★</span></span>
              </div>
              <div className="text-green-700 text-lg font-bold xl:w-1/4">
                Distance: <span className="text-black">{distance} Km</span>
              </div>
              <div className="text-green-700 text-lg font-bold xl:w-1/4">
                Duration: <span className="text-black">{time} Min</span>
              </div>
              <button
                onClick={() => { getRoute({ longitude: selectedStation.lng, latitude: selectedStation.lat }) }}
                className="px-3 py-2 font-bold text-md w-auto flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-2xl"
              >
                Direction
              </button>
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-center">
              <h1 className="text-lg text-green-700 font-bold">Available Port:</h1>
              {selectedStation.ac1 == true ? <div>AC1</div> : <></>}
              {selectedStation.ac2 == true ? <div>AC2</div> : <></>}
              {selectedStation.dc1 == true ? <div>DC1</div> : <></>}
              {selectedStation.dc2 == true ? <div>DC2</div> : <></>}
            </div>
            <div className="w-full h-auto">
              <div className="flex overflow-x-auto custom-scrollbar mx-auto w-full gap-3 md:gap-6 h-auto">
                {stationFeatures.length == 0 && <div
                  className={`flex flex-col justify-center items-center text-gray-500 text-xl font-bold w-full py-8`}
                >No Slots Available!</div>}
                {stationFeatures.length > 0 && stationFeatures?.map((feature, index) => {
                  return (
                    <div
                      key={feature.av_id}
                      className={`flex flex-col justify-center items-center gap-2 bg-green-100 hover:bg-green-200 text-black font-bold shadow-b-lg rounded-2xl pt-2 pb-4 px-6 min-w-5/6 sm:min-w-2/3 lg:min-w-1/3 `}
                      onClick={() => { navigate(`/booking/${selectedStation.s_id}`) }}
                    >
                      <h1 className=" text-black text-md md:text-lg">Booking Slot - {index + 1} </h1>
                      <div className="grid grid-cols-2 gap-1 text-black">

                        <h1 className="text-green-600 text-md md:text-lg">{getDate(feature.av_book_date)}</h1>

                        <h1 className="text-green-600 text-md md:text-lg">{getTime(feature.av_start_time, feature.av_end_time)}</h1>
                        <h1 className="text-black text-md md:text-lg">Available: <span className="text-green-600">{" " + feature.av_slots}</span></h1>
                        <h1 className="text-black text-md md:text-lg">Total Cost: <span className="text-green-600">{" $" + getCost(feature.cost, feature.av_start_time, feature.av_end_time)}</span></h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute w-3/4 top-4 left-1/2 transform -translate-x-1/2 z-10">
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search location..."
          className="w-full px-4 py-2 rounded-lg shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        {search.length > 0 ? (
          <div className="h-[50vh] w-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2">
                {searchFilterLocation().length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-gray-500 text-sm sm:text-base md:text-lg">
                      No locations found
                    </div>
                  </div>
                )}
                {searchFilterLocation().map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center space-x-2 p-2 sm:p-3 md:p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      if (mapRef.current) {
                        mapRef.current.flyTo({
                          center: [location.lng, location.lat],
                          offset: [0, -100],
                          zoom: 15,
                          essential: true,
                        });
                        handleStationClick(location.s_id);
                      }
                      setSearch("")
                      clearRoute();
                    }}
                  >
                    <div className="text-sm sm:text-base md:text-lg font-medium">
                      {location.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
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
