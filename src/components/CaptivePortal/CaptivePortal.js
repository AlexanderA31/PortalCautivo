import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import GuestRegistration from '../GuestRegistration/GuestRegistration';
import Logo from '../Logo/Logo';
import AuthService from '../../services/AuthService';
import './CaptivePortal.css';

const CaptivePortal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showGuestRegistration, setShowGuestRegistration] = useState(false);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    
    try {
      console.log('Credenciales:', credentials);
      
      // Aquí iría la lógica real de autenticación con el servidor
      // const response = await AuthService.login(credentials);
      
      // Simulación temporal - REMOVER EN PRODUCCIÓN
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular respuesta del servidor
      const mockResponse = {
        token: 'mock_token_' + Date.now(),
        user: {
          name: credentials.email.split('@')[0],
          email: credentials.email,
        },
        userType: credentials.email.includes('@ueb.edu.ec') 
          ? (credentials.email.includes('estudiante') ? 'estudiante' : 'administrativo')
          : 'estudiante',
        expiresIn: 86400, // 24 horas para estudiantes y administrativos
        macAddress: '00:00:00:00:00:00',
        ipAddress: '192.168.1.100',
      };
      
      AuthService.setSession(mockResponse);
      
      // Redirigir a la página de la UEB
      window.location.href = 'https://ueb.edu.ec/';
      
    } catch (error) {
      console.error('Error de autenticación:', error);
      alert(error.message || 'Error al conectar. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestRegistration = async (guestData) => {
    setIsLoading(true);
    
    try {
      console.log('Datos de invitado:', guestData);
      
      // Aquí iría la lógica real de registro con el servidor
      // const response = await AuthService.register({ ...guestData, userType: 'invitado' });
      
      // Simulación temporal - REMOVER EN PRODUCCIÓN
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular respuesta del servidor para invitado
      const mockResponse = {
        token: 'guest_token_' + Date.now(),
        user: {
          name: guestData.name,
          email: guestData.email,
          phone: guestData.phone,
          identification: guestData.identification,
        },
        userType: 'invitado',
        expiresIn: 7200, // 2 horas para invitados
        macAddress: '00:00:00:00:00:00',
        ipAddress: '192.168.1.100',
      };
      
      AuthService.setSession(mockResponse);
      
      // Redirigir a la página de la UEB
      window.location.href = 'https://ueb.edu.ec/';
      
    } catch (error) {
      console.error('Error en registro:', error);
      alert(error.message || 'Error al registrar. Por favor, intenta nuevamente.');
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
          {/* Lado izquierdo - Siempre visible */}
          <div className="captive-portal__header">
            <Logo />
            <h1 className="captive-portal__title">Portal Cautivo</h1>
            <p className="captive-portal__welcome">Le damos la bienvenida.</p>
            <p className="captive-portal__description">
              Para conectarse a la red UEB, inicie sesión con su correo y contraseña institucional.
            </p>
          </div>

          {/* Lado derecho - Con animación flip */}
          <div className="captive-portal__form-container">
            <div className={`captive-portal__form-wrapper ${showGuestRegistration ? 'captive-portal__form-wrapper--flipped' : ''}`}>
              {/* Lado frontal - Login */}
              <div className="captive-portal__form-side captive-portal__form-side--front">
                <LoginForm 
                  onSubmit={handleLogin} 
                  isLoading={isLoading}
                  onGuestAccess={() => setShowGuestRegistration(true)}
                />
              </div>

              {/* Lado trasero - Registro de invitados */}
              <div className="captive-portal__form-side captive-portal__form-side--back">
                <GuestRegistration 
                  onSubmit={handleGuestRegistration}
                  onBack={() => setShowGuestRegistration(false)}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptivePortal;
