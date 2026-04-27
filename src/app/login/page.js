import LoginPageClient from '@/components/auth/LoginPageClient';

export const metadata = {
  title: 'Login | QuantumCrafters Studio',
  description: 'Secure login portal for QuantumCrafters Studio dashboards.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const LoginPage = () => <LoginPageClient />;

export default LoginPage;
