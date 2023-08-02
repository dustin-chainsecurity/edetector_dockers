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
import Error404Page from './Page/ErrorPage/404Page';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {

  useEffect(() => {
    // console.log('fb app id', process.env.REACT_APP_ENV);
  }, [])

  return (
    <div>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/detect" element={<DetectPage />} />
                <Route path="/analysis" element={<AnalysisPage />} />
                <Route path="/error" element={<Error404Page />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />

            </Routes>
          </Router>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

    </div>
  );
}

export default App;

// 404 page
// 500 page
// 