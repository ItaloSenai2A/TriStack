import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const Dashboard = () => {
  const temperatureData = [
    { name: '1m', value: 22 },
    { name: '2m', value: 24 },
    { name: '3m', value: 26 },
    { name: '4m', value: 25 },
    { name: '5m', value: 23 },
    { name: '6m', value: 27 },
  ];

  const soilMoistureData = [
    { name: '1m', value: 40 },
    { name: '2m', value: 45 },
    { name: '3m', value: 50 },
    { name: '4m', value: 48 },
    { name: '5m', value: 52 },
    { name: '6m', value: 55 },
  ];

  const lightIntensityData = [
    { name: '1hr', blue: 300, green: 250 },
    { name: '2hr', blue: 320, green: 270 },
    { name: '3hr', blue: 310, green: 260 },
    { name: '4hr', blue: 330, green: 280 },
    { name: '5hr', blue: 340, green: 290 },
    { name: '6hr', blue: 350, green: 300 },
  ];

  const airQualityColors = [
    { name: 'Boa', value: 33.3, color: '#00C49F' },
    { name: 'Moderada', value: 33.3, color: '#FFBB28' },
    { name: 'Ruim', value: 33.3, color: '#FF4C4C' },
  ];

  return (
    <div className="container py-4" style={{ paddingLeft: "230px" }}>
      <h2 className="mb-4 text-center">Painel Ambiental 🌿</h2>

      {/* Métricas */}
      <div className="row mb-4">
        {/* Nível de Água */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ height: '200px', padding: '20px' }}>
              <h5 className="card-title text-center" style={{ fontSize: '18px', marginBottom: '10px' }}>Nível de Água</h5>
              <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#007bff', margin: 0 }}>30%</p>
            </div>
          </div>
        </div>

        {/* Velocidade do Vento */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ height: '200px', padding: '20px' }}>
              <h5 className="card-title text-center" style={{ fontSize: '18px', marginBottom: '10px' }}>Velocidade do Vento</h5>
              <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#fd7e14', margin: 0 }}>60 Km/h</p>
            </div>
          </div>
        </div>

        {/* Qualidade do Ar */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body d-flex flex-column align-items-center justify-content-between" style={{ height: '200px' }}>
              <h5 className="card-title" style={{ marginBottom: '10px' }}>Qualidade do Ar</h5>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <PieChart width={120} height={120}>
                  <Pie
                    data={airQualityColors}
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                  >
                    {airQualityColors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  <p style={{ fontWeight: 'bold', color: '#3DD34C', margin: 0 }}>Boa</p>
                  <p style={{ fontWeight: 'bold', color: '#E5EF57', margin: 0 }}>Moderada</p>
                  <p style={{ fontWeight: 'bold', color: '#FF4C4C', margin: 0 }}>Ruim</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos em duas colunas */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Temperatura (°C)</h5>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={temperatureData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#dc3545" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Umidade do Solo (%)</h5>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={soilMoistureData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#198754" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Luz em largura total */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Intensidade de Luz</h5>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={lightIntensityData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="blue" fill="#0d6efd" />
                  <Bar dataKey="green" fill="#20c997" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
