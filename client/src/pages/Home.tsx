<<<<<<< HEAD


const Home = () => {

  return (
    <main>
      <div className="flex-row justify-center">
      </div>
=======
import './Home.css'; // Custom styles for hover effects.

const Home = () => {
  return (
    <main>
      {/* Main Section */}
      <section className="section">
        <div className="container">
          {/* Welcome Message */}
          <h1 className="welcome-message">Welcome to OutSmart Gem</h1>

          {/* Game Boxes */}
          <div className="game-boxes">
            {/* Game Box 1 */}
            <div className="game-box">
              <p>GUESS WHO</p>
            </div>

            {/* Game Box 2 */}
            <div className="game-box">
              <p>STORYTELLER</p>
            </div>

            {/* Game Box 3 */}
            <div className="game-box">
              <p>IDENTIFY THE AI</p>
            </div>
          </div>
        </div>
      </section>
>>>>>>> ff2ff345ef7daf971bc321e98c232610791df6b5
    </main>
  );
};

export default Home;
