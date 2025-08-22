import { useState, useRef, useEffect } from 'react';
import '../style/playlists.scss';

import Footer from '../components/navbars/navbarfooter';
import NavBarHeaderSearch from '../components/navbars/navbarheadersearch';
import Image from 'next/image';

function Playlists() {
    const [activeSlide, setActiveSlide] = useState(1);
    const containerRef = useRef(null);

    const slides = [
        { id: 0, src: "https://placehold.co/155x155/FFF/FFFFFF/png", alt: "Slide 1" },
        { id: 1, src: "https://placehold.co/155x155/FFF/FFFFFF/png", alt: "Active" },
        { id: 2, src: "https://placehold.co/155x155/FFF/FFFFFF/png", alt: "Slide 3" },
    ];

    const handleSlideClick = (id) => {
        setActiveSlide(id);
    };

    return (
        <>
        <NavBarHeaderSearch title="Playlists" /> 
            <main className="playlist">
                <h1>Playlists</h1>
                <section className="playlist__carousel" ref={containerRef}>
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className={`playlist__carousel-item ${activeSlide === slide.id ? 'active' : ''}`}
                            onClick={() => handleSlideClick(slide.id)}
                        >
                            <Image src={slide.src} alt={slide.alt} />
                        </div>
                    ))}
                </section>

                <h2 className="playlist__title">
                    Top 50 <br />
                    <span>Rock Ballads</span>
                </h2>

                <section className="playlist__tracks">
                    {[
                        ["Old Town Road", "Billy Ray Cyrus", "3 : 58"],
                        ["Don’t Call Me Up", "Mabel", "2 : 46"],
                        ["Let Me Down Slowly", "Alec Benjamin", "4 : 12"],
                        ["Here With Me", "Marshmello", "3 : 37"],
                        ["Paradise", "Bazzi", "3 : 12"],
                        ["Let Me Down Slowly", "Alec Benjamin", "4 : 12"],
                        ["Here With Me", "Marshmello", "3 : 37"],
                        ["Paradise", "Bazzi", "3 : 12"],
                    ].map(([title, artist, duration], idx) => (
                        <article key={idx} className="playlist__track">
                            <div className="playlist__track-left">
                                <Image src="src/imgs/playbutton.svg" alt='Playbutton' className="playlist__track-icon" />
                                <div>
                                    <h3>{title}</h3>
                                    <p>{artist}</p>
                                </div>
                            </div>
                            <span className="playlist__track-duration">{duration}</span>
                        </article>
                    ))}
                </section>

                <button className="playlist__listen-all">LISTEN ALL</button>
            </main>
            <Footer />
        </>
    );
}

export default Playlists;
