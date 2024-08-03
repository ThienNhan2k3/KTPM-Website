import { MapContainer, TileLayer, useMap } from 'react-leaflet';

export default function Map({children, markerPos}) {
    return (
        <MapContainer 
            center={markerPos} 
            zoom={13} 
            maxZoom={18}
            bounceAtZoomLimits={false}
            scrollWheelZoom={false}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {children}

        </MapContainer>
    )
}