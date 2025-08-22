import { BsThreeDots } from 'react-icons/bs';
import Footer from '../components/navbars/navbarfooter';
import NavBarHeaderSearch from '../components/navbars/navbarheadersearch';
import '../style/categories.scss';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

function Categories() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { name: "Alternative", color: "#d70060", example: ["example", "example", "example"] },
        { name: "Blues", color: "#e54028", example: ["example", "example", "example"] },
        { name: "Classical", color: "#f18d05", example: ["example", "example", "example"] },
        { name: "Country", color: "#f2bc06", example: ["example", "example", "example"] },
        { name: "Dance", color: "#5eb11c", example: ["example", "example", "example"] },
        { name: "Electronic", color: "#3a7634", example: ["example", "example", "example"] },
        { name: "Fitness & Workout", color: "#0abebe", example: ["example", "example", "example"] },
        { name: "Hip-Hop/Rap", color: "#00a1cb", example: ["example", "example", "example"] },
        { name: "Industrial", color: "#115793", example: ["example", "example", "example"] }    
    ];

    const toggleDropdown = (index) => {
        setSelectedCategory(selectedCategory === index ? null : index);
    };

    return (
        <>
        <NavBarHeaderSearch title={"Categories"} />
         <main className="categories">
            <h1 className="categories__title">Categories</h1>
            <section className="categories__section">  
                          <article className="categories__list">
                              {categories.map((category, index) => (
                                  <div key={index}>
                                      <p className="categories__item" style={{ background: category.color }}>
                                          {category.name} 
                                          <span className="categories__dots" onClick={() => toggleDropdown(index)}>
                                              <BsThreeDots />
                                          </span>
                                      </p>
                                      {selectedCategory === index && (
                                          <div className="categories__dropdown">
                                              {category.example.map((item, i) => (
                                                  <div key={i} className="categories__dropdown-item">
                                                      {item}

                                                      <IoIosArrowForward />
                                                  </div>
                                              ))}
                                          </div>
                                      )}
                                  </div>
                              ))}                          
                              </article>                           
                              
            </section>

         </main>
         <Footer />
         </>
       
    );
}

export default Categories;