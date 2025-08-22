import Link from 'next/link';
import './intro.scss';
import Image from 'next/image';
import MusicLogoSolid from '@/imgs/music-logo-solid.svg'

function Intro() {
    return (
        <main>
        <Link href="/login">
            <div className="intro-container">
                <div className="intro-content">
                    <Image 
                        src={MusicLogoSolid} 
                        alt="iPlayMusic Logo" 
                        className="intro-logo"
                        width={400}
                        height={400}
                    /> 
                    <h1 className="intro-title">iPlayMusic</h1>
                </div>
            </div>
        </Link>
         </main>
    );
}

export default Intro;