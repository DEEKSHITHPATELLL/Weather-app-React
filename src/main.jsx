
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Weather-app-React">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);