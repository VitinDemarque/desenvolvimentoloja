
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { ReactNode } from 'react';

interface TransitionLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TransitionLink({ to, children, className, style }: TransitionLinkProps) {
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === to) return;

    showLoading();
    
    // Simulate loading delay for smooth transition effect
    setTimeout(() => {
      navigate(to);
      // Optional: hideLoading() is not called here if we want the next page to turn it off 
      // when it's ready, but since we don't have real page load events, we hide it after nav.
      // A slightly longer timeout or useEffect on location change in App could handle this.
      // For now, we hide it shortly after navigation to simulate "loaded".
      setTimeout(() => hideLoading(), 500); 
    }, 400); // 400ms loading before switch
  };

  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
}

// Hook to wrap navigate function
export function useTransitionNavigate() {
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  return (to: string) => {
    showLoading();
    setTimeout(() => {
      navigate(to);
      setTimeout(() => hideLoading(), 500);
    }, 400);
  };
}
