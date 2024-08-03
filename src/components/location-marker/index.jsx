import { Marker } from 'react-leaflet';

export default function LocationMarker({ pos, onMove }) {
    return (
      <Marker
        position={pos}
        draggable
        autoPan
        eventHandlers={{
          moveend: (event) => {
            onMove([event.target.getLatLng().lat, event.target.getLatLng().lng]);
          }
        }}
      />
    );
}
  