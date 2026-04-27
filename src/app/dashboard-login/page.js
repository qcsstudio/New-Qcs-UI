import LoginPageClient from '@/components/auth/LoginPageClient';

export const metadata = {
  title: 'Dashboard Login | QuantumCrafters Studio',
  description: 'Secure dashboard login for QuantumCrafters Studio.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const DashboardLoginPage = () => <LoginPageClient useTailwind />;

export default DashboardLoginPage;
