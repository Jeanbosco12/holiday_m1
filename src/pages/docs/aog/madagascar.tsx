import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

type PredictedDataPoint = {
  id: number;
  lat: number;
  lng: number;
  datePrediction: string;  // ex: '2025-08-25'
  temperature: number;     // ex: 27.5
  rainfall: number;        // ex: 12.3
};

interface Props {
  data: PredictedDataPoint[];
}

export default function MadagascarMap({ data }: Props) {
  return (
    <MapContainer
      center={[-18.775, 46.869]}
      zoom={6}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map(point => (
        <Marker key={point.id} position={[point.lat, point.lng]}>
          <Popup>
            <div>
              <strong>Date:</strong> {point.datePrediction}<br />
              <strong>Température:</strong> {point.temperature} °C<br />
              <strong>Précipitations:</strong> {point.rainfall} mm
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
