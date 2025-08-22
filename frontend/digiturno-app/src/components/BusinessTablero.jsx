import { useEffect, useState } from "react";
// Puedes instalar chart.js o recharts para las gráficas
// import { Bar } from 'react-chartjs-2';

function BusinessTablero({ negocioId }) {
  const [resumen, setResumen] = useState({ turnosHoy: 0, turnosSemana: 0, turnosMes: 0, pendientes: 0, confirmados: 0, cancelados: 0 });
  const [clientes, setClientes] = useState([]);
  const [serviciosRanking, setServiciosRanking] = useState([]);
  const [proximosTurnos, setProximosTurnos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTablero() {
      setLoading(true);
      // Simulación de fetch, aquí deberías llamar a tus endpoints
      // Ejemplo: /turnos/negocio/{negocioId}/resumen, /turnos/negocio/{negocioId}/proximos, etc.
      // Aquí solo datos mock para mostrar el diseño
      setResumen({ turnosHoy: 5, turnosSemana: 32, turnosMes: 120, pendientes: 3, confirmados: 20, cancelados: 2 });
      setClientes([
        { nombre: "Juan Pérez", totalTurnos: 12 },
        { nombre: "Ana Gómez", totalTurnos: 8 },
      ]);
      setServiciosRanking([
        { nombre: "Corte de cabello", cantidad: 40 },
        { nombre: "Manicure", cantidad: 25 },
      ]);
      setProximosTurnos([
        { cliente: "Juan Pérez", servicio: "Corte de cabello", hora: "10:00" },
        { cliente: "Ana Gómez", servicio: "Manicure", hora: "11:00" },
      ]);
      setLoading(false);
    }
    if (negocioId) fetchTablero();
  }, [negocioId]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold">{resumen.turnosHoy}</div>
          <div className="text-gray-600">Turnos hoy</div>
        </div>
        <div className="bg-green-50 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold">{resumen.turnosSemana}</div>
          <div className="text-gray-600">Turnos semana</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold">{resumen.turnosMes}</div>
          <div className="text-gray-600">Turnos mes</div>
        </div>
        <div className="bg-red-50 p-4 rounded shadow text-center">
          <div className="text-3xl font-bold">{resumen.cancelados}</div>
          <div className="text-gray-600">Cancelados</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Clientes frecuentes</h3>
          <ul>
            {clientes.map((c, idx) => (
              <li key={idx} className="mb-2 flex justify-between">
                <span>{c.nombre}</span>
                <span className="font-semibold">{c.totalTurnos} turnos</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Servicios más solicitados</h3>
          <ul>
            {serviciosRanking.map((s, idx) => (
              <li key={idx} className="mb-2 flex justify-between">
                <span>{s.nombre}</span>
                <span className="font-semibold">{s.cantidad}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">Próximos turnos</h3>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Cliente</th>
              <th className="px-4 py-2 border">Servicio</th>
              <th className="px-4 py-2 border">Hora</th>
            </tr>
          </thead>
          <tbody>
            {proximosTurnos.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-4 text-gray-500">No hay turnos próximos</td></tr>
            ) : (
              proximosTurnos.map((t, idx) => (
                <tr key={idx} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border">{t.cliente}</td>
                  <td className="px-4 py-2 border">{t.servicio}</td>
                  <td className="px-4 py-2 border">{t.hora}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusinessTablero;
