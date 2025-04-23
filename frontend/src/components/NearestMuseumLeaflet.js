import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import L from "leaflet";

// Fix icon mặc định cho Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

// Icon đỏ cho người dùng
const userIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Danh sách bảo tàng (có sẵn toạ độ)
const museums = [
  { id: 1, name: "Bảo tàng Quân khu 5", address: "Số 3 Duy Tân...", lat: 16.0566, lng: 108.2113 },
  { id: 2, name: "Bảo tàng Điêu khắc Chăm", address: "Số 2 đường 2/9...", lat: 16.0603, lng: 108.2233 },
  { id: 3, name: "Bảo tàng Đà Nẵng", address: "Số 24 Trần Phú...", lat: 16.0741, lng: 108.2227 },
  { id: 4, name: "Bảo tàng Mỹ thuật Đà Nẵng", address: "Số 78 Lê Duẩn...", lat: 16.0749, lng: 108.2175 },
  { id: 5, name: "Bảo tàng Đồng Đình", address: "Hoàng Sa, Thọ Quang...", lat: 16.1235, lng: 108.3035 },
  { id: 6, name: "Bảo tàng Phật giáo Đà Nẵng", address: "Số 48 Sư Vạn Hạnh...", lat: 16.0035, lng: 108.2631 },
  { id: 7, name: "Bảo tàng Sáp Đà Nẵng", address: "Fantasy Park, Bà Nà Hills...", lat: 15.9995, lng: 107.9960 },
  { id: 8, name: "Bảo tàng Tre Trúc Sơn Trà", address: "Tiểu khu 64, Thọ Quang...", lat: 16.1130, lng: 108.2785 },
  { id: 9, name: "Nhà Trưng bày Hoàng Sa", address: "Đường Hoàng Sa...", lat: 16.1145, lng: 108.2640 }
];

// Tính khoảng cách giữa 2 toạ độ (km)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Popup hiển thị mặc định khi render
const AutoOpenPopup = ({ nearest }) => {
  const map = useMap();
  const popupRef = useRef(null);

  useEffect(() => {
    if (map && nearest && popupRef.current) {
      popupRef.current.openOn(map);
    }
  }, [map, nearest]);

  return nearest ? (
    <Popup ref={popupRef} position={[nearest.lat, nearest.lng]}>
      <strong>{nearest.name}</strong>
      <br />
      📍 {nearest.address}
      <br />
      📏 Cách bạn khoảng: {nearest.distance.toFixed(2)} km
      <br />
      <button onClick={() => map.closePopup()}>Đóng</button>
    </Popup>
  ) : null;
};

// Thêm tuyến đường routing khi có user + nearest
const RoutingControl = ({ from, to }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!map || !from || !to) return;

    const instance = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }]
      }
    }).addTo(map);

    routingRef.current = instance;

    return () => {
      if (routingRef.current && map.hasLayer(routingRef.current)) {
        map.removeControl(routingRef.current);
      }
    };
  }, [from, to, map]);

  return null;
};

// Main component
const NearestMuseumLeaflet = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearest, setNearest] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userPos = { lat: latitude, lng: longitude };
        setUserLocation(userPos);

        let minDist = Infinity;
        let closest = null;
        museums.forEach((m) => {
          const dist = calculateDistance(latitude, longitude, m.lat, m.lng);
          if (dist < minDist) {
            minDist = dist;
            closest = { ...m, distance: dist };
          }
        });
        setNearest(closest);
      },
      (err) => {
        alert("Không thể truy cập vị trí của bạn.");
        console.error(err);
      }
    );
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🗺️ Bản đồ bảo tàng</h2>
      <MapContainer
        center={userLocation || [16.05, 108.22]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "calc(100vh - 100px)", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>📍 Bạn đang ở đây</Popup>
          </Marker>
        )}

        {museums.map((museum) => (
          <Marker key={museum.id} position={[museum.lat, museum.lng]}>
            <Popup>
              <strong>{museum.name}</strong>
              <br />
              {museum.address}
            </Popup>
          </Marker>
        ))}

        <AutoOpenPopup nearest={nearest} />
        {userLocation && nearest && (
          <RoutingControl from={userLocation} to={nearest} />
        )}
      </MapContainer>
    </div>
  );
};

export default NearestMuseumLeaflet;
