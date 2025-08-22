"use client"; 

import { useState } from "react";
import { IoIosMusicalNote, IoIosRadio } from "react-icons/io";
import "../walkthrough/walkthrough.scss";
import { FaHeart } from "react-icons/fa";
import Link from 'next/link';
import Image from "next/image";
import Wavy from "@/imgs/gradientwavy.svg"




function WalkTrough() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Where Words Fail,\nMusic Speaks",
            content: "Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam justo. Vestibulum pellentesque lacinia eleifend."
        },
        {
            title: "No Music\nNo Life",
            content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, eius! Lorem ipsum dolor sit amet. Lorem. elf."
        },
        {
            title: "Peace.Love\nMusic",
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit delectus praesentium accusantium commodi, hi."
        }
    ];

    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
    };

    return (
       <>
       <header className="walktrough__header">
        <Image src={Wavy} alt="wave" width={400} height={400} />
       </header>
      <main>
       <section className="walkthrough__content">
        <div className="slider">
            <div 
                className="slides-container" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        <h2>{slide.title}</h2>
                        <p>{slide.content}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="navigation">
            <div 
                className={`nav-item ${currentSlide === 0 ? 'active' : ''}`}
                onClick={() => goToSlide(0)}
            >
                <IoIosRadio />
            </div>

            <div 
                className={`nav-item ${currentSlide === 1 ? 'active' : ''}`}
                onClick={() => goToSlide(1)}
            >
                <FaHeart />
            </div>

            <div 
                className={`nav-item ${currentSlide === 2 ? 'active' : ''}`}
                onClick={() => goToSlide(2)}
            >
                <IoIosMusicalNote />
            </div>
        </div>
        <Link className="skip" href="/featured">Skip</Link>
       </section>
</main>
       </>
    );
}

export default WalkTrough;
