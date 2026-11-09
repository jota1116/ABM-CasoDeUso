import React, { useState, useEffect } from 'react';

const GestionPaises = () => {
  const [paises, setPaises] = useState([]);
  const [nombrePais, setNombrePais] = useState('');
  const [paisEnEdicion, setPaisEnEdicion] = useState(null);

  useEffect(() => {
    const paisesGuardados = JSON.parse(localStorage.getItem('listaPaises')) || [];
    setPaises(paisesGuardados);
  }, []);

  const actualizarAlmacenamiento = (nuevosPaises) => {
    setPaises(nuevosPaises);
    localStorage.setItem('listaPaises', JSON.stringify(nuevosPaises));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nombrePais.trim()) return;

    if (paisEnEdicion) {
      const paisesActualizados = paises.map((p) =>
        p.id === paisEnEdicion.id ? { ...p, nombre: nombrePais } : p
      );
      actualizarAlmacenamiento(paisesActualizados);
      setPaisEnEdicion(null);
    } else {
      const nuevoPais = { id: Date.now(), nombre: nombrePais };
      actualizarAlmacenamiento([...paises, nuevoPais]);
    }
    setNombrePais('');
  };

  const eliminarPais = (id) => {
    if(window.confirm('¿Estás seguro que deseas eliminar este país?')) {
      const paisesFiltrados = paises.filter((p) => p.id !== id);
      actualizarAlmacenamiento(paisesFiltrados);
    }
  };

  const prepararEdicion = (pais) => {
    setNombrePais(pais.nombre);
    setPaisEnEdicion(pais);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>ABM de Países</h2>
      <form onSubmit={manejarEnvio} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nombre del país"
          value={nombrePais}
          onChange={(e) => setNombrePais(e.target.value)}
          required
        />
        <button type="submit">
          {paisEnEdicion ? 'Modificar País' : 'Agregar País'}
        </button>
        {paisEnEdicion && (
          <button type="button" onClick={() => { setPaisEnEdicion(null); setNombrePais(''); }}>
            Cancelar
          </button>
        )}
      </form>
      <table border="1" width="100%" style={{ textAlign: 'left' }}>
        <thead>
          <tr>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paises.map((pais) => (
            <tr key={pais.id}>
              <td>{pais.nombre}</td>
              <td>
                <button onClick={() => prepararEdicion(pais)}>Editar</button>
                <button onClick={() => eliminarPais(pais.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {paises.length === 0 && (<tr><td colSpan="2">No hay países registrados.</td></tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default GestionPaises;
