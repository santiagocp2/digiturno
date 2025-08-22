import { useEffect, useState } from "react";
import BusinessTurnosCanceladosCharts from './BusinessTurnosCanceladosCharts';

function BusinessTurnosCanceladosAnalisis({ negocioId }) {
  const [cancelados, setCancelados] = useState([]);
  const [stats, setStats] = useState({ total: 0, porUsuario: [], porServicio: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCancelados() {
      setLoading(true);
      // Simulación de fetch, aquí deberías llamar a tu endpoint real
      // Ejemplo: /turnos/negocio/{negocioId}/cancelados
      // Datos mock para mostrar el diseño
      setCancelados([
        { usuario: "Juan Pérez", servicio: "Corte de cabello", fecha: "2025-08-20", motivo: "No pudo asistir" },
        { usuario: "Ana Gómez", servicio: "Manicure", fecha: "2025-08-19", motivo: "Cambio de horario" },
      ]);
      setStats({
        total: 2,
        porUsuario: [
          { usuario: "Juan Pérez", cantidad: 1 },
          { usuario: "Ana Gómez", cantidad: 1 },
        ],
        porServicio: [
          { servicio: "Corte de cabello", cantidad: 1 },
          { servicio: "Manicure", cantidad: 1 },
        ]
      });
      setLoading(false);
    }
    if (negocioId) fetchCancelados();
  }, [negocioId]);

  return (
    <div className="space-y-8">
      <div className="bg-red-50 p-4 rounded shadow text-center">
        <div className="text-3xl font-bold">{stats.total}</div>
        <div className="text-gray-600">Turnos cancelados este mes</div>
      </div>
      <BusinessTurnosCanceladosCharts stats={stats} />
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">Detalle de turnos cancelados</h3>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Usuario</th>
              <th className="px-4 py-2 border">Servicio</th>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Motivo</th>
            </tr>
          </thead>
          <tbody>
            {cancelados.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-4 text-gray-500">No hay cancelaciones registradas</td></tr>
            ) : (
              cancelados.map((c, idx) => (
                <tr key={idx} className="hover:bg-red-50">
                  <td className="px-4 py-2 border">{c.usuario}</td>
                  <td className="px-4 py-2 border">{c.servicio}</td>
                  <td className="px-4 py-2 border">{c.fecha}</td>
                  <td className="px-4 py-2 border">{c.motivo}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusinessTurnosCanceladosAnalisis;
