import '../albums/albums.scss';
import Footer from '../components/navbars/navbarfooter';
import NavBarHeaderSearch from '../components/navbars/navbarheadersearch';
import Image from 'next/image';

function Albums() {
  return (
    <>
      <NavBarHeaderSearch title="Music" />
      <main className="albums">
        <h1>All Albums</h1>

        <section className="albums__section">
          <div className="albums__section-title">
            <h3>Featured Albums</h3>
            <span>View All</span>
          </div>

          <div className="albums__carousel">
            {[
              "https://placehold.co/300x300",
              "https://placehold.co/300x300",
              "https://placehold.co/300x300"
            ].map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt="album"
                width={300}
                height={300}
              />
            ))}
          </div>
        </section>

        <section className="albums__section">
          <div className="albums__section-title">
            <h3>New Releases</h3>
            <span>View All</span>
          </div>

          <ul className="albums__list">
            {[
              ["Old Town Road", "Billy Ray Cyrus", "12 Songs"],
              ["Victory Lap", "Nipsey Hussle", "8 Songs"],
              ["Thank U, Next", "Ariana Grande", "13 Songs"],
              ["Death Race For Love", "Juice WRLD", "11 Songs"],
            ].map(([title, artist, songs], idx) => (
              <li key={idx} className="albums__item">
                <Image
                  src="https://placehold.co/45x45"
                  alt="cover"
                  width={45}
                  height={45}
                />
                <div>
                  <h4>{title}</h4>
                  <p>{artist}</p>
                </div>
                <span>{songs}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Albums;
