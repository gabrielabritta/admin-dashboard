'use client';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L, { LatLngExpression, Icon, DivIcon } from 'leaflet';
import { useEffect } from 'react';
import { useTheme } from "next-themes";

// Dados simulados das torres (deve ser igual ao da dashboard)
const towerData = [
  { id: 'TWR-1001', status: 'Íntegra', position: [-23.55052, -46.633308] }, // SP
  { id: 'TWR-1002', status: 'Íntegra', position: [-22.906847, -43.172896] }, // RJ
  { id: 'TWR-1003', status: 'Íntegra', position: [-19.916681, -43.934493] }, // BH
  { id: 'TWR-1004', status: 'Íntegra', position: [-25.428954, -49.267137] }, // Curitiba
  { id: 'TWR-1005', status: 'Íntegra', position: [-12.9714, -38.5014] }, // Salvador
  { id: 'TWR-1006', status: 'Íntegra', position: [-3.71722, -38.54337] }, // Fortaleza
  { id: 'TWR-1007', status: 'Íntegra', position: [-8.04756, -34.877] }, // Recife
  { id: 'TWR-1008', status: 'Íntegra', position: [-15.77972, -47.92972] }, // Brasília
  { id: 'TWR-1009', status: 'Íntegra', position: [-1.45502, -48.5024] }, // Belém
  { id: 'TWR-1010', status: 'Danificada', position: [-16.6864, -49.2643] }, // Goiânia (danificada)
];

// Ícone estilizado para torres íntegras
const towerCircleIcon = new DivIcon({
  className: 'custom-tower-icon',
  html: `<div class="tower-circle bg-green-600"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});
// Ícone estilizado para torres danificadas
const towerCircleIconRed = new DivIcon({
  className: 'custom-tower-icon',
  html: `<div class="tower-circle bg-red-600"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Estilo global para corrigir z-index do Leaflet
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .leaflet-pane, .leaflet-control, .leaflet-top, .leaflet-bottom {
      z-index: 10 !important;
    }
  `;
  if (!document.getElementById('leaflet-zindex-fix')) {
    style.id = 'leaflet-zindex-fix';
    document.head.appendChild(style);
  }
}

export default function LeafletMap() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    import('leaflet/dist/leaflet.css');
    // Adiciona ou remove o filtro dark conforme o tema
    const styleId = 'leaflet-darkmode-filter';
    let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;
    if (resolvedTheme === 'dark') {
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        styleTag.innerHTML = `
          .leaflet-layer,
          .leaflet-control-zoom-in,
          .leaflet-control-zoom-out,
          .leaflet-control-attribution {
            filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%) !important;
          }
        `;
        document.head.appendChild(styleTag);
      }
    } else {
      if (styleTag) {
        styleTag.remove();
      }
    }
  }, [resolvedTheme]);

  // Traçar linha entre as torres (na ordem do array)
  const polylinePositions: LatLngExpression[] = towerData.map(t => t.position as LatLngExpression);

  return (
    <MapContainer
      center={[-14.235004, -51.92528] as [number, number]}
      zoom={4}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={polylinePositions} color="#64748b" weight={2} opacity={0.5} dashArray="6 6" />
      {towerData.map(tower => (
        <Marker
          key={tower.id}
          position={tower.position as LatLngExpression}
          icon={tower.status === 'Danificada' ? towerCircleIconRed : towerCircleIcon}
        >
          <Popup>
            <div className="rounded-lg shadow-lg p-3 min-w-[140px] bg-white dark:bg-neutral-900">
              <div className="font-semibold text-sm mb-1 flex items-center gap-2">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${tower.status === 'Danificada' ? 'bg-red-600' : 'bg-green-600'}`}></span>
                {tower.id}
              </div>
              <div className="text-xs text-muted-foreground">Status: <span className={tower.status === 'Danificada' ? 'text-red-600' : 'text-green-600'}>{tower.status}</span></div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 