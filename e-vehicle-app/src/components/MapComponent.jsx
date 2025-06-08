import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const spinEnabled = true;
  let userInteracting = false;

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v9",
        projection: "mercator",
        zoom: 9,
        center: [80.04302, 12.971725],
      });

      const map = mapRef.current;

      map.addControl(new mapboxgl.NavigationControl());
      map.scrollZoom.disable();

      map.on("style.load", () => {
        map.setFog({});
      });

      const secondsPerRevolution = 240;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;

      const spinGlobe = () => {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.getCenter();
          center.lng -= distancePerSecond;
          map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      };

      map.on("mousedown", () => (userInteracting = true));
      map.on("dragstart", () => (userInteracting = true));
      map.on("moveend", () => spinGlobe());

      spinGlobe();
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapContainerRef} className="w-full h-full" />
  );
};

export default MapComponent;
