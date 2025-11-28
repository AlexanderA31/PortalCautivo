import React from 'react';
import './TerminosCondiciones.css';

const TerminosCondiciones = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        
        <div className="modal-content">
          <h2 className="modal-title">
            Autorización para el Tratamiento de Datos Personales
          </h2>

          <div className="info-box">
            <p>
              En cumplimiento a la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> de Ecuador,
              se requiere su consentimiento <strong>libre, específico, informado e inequívoco</strong> para el tratamiento de sus
              datos.
            </p>
          </div>

          <p className="modal-text">
            <strong>Finalidad del tratamiento:</strong> Sus datos serán tratados exclusivamente para <strong>fines académicos y
            administrativos</strong> relacionados con su participación y gestión dentro del sistema.
          </p>

          <p className="modal-text">
            Puede consultar el texto completo de la ley aquí:
            <br />
            <a 
              href="https://www.finanzaspopulares.gob.ec/wp-content/uploads/2021/07/ley_organica_de_proteccion_de_datos_personales.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              className="modal-link"
            >
              LEY ORGÁNICA DE PROTECCIÓN DE DATOS PERSONALES - LOPDP
            </a>
          </p>

          <div className="modal-footer-info">
            <p>
              Si rechaza el tratamiento, no podrá continuar el registro o acceso.
            </p>
          </div>

          <div className="modal-footer">
            <p>
              Universidad Estatal de Bolívar - Portal Cautivo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminosCondiciones;
