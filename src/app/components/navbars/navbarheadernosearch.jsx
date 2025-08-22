import '../../style/navbarheadernosearch.scss';
import { FiArrowLeft } from 'react-icons/fi';

function NavBarHeaderNoSearch({ title }) {
    return (
        <header className="nobarsearch-header">
            <FiArrowLeft className="nobaricon" />
            <h2 className="nobartitle">{title}</h2>
        </header>
    );
}

export default NavBarHeaderNoSearch;