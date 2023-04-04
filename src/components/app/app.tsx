import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen';
import { IpcRenderer } from 'electron';
import StatsScreen from '../../pages/stats-screen';
import Results from '../../pages/results';

declare global {
  interface Window {
    require: (module: 'electron') => {
      ipcRenderer: IpcRenderer
    };
  }
}

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainScreen />} />
      <Route path={AppRoute.Stats} element={<StatsScreen />} />
      <Route path={`${AppRoute.Results}/:type`} element={<Results />} />
    </Routes>
  );
}

export default App;
