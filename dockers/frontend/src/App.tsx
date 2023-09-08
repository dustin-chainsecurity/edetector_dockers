import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// global value provider
import AuthProvider from './AppContext/AuthProvider';

// page components
import HomePage from './Page/HomePage';
import DetectPage from './Page/DetectPage';
import ErrorPage from './Page/ErrorPage/ErrorPage';
import LoginPage from './Page/LoginPage';
import AnalysisPage from './Page/AnalysisPage';
import ProtectedRoutes from './utiles/ProtectedRoutes';
import { Suspense, lazy, useEffect, useState } from 'react';
import SettingPage from './Page/SettingPage';
import Error404Page from './Page/ErrorPage/404Page';

import SettingSystem from './Components/SettingPage/SettingChildPage/SettingSystem/SettingSystem';
import SettingGroup from './Components/SettingPage/SettingChildPage/SettingGroup/SettingGroup';
import SettingAgentRemove from './Components/SettingPage/SettingChildPage/SettingAgentRemove/SettingAgentRemove';
import SettingDailyLog from './Components/SettingPage/SettingChildPage/SettingDailyLog/SettingDailyLog';
import SettingImage from './Components/SettingPage/SettingChildPage/SettingImage/SettingImage';
import SettingServer from './Components/SettingPage/SettingChildPage/SettingServer/SettingServer';
import SettingUserPermission from './Components/SettingPage/SettingChildPage/SettingUserPermission/SettingUserPermission';
import SettingVersion from './Components/SettingPage/SettingChildPage/SettingVersion/SettingVersion';
import SettingWhiteList from './Components/SettingPage/SettingChildPage/SettingWhiteList/SettingWhiteList';
import { AlertProvider } from './AppContext/AlertProvider';

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = lazy(() =>
import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
  (d) => ({
    default: d.ReactQueryDevtools,
  }),
),
)

function App() {
  const [showDevtools, setShowDevtools] = useState(false)


  useEffect(() => {
    console.log('fb app id', process.env.REACT_APP_ENV);
    console.log('fb app is production', process.env.REACT_APP_IS_PRODUCTION);
     // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old)

    if(process.env.REACT_APP_IS_PRODUCTION === 'true'){
      console.log = () => { };
      console.warn = () => { };
      setShowDevtools(false)
    }

  }, [])

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <div >
      <AlertProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/detect" element={<DetectPage />} />
                <Route path="analysis" element={<AnalysisPage />} />

                <Route path="/setting" element={<SettingPage />}>
                  <Route path="SettingSystem" element={<SettingSystem />} />
                  <Route path="SettingGroup" element={<SettingGroup />} />
                  <Route path="SettingAgentRemove" element={<SettingAgentRemove />} />
                  <Route path="SettingDailyLog" element={<SettingDailyLog />} />
                  <Route path="SettingServer" element={<SettingServer />} />
                  <Route path="SettingUserPermission" element={<SettingUserPermission />} />
                  <Route path="SettingVersion" element={<SettingVersion />} />
                  <Route path="SettingWhiteList" element={<SettingWhiteList />} />
                  <Route path="SettingImage" element={<SettingImage />} />
                  <Route path="*" element={<Error404Page />} />
                </Route>

                <Route path="/error" element={<Error404Page />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />

            </Routes>
          </Router>
        </AuthProvider>
        {!showDevtools && ( <ReactQueryDevtools initialIsOpen={false} />)}
        {showDevtools && (
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </Suspense>
      )}
      </QueryClientProvider>
      </AlertProvider>
    </div>
  );
}

export default App;

// 404 page
// 500 page
// 