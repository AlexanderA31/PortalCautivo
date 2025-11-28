import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import Logo from '../Logo/Logo';
import './CaptivePortal.css';

const CaptivePortal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    
    // Simulación de petición al servidor
    // Aquí iría la lógica real de autenticación
    try {
      console.log('Credenciales:', credentials);
      
      // Simular delay de petición
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí implementarías la lógica real de autenticación
      // Por ejemplo: await fetch('/api/auth', { method: 'POST', body: JSON.stringify(credentials) })
      
      // Redirigir a la página de la UEB después de la autenticación exitosa
      window.location.href = 'https://ueb.edu.ec/';
      
    } catch (error) {
      console.error('Error de autenticación:', error);
      alert('Error al conectar. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="captive-portal">
      <div className="captive-portal__background">
        <div className="captive-portal__overlay"></div>
      </div>
      
      <div className="captive-portal__content">
        <div className="captive-portal__card">
          <div className="captive-portal__header">
            <Logo />
            <h1 className="captive-portal__title">Portal Cautivo</h1>
            <p className="captive-portal__welcome">Le damos la bienvenida.</p>
            <p className="captive-portal__description">
              Para conectarse a la red UEB, por favor inicie sesión
              usando su correo y contraseña institucional.
            </p>
          </div>

          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default CaptivePortal;
