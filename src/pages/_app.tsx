import 'src/styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from 'src/components/Layout/Layout';
import FavoritesProvider from 'src/components/contexts/FavoritesContext';
import ModalProvider from 'src/components/contexts/ModalContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <ModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalProvider>
    </FavoritesProvider>
  );
}
