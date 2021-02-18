import React from 'react';
import { MapConsumer, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L from "leaflet";
//import 'leaflet/dist/leaflet.css';
//import enUS from "../img/lang/enUS.png";
import markerIcon from "../img/marker-icon.png";
import markerShadow from "../img/marker-shadow.png";
import AddStoreForm from '../Components/AddStoreForm';
import StoreToken from '../Components/StoreToken';

class Stores extends React.Component {
    constructor () {
        super();

        this.map = null;
        this.getAllStores = this.getAllStores.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.addStore = this.addStore.bind(this);
        this.deleteStore = this.deleteStore.bind(this);

        this.state = {
            coordsToAdd: null,
            stores: [],
            mapCenter: [51.505, -0.09],
        }
    }

    componentDidMount () {
        this.getAllStores();
    }

    getAllStores () {
        let stores = [];
        for (let key of Object.keys(localStorage)) {
            stores.push(JSON.parse(localStorage[key]));
        }
        this.setState({
            stores: stores,
            mapCenter: this._getCoordsCentroid(stores.map(v => v.coords)),
        }, () => console.log("Stores reloaded"));
    }

    closeForm () {
        this.setState({
            coordsToAdd: null,
        })
        this.getAllStores();
    }

    addStore (store) {
        localStorage.setItem(store.code, JSON.stringify(store));
        this.getAllStores();
        this.closeForm();
    }

    deleteStore (code) {
        localStorage.removeItem(code);
        this.getAllStores();
    }

    _getCoordsCentroid (coords) {
        if (coords.length === 0) return [51.505, -0.09];

        let sumX = coords.map(v => v[0]).reduce((acc, val) => acc + val);
        let sumY = coords.map(v => v[1]).reduce((acc, val) => acc + val);
        return [sumX / coords.length, sumY / coords.length];
    }

    render() {
        const markers = [];
        const nativeMarkers = [];
        const storeTokens = []

        for (let store of this.state.stores) {
            markers.push(
                <Marker position={store.coords} key={store.code}>
                    <Popup className="map-popup">
                        <span className="store-name" style={{backgroundColor: store.color}}>#{store.code} – {store.name}</span>
                        <span><b>Opens:</b> {store.openHours} to {store.closeHours}</span>
                        <span><b>Opened in:</b> {store.opened}</span>
                        <span><b>Type: </b> {store.type}</span>
                        {store.holdsTournaments && <span><i>Holds tournaments.</i></span>}
                        <div className="store-delete"> <button onClick={() => this.deleteStore(store.code)}>Delete</button> </div>
                    </Popup>
                </Marker>
            );
            nativeMarkers.push(L.marker(store.coords));
            storeTokens.push(<StoreToken store={store} onClick={() => this.map.setView(store.coords, 16)} />)
        }

        const group = new L.featureGroup(nativeMarkers);

        return (
            <div>
                <aside class="store-list">
                    <h2>Stores</h2>
                    {storeTokens}
                </aside>
                <main class="left-aside">
                    <h3>Double click anywhere in the map to add a store.</h3>
                    <MapContainer className="store-map" center={this.state.mapCenter} zoom={13} scrollWheelZoom click={() => console.log("f")}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markers}
                        <MapConsumer>
                            {
                                m => {
                                    this.map = m;
                                    this.map.doubleClickZoom.disable(); // leaflet zooms automatically when you double click.
                                    this.map.on("dblclick", e => {
                                        if (!this.state.coordsToAdd) {
                                            const {lat, lng} = e.latlng;
                                            this.setState({
                                                coordsToAdd: [lat, lng],
                                            })
                                        }
                                    });
                                    //this.map.setView(this.state.mapCenter, 13); // <MapContainer> properties are immutable, so we'll have to change them here.
                                    if (nativeMarkers.length > 0) this.map.fitBounds(group.getBounds()); // zoom in or out the map as much as needed to fit all the markers
                                    return null;
                                }
                            }
                        </MapConsumer>
                    </MapContainer>
                    {this.state.coordsToAdd && <AddStoreForm coords={this.state.coordsToAdd} addStore={this.addStore} closeForm={this.closeForm} />}
                </main>
            </div>
        );
    }

    _coco() {return [30, 30]}
}

export default Stores;