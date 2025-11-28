import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import TerminosCondiciones from '../TerminosCondiciones/TerminosCondiciones';
import './LoginForm.css';

const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [terminosVisible, setTerminosVisible] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar email
    if (!formData.email) {
      newErrors.email = 'El correo institucional es requerido';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Ingresa un correo válido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validar términos
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debe aceptar la política de tratamiento de datos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        email: formData.email,
        password: formData.password
      });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__content">
        <Input
          type="email"
          name="email"
          label="Correo institucional"
          placeholder="correo@ueb.edu.ec"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          error={errors.email}
          disabled={isLoading}
          icon="email"
        />

        <Input
          type="password"
          name="password"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          value={formData.password}
          onChange={(value) => handleChange('password', value)}
          error={errors.password}
          disabled={isLoading}
          icon="lock"
        />

        <div style={{ marginTop: '8px', marginBottom: '8px' }}>
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
        </div>

        <Button 
          type="submit" 
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Conectando...' : 'Conectarse'}
        </Button>
      </div>

      {/* MODAL DE TÉRMINOS Y CONDICIONES */}
      <TerminosCondiciones 
        visible={terminosVisible} 
        onClose={() => setTerminosVisible(false)} 
      />
    </form>
  );
};

export default LoginForm;
