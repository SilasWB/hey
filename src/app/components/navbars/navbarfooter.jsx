import { IoMdPulse } from 'react-icons/io';
import { MdMic, MdWifiTethering, MdContrast, MdSettings } from 'react-icons/md';
import '../../style/footer.scss';
import Link from 'next/link';
import { redirect } from 'next/navigation';

function Footer() {


  return (
    <footer className="footer">
      <Link to="/categories">
        <IoMdPulse className={`footer-icon ${redirect.name === '/categories' ? 'active' : ''}`} />
      </Link>
      <Link to="/featured">
        <MdMic className={`footer-icon ${redirect.name === '/featured' ? 'active' : ''}`} />
      </Link>

      <div className="footer-center-icon">
        <MdWifiTethering className="footer-center-icon-inner" />
      </div>

      <MdContrast className="footer-icon darkmode" />
      <Link to="/settings">
        <MdSettings className={`footer-icon ${redirect.name === '/settings' ? 'active' : ''}`} />
      </Link>
    </footer>
  );
}

export default Footer;