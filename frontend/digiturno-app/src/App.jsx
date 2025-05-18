import GlobalRouter from './routes/GlobalRouter';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="bg-gray-50 font-sans">
      <GlobalRouter></GlobalRouter>
      <Footer />
    </div>
  );
}

export default App;