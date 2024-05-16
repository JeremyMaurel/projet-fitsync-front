import './Footer.scss';
import { Plus } from 'react-feather';
function Footer() {
return (
<footer className="footer">
<a className="footer--btn" href="#">
Dashboard
</a>
<a className="footer--btn" href="#">
Home
</a>
<a className="footer--btn" href="#">
<Plus className="footer--btn--plus" />
</a>
</footer>
);
}
export default Footer;