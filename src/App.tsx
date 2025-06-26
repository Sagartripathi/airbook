import DisplayResults from "./_components/DisplayResults";
import FindFlight from "./_components/FlightResultCard";
import Navbar from "./_components/Navbar";
import SearchBar from "./_components/SearchBar";

function App() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <DisplayResults />
    </>
  );
}

export default App;
