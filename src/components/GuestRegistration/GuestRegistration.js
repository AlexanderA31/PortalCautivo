import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import TerminosCondiciones from '../TerminosCondiciones/TerminosCondiciones';
import './GuestRegistration.css';

const GuestRegistration = ({ onSubmit, onBack, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    identification: '',
    reason: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [terminosVisible, setTerminosVisible] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre completo es requerido';
    }

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo válido';
    }

    if (!formData.phone) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Ingresa un teléfono válido (10 dígitos)';
    }

    if (!formData.identification) {
      newErrors.identification = 'La cédula/pasaporte es requerida';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Debes indicar el motivo de tu visita';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="guest-registration">
        <div className="guest-registration__header">
          <h2>Registro de Invitados</h2>
          <p className="guest-registration__subtitle">
            Por favor, completa el siguiente formulario para acceder a la red como invitado.
          </p>
        </div>

      <form className="guest-registration__form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          label="Nombre Completo"
          placeholder="Ej: Juan Pérez González"
          value={formData.name}
          onChange={(value) => handleChange('name', value)}
          error={errors.name}
          disabled={isLoading}
        />

        <Input
          type="email"
          name="email"
          label="Correo Electrónico"
          placeholder="ejemplo@correo.com"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          error={errors.email}
          disabled={isLoading}
          icon="email"
        />

        <Input
          type="tel"
          name="phone"
          label="Teléfono"
          placeholder="0999999999"
          value={formData.phone}
          onChange={(value) => handleChange('phone', value)}
          error={errors.phone}
          disabled={isLoading}
        />

        <Input
          type="text"
          name="identification"
          label="Cédula / Pasaporte"
          placeholder="1234567890"
          value={formData.identification}
          onChange={(value) => handleChange('identification', value)}
          error={errors.identification}
          disabled={isLoading}
        />



        <Checkbox
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={(value) => handleChange('acceptTerms', value)}
          error={errors.acceptTerms}
          disabled={isLoading}
          label={
            <span style={{ 
              color: '#374151', 
              fontSize: '12px',
              fontWeight: '500',
              lineHeight: '1.5'
            }}>
              He leído y acepto la{' '}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setTerminosVisible(true);
                }}
                style={{
                  color: '#16a34a',
                  fontWeight: '600',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Política de Tratamiento de Datos
              </a>
              {' '}y <strong>autorizo</strong> el uso de mi información personal para los{' '}
              <strong>fines académicos y administrativos</strong> mencionados.
            </span>
          }
        />

        <Button 
          type="submit" 
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Registrando...' : 'Registrarme como Invitado'}
        </Button>

        {/* Botón para volver al login UEB */}
        <div className="guest-registration__ueb-access">
          <button 
            type="button"
            className="ueb-access__button"
            onClick={onBack}
            disabled={isLoading}
          >
            Acceder como UEB
          </button>
        </div>
      </form>

      <TerminosCondiciones 
        visible={terminosVisible} 
        onClose={() => setTerminosVisible(false)} 
      />
    </div>
  );
};

export default GuestRegistration;
