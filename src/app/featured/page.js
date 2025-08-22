import Footer from '../components/navbars/navbarfooter';
import NavBarHeaderSearch from '../components/navbars/navbarheadersearch';
import "../featured/featured.scss";
import { cookies } from "next/headers";
import Image from "next/image";


async function Featured({ album }) {
const cookieStore = await cookies();

const access_token = cookieStore.get("ipm_access_token")
  const response = await fetch("https://api.spotify.com/v1/browse/new-releases", {
    headers: {
      "Authorization": `Bearer ${access_token.value}` 
    }
  });

  const data = await response.json();
console.log("data", data);

    return (
        <> 
        <NavBarHeaderSearch title="Featured" />
        <main className='featured'>
        <h1 className="featured__highlight">Featured</h1>

        <article className="featured__item">
            <div className="featured__image-wrapper">
                <Image unoptimized class="featured_image" src={album.images[0].url} width={album.images[0].width} height={album.images[0].height} alt={album.name} />
                <div className="featured__text">
                  	<h3 className='featured__title'>{album.name}</h3>
				<p className='featured__subtitle'>{album.album_type}</p>
                </div>
            </div>
        </article>
         </main>
         <Footer />
         </>
       
    );
}

export default Featured;
