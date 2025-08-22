import { useEffect, useState } from "react";
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

// Registrar los componentes necesarios para Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function BusinessTurnosCanceladosCharts({ stats }) {
  // Pie chart: cancelaciones por servicio
  const pieData = {
    labels: stats.porServicio.map(s => s.servicio),
    datasets: [{
      data: stats.porServicio.map(s => s.cantidad),
      backgroundColor: ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"]
    }]
  };
  // Bar chart: cancelaciones por usuario
  const barData = {
    labels: stats.porUsuario.map(u => u.usuario),
    datasets: [{
      label: "Cancelaciones",
      data: stats.porUsuario.map(u => u.cantidad),
      backgroundColor: "#f87171"
    }]
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-bold mb-4">Cancelaciones por servicio</h4>
        <Pie data={pieData} key={JSON.stringify(pieData) + '-pie'} />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-bold mb-4">Cancelaciones por usuario</h4>
        <Bar data={barData} key={JSON.stringify(barData) + '-bar'} />
      </div>
    </div>
  );
}

export default BusinessTurnosCanceladosCharts;
