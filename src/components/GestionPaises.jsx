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

  const styles = {
    container: { fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', maxWidth: '600px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    title: { color: '#2c3e50', marginBottom: '24px', fontSize: '24px', fontWeight: '600' },
    form: { display: 'flex', gap: '10px', marginBottom: '30px' },
    input: { flex: 1, padding: '12px', border: '1px solid #dcdde1', borderRadius: '6px', fontSize: '14px', outline: 'none' },
    btnPrimary: { padding: '12px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', transition: '0.2s' },
    btnCancel: { padding: '12px 20px', backgroundColor: '#95a5a6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { backgroundColor: '#f5f6fa', color: '#2f3640', padding: '12px', textAlign: 'left', borderBottom: '2px solid #dcdde1' },
    td: { padding: '12px', borderBottom: '1px solid #f1f2f6', color: '#2f3640' },
    btnEdit: { padding: '6px 12px', backgroundColor: '#f39c12', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px', fontSize: '12px' },
    btnDelete: { padding: '6px 12px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
    emptyRow: { textAlign: 'center', padding: '20px', color: '#7f8fa6' }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestión de Países</h2>
      <form onSubmit={manejarEnvio} style={styles.form}>
        <input
          type="text"
          placeholder="Nombre del país"
          value={nombrePais}
          onChange={(e) => setNombrePais(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.btnPrimary}>
          {paisEnEdicion ? 'Guardar Cambios' : 'Agregar'}
        </button>
        {paisEnEdicion && (
          <button type="button" onClick={() => { setPaisEnEdicion(null); setNombrePais(''); }} style={styles.btnCancel}>
            Cancelar
          </button>
        )}
      </form>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>País</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paises.map((pais) => (
            <tr key={pais.id}>
              <td style={styles.td}>{pais.nombre}</td>
              <td style={styles.td}>
                <button onClick={() => prepararEdicion(pais)} style={styles.btnEdit}>Editar</button>
                <button onClick={() => eliminarPais(pais.id)} style={styles.btnDelete}>Eliminar</button>
              </td>
            </tr>
          ))}
          {paises.length === 0 && (
            <tr><td colSpan="2" style={styles.emptyRow}>No hay países registrados.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GestionPaises;
