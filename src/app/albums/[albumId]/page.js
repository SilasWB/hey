import { FiArrowLeft } from 'react-icons/fi';
import Footer from '../../components/navbars/navbarfooter';
import '../albumdetail/albumdetails.scss';
import NavBarHeaderNoSearch from '../../components/navbars/navbarheadernosearch';
import Image from 'next/image';

export async function generateMetadata({ params }) {
	const { albumId } = await params;
	const cookieStore = await cookies();

	const access_token = cookieStore.get("ipm_access_token");

	const response = await fetch("https://api.spotify.com/v1/albums/" + albumId, {
		headers: {
			Authorization: "Bearer " + access_token.value
		}
	});

	const data = await response.json();

	return {
    title: data.name
  }
}


function AlbumDetails() {
  return (
    <>
      <NavBarHeaderNoSearch title="Album" />

      <section className="album-header">
        <div className="album-image-wrapper">
          <Image src="https://placehold.co/300x300" alt="Album Cover" />
          <div className="overlay-text">
            <h2>{album.title}</h2>
            <p>{album.totalSongs} Songs</p>
            <div className="tags">
              {album.tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="album-songs">
        <h3>All Songs</h3>
        {album.songs.map((song, i) => (
          <div key={i} className="album-song">
            <div className="info">
              <Image src="src/imgs/playbutton.svg" alt="Play" />
              <div>
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
              </div>
            </div>
            <span>{song.duration}</span>
          </div>
        ))}
      </main>

      <Footer />
    </>
  );
}

export default AlbumDetails;
