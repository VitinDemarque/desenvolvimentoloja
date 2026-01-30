
import { useLoading } from '../context/LoadingContext';
import { useEffect } from 'react';

export default function GlobalLoader() {
  const { isLoading } = useLoading();
  
  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(11, 15, 20, 0.95)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(8px)',
      transition: 'opacity 0.3s ease-in-out'
    }}>
      <div className="loader-container" style={{ position: 'relative', width: '80px', height: '80px' }}>
        {/* Spinner Ring */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '4px solid transparent',
          borderTopColor: '#facc15', // Primary Gold
          borderRightColor: '#0ea5e9', // Secondary Blue
          animation: 'spin 1s linear infinite'
        }}></div>
        
        {/* Inner V7 Logo */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          fontWeight: '900',
          fontSize: '24px',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-1px'
        }}>
          V7
        </div>
      </div>
      <div style={{ 
        marginTop: '24px', 
        color: '#e6e9ef', 
        fontSize: '16px', 
        fontWeight: '500',
        letterSpacing: '0.5px',
        animation: 'pulse 1.5s ease-in-out infinite'
      }}>
        Carregando...
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
