import { useEffect, useState } from "react";

function BusinessClientesList({ negocioId }) {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClientes() {
      setLoading(true);
      setError(null);
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        let realNegocioId = negocioId;
        // Si negocioId parece ser idUsuario, consulta el negocio
        if (!negocioId || typeof negocioId !== 'number' || negocioId < 100) {
          // Asume que es idUsuario, consulta el negocio
          const businessResponse = await fetch(`${API_URL}/negocio/usuario/${negocioId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetMethod: 'GET' })
          });
          const businessResult = await businessResponse.json();
          if (businessResult.success && businessResult.data && businessResult.data.length > 0) {
            realNegocioId = businessResult.data[0].idNegocio;
          } else {
            setError('No se encontró negocio para este usuario');
            setLoading(false);
            return;
          }
        }
        const response = await fetch(`${API_URL}/turnos/negocio/${realNegocioId}/clientes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetMethod: "GET" })
        });
        const result = await response.json();
        if (result.success) {
          setClientes(result.data);
        } else {
          setError(result.message || "Error al obtener clientes");
        }
      } catch (err) {
        setError("Error de conexión");
      }
      setLoading(false);
    }
    if (negocioId) fetchClientes();
  }, [negocioId]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Clientes del Negocio</h2>
      {loading && <div className="text-blue-600">Cargando clientes...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
        <table className="min-w-full border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Teléfono</th>
              <th className="px-4 py-2 border">Último turno</th>
              <th className="px-4 py-2 border">Total turnos</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">No hay clientes registrados</td>
              </tr>
            ) : (
              clientes.map(cliente => (
                <tr key={cliente.id} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border">{cliente.nombre}</td>
                  <td className="px-4 py-2 border">{cliente.email}</td>
                  <td className="px-4 py-2 border">{cliente.telefono}</td>
                  <td className="px-4 py-2 border">{cliente.ultimoTurno}</td>
                  <td className="px-4 py-2 border">{cliente.totalTurnos}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BusinessClientesList;
