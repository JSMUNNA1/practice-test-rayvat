import { QueryProvider } from './providers/QueryProvider';
import { StoreProvider } from './providers/StoreProvider';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <StoreProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </StoreProvider>
  );
}
