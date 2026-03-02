import { useAppContext } from '../../context/AppContext';
import { HomePage } from './HomePage';
import { GuardianHome } from '../guardian/GuardianHome';
import { CoordinatorHome } from '../coordinator/CoordinatorHome';

export function HomeRouter() {
  const { mode } = useAppContext();

  switch (mode) {
    case 'guardian':
      return <GuardianHome />;
    case 'coordinator':
      return <CoordinatorHome />;
    default:
      return <HomePage />;
  }
}
