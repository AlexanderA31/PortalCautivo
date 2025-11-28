/**
 * Servicio de Autenticación para el Portal Cautivo
 * Maneja login, registro de invitados y validaciones
 */

class AuthService {
  constructor() {
    this.API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
    this.MAX_LOGIN_ATTEMPTS = 5;
    this.LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutos
  }

  /**
   * Verifica los intentos de login fallidos
   */
  checkLoginAttempts() {
    const attempts = localStorage.getItem('login_attempts');
    const lockoutUntil = localStorage.getItem('lockout_until');

    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil);
      if (Date.now() < lockoutTime) {
        const remainingMinutes = Math.ceil((lockoutTime - Date.now()) / 60000);
        throw new Error(`Cuenta bloqueada. Intente nuevamente en ${remainingMinutes} minutos.`);
      } else {
        // El bloqueo ha expirado
        localStorage.removeItem('lockout_until');
        localStorage.removeItem('login_attempts');
      }
    }

    return attempts ? parseInt(attempts) : 0;
  }

  /**
   * Registra un intento fallido de login
   */
  recordFailedAttempt() {
    const attempts = this.checkLoginAttempts() + 1;
    localStorage.setItem('login_attempts', attempts.toString());

    if (attempts >= this.MAX_LOGIN_ATTEMPTS) {
      const lockoutUntil = Date.now() + this.LOCKOUT_TIME;
      localStorage.setItem('lockout_until', lockoutUntil.toString());
      throw new Error('Demasiados intentos fallidos. Cuenta bloqueada por 15 minutos.');
    }

    return attempts;
  }

  /**
   * Limpia los intentos de login después de un login exitoso
   */
  clearLoginAttempts() {
    localStorage.removeItem('login_attempts');
    localStorage.removeItem('lockout_until');
  }

  /**
   * Autentica al usuario en el portal cautivo
   */
  async login(credentials) {
    try {
      // Verificar intentos de login
      this.checkLoginAttempts();

      const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        this.recordFailedAttempt();
        throw new Error(data.message || 'Credenciales inválidas');
      }

      // Login exitoso
      this.clearLoginAttempts();
      
      // Guardar token y datos de sesión
      this.setSession(data);

      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Establece la sesión del usuario
   */
  setSession(sessionData) {
    const session = {
      token: sessionData.token,
      user: sessionData.user,
      userType: sessionData.userType || 'invitado', // administrativo, estudiante, invitado
      loginTime: Date.now(),
      expiresIn: sessionData.expiresIn || 3600, // 1 hora por defecto
      macAddress: sessionData.macAddress,
      ipAddress: sessionData.ipAddress,
      hasTimeLimit: sessionData.userType === 'invitado', // Solo invitados tienen límite
    };

    localStorage.setItem('captive_portal_session', JSON.stringify(session));
    sessionStorage.setItem('authenticated', 'true');
  }

  /**
   * Obtiene la sesión actual
   */
  getSession() {
    const sessionStr = localStorage.getItem('captive_portal_session');
    if (!sessionStr) return null;

    try {
      return JSON.parse(sessionStr);
    } catch {
      return null;
    }
  }

  /**
   * Verifica si hay una sesión activa
   */
  isAuthenticated() {
    const session = this.getSession();
    return session !== null;
  }

  /**
   * Cierra la sesión del usuario
   */
  async logout() {
    try {
      const session = this.getSession();
      
      if (session && session.token) {
        await fetch(`${this.API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`,
          },
        });
      }
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar almacenamiento local
      localStorage.removeItem('captive_portal_session');
      sessionStorage.removeItem('authenticated');
    }
  }

  /**
   * Solicita recuperación de contraseña
   */
  async requestPasswordReset(email) {
    const response = await fetch(`${this.API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al solicitar recuperación de contraseña');
    }

    return data;
  }

  /**
   * Registra un nuevo usuario (auto-registro)
   */
  async register(userData) {
    const response = await fetch(`${this.API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    return data;
  }

  /**
   * Obtiene información del usuario actual
   */
  getCurrentUser() {
    const session = this.getSession();
    return session ? session.user : null;
  }
}

export default new AuthService();
