import { useState, useEffect } from "react";

function BusinessAjustes({ business, onUpdate }) {
  const [info, setInfo] = useState({
    name: business?.name || "",
    address: business?.address || "",
    phone: business?.phone || "",
    email: business?.email || "",
    logo: business?.logo || ""
  });
  const [horario, setHorario] = useState({
    dias: business?.dias || ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    apertura: business?.apertura || "09:00",
    cierre: business?.cierre || "18:00",
    duracionTurno: business?.duracionTurno || 30
  });
  const [servicios, setServicios] = useState([]);
  const [editServicio, setEditServicio] = useState(null);
  const [loadingServicios, setLoadingServicios] = useState(false);
  const [errorServicios, setErrorServicios] = useState(null);

  // Obtener servicios del backend al montar
  useEffect(() => {
    async function fetchServicios() {
      setLoadingServicios(true);
      setErrorServicios(null);
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const negocioId = business?.idNegocio || business?.id;
        if (!negocioId) return;
        const response = await fetch(`${API_URL}/negocio/${negocioId}/servicios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetMethod: "GET" })
        });
        const result = await response.json();
        if (Array.isArray(result)) {
          setServicios(result);
        } else if (Array.isArray(result.data)) {
          setServicios(result.data);
        } else {
          setServicios([]);
        }
      } catch (err) {
        setErrorServicios("Error al obtener servicios");
        setServicios([]);
      }
      setLoadingServicios(false);
    }
    fetchServicios();
  }, [business?.idNegocio, business?.id]);

  // Simulación de actualización
  const handleUpdateInfo = () => {
    if (onUpdate) onUpdate({ ...info });
    alert("Datos del negocio actualizados");
  };
  const handleUpdateHorario = () => {
    if (onUpdate) onUpdate({ ...horario });
    alert("Horario actualizado");
  };
  const handleAddServicio = () => {
    setEditServicio({ nombre: "", descripcion: "", precio: 0, duracion: 30 });
  };

  // Guardar nuevo servicio en el backend
  const handleSaveServicio = async (servicio) => {
    setLoadingServicios(true);
    setErrorServicios(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const negocioId = business?.idNegocio || business?.id;
      if (!negocioId) throw new Error("No se encontró el id del negocio");
      const requestData = {
        targetMethod: "POST",
        body: {
          nombre: servicio.nombre,
          descripcion: servicio.descripcion,
          precio: servicio.precio,
          duracionMin: servicio.duracion
        }
      };
      const response = await fetch(`${API_URL}/negocio/${negocioId}/servicios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });
      const result = await response.json();
      if (result && result.success) {
        // Recargar servicios
        setEditServicio(null);
        // Vuelve a consultar los servicios
        const serviciosResponse = await fetch(`${API_URL}/negocio/${negocioId}/servicios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetMethod: "GET" })
        });
        const serviciosResult = await serviciosResponse.json();
        if (Array.isArray(serviciosResult)) {
          setServicios(serviciosResult);
        } else if (Array.isArray(serviciosResult.data)) {
          setServicios(serviciosResult.data);
        }
      } else {
        setErrorServicios(result.message || "Error al guardar servicio");
      }
    } catch (err) {
      setErrorServicios("Error de conexión al guardar servicio");
    }
    setLoadingServicios(false);
  };

  // Eliminar servicio en el backend
  const handleDeleteServicio = async (servicioId) => {
    setLoadingServicios(true);
    setErrorServicios(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const negocioId = business?.idNegocio || business?.id;
      if (!negocioId) throw new Error("No se encontró el id del negocio");
      const requestData = {
        targetMethod: "DELETE"
      };
      const response = await fetch(`${API_URL}/negocio/${negocioId}/servicios/${servicioId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });
      const result = await response.json();
      if (result && result.success) {
        // Recargar servicios
        const serviciosResponse = await fetch(`${API_URL}/negocio/${negocioId}/servicios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetMethod: "GET" })
        });
        const serviciosResult = await serviciosResponse.json();
        if (Array.isArray(serviciosResult)) {
          setServicios(serviciosResult);
        } else if (Array.isArray(serviciosResult.data)) {
          setServicios(serviciosResult.data);
        }
      } else {
        setErrorServicios(result.message || "Error al eliminar servicio");
      }
    } catch (err) {
      setErrorServicios("Error de conexión al eliminar servicio");
    }
    setLoadingServicios(false);
  };
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Datos del Negocio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nombre" value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} className="border rounded px-3 py-2" />
          <input type="text" placeholder="Dirección" value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} className="border rounded px-3 py-2" />
          <input type="text" placeholder="Teléfono" value={info.phone} onChange={e => setInfo({ ...info, phone: e.target.value })} className="border rounded px-3 py-2" />
          <input type="email" placeholder="Email" value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} className="border rounded px-3 py-2" />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpdateInfo}>Guardar cambios</button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Horario de Atención</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select value={horario.apertura} onChange={e => setHorario({ ...horario, apertura: e.target.value })} className="border rounded px-3 py-2">
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
          </select>
          <select value={horario.cierre} onChange={e => setHorario({ ...horario, cierre: e.target.value })} className="border rounded px-3 py-2">
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
          </select>
          <input type="number" min={15} max={120} value={horario.duracionTurno} onChange={e => setHorario({ ...horario, duracionTurno: Number(e.target.value) })} className="border rounded px-3 py-2" placeholder="Duración del turno (min)" />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpdateHorario}>Guardar horario</button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Servicios</h3>
        <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded" onClick={handleAddServicio}>Agregar servicio</button>
        <table className="min-w-full border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Descripción</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Duración</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loadingServicios ? (
              <tr><td colSpan={5} className="text-center py-4 text-blue-600">Cargando servicios...</td></tr>
            ) : servicios.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-4 text-gray-500">No hay servicios registrados</td></tr>
            ) : (
              servicios.map((serv, idx) => (
                <tr key={serv.idServicio || serv.id || idx} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border">{serv.nombreServicio || serv.nombre}</td>
                  <td className="px-4 py-2 border">{serv.descripcion || ''}</td>
                  <td className="px-4 py-2 border">${serv.precio}</td>
                  <td className="px-4 py-2 border">{serv.duracionMin || serv.duracion} min</td>
                  <td className="px-4 py-2 border">
                    <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDeleteServicio(serv.idServicio || serv.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {editServicio && (
          <div className="bg-gray-50 p-4 rounded shadow mb-4">
            <h4 className="font-bold mb-2">Nuevo servicio</h4>
            <input type="text" placeholder="Nombre" value={editServicio.nombre} onChange={e => setEditServicio({ ...editServicio, nombre: e.target.value })} className="border rounded px-3 py-2 mb-2 w-full" />
            <input type="text" placeholder="Descripción" value={editServicio.descripcion} onChange={e => setEditServicio({ ...editServicio, descripcion: e.target.value })} className="border rounded px-3 py-2 mb-2 w-full" />
            <input type="number" placeholder="Precio" value={editServicio.precio} onChange={e => setEditServicio({ ...editServicio, precio: Number(e.target.value) })} className="border rounded px-3 py-2 mb-2 w-full" />
            <input type="number" placeholder="Duración (min)" value={editServicio.duracion} onChange={e => setEditServicio({ ...editServicio, duracion: Number(e.target.value) })} className="border rounded px-3 py-2 mb-2 w-full" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleSaveServicio(editServicio)}>Guardar servicio</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessAjustes;
