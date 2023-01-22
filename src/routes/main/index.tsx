import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/home';
import ResultPage from '../../pages/results';
const MainRoutes = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="">
          <Route path="" element={<HomePage />} />
          <Route
            path="/:cityOfOrigin/:intermediateCities/:cityOfDestination/:dateOfTheTrip/:numberOfPassengers"
            element={<HomePage />}
          />
        </Route>
        <Route
          path="results/:cityOfOrigin/:intermediateCities/:cityOfDestination/:dateOfTheTrip/:numberOfPassengers"
          element={<ResultPage />}
        />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
