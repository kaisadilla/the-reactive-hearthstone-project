import React from 'react';
import { MapConsumer, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L from "leaflet";
//import 'leaflet/dist/leaflet.css';
//import enUS from "../img/lang/enUS.png";
import markerIcon from "../img/marker-icon.png";
import markerShadow from "../img/marker-shadow.png";

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

function Stores () {

    return (
        <main>
            <MapContainer className="store-map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} click={() => console.log("f")}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <MapConsumer>
                    {
                        map => {
                            // wtf is happening here
                            let lastClick = Date.now();
                            map.on("click", e => {
                                console.log("last:     " + lastClick);
                                console.log("now - 20: " + ((Date.now()) - 20));
                                console.log("comparison: " + lastClick > ((Date.now()) - 20));
                                lastClick = Date.now();
                                return;
                                if ((Date.now() - 2000) > lastClick) {
                                    lastClick = Date.now();
                                    console.log("clickk");
                                    /*console.log(e.latlng);
                                    const {lat, lng} = e.latlng;
                                    L.marker([lat, lng], { icon: icon }).addTo(map);*/
                                }
                            });
                            return null;
                        }
                    }
                </MapConsumer>
            </MapContainer>
        </main>
    );
}

export default Stores;