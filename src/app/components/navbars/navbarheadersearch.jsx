import "../../style/navbarheadersearch.scss";
import { FiSearch, FiArrowLeft } from 'react-icons/fi';
import DripWave from '@/imgs/dripwave.svg';
import Image from "next/image";

function NavBarHeaderSearch({ title }) {
    return (
        <>
        <header className={`search-header ${title === "Playlists" ? "playlist-header" : ""}`}>
          
            {title === "Playlists" && <Image className="search-header-wave" src={DripWave} alt="Drip Wave" />}
             <section className="search-header-section"> 
                <FiArrowLeft className="icon" />
            <h2 className="title">{title}</h2>
            <FiSearch className="icon" />
          </section>
        </header>
        </>
    );
}

export default NavBarHeaderSearch;