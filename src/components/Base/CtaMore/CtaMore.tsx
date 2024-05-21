import { Plus } from 'react-feather';
import './CtaMore.scss';

export default function CtaMore() {
  return (
    <div className="cta">
      <div className="cta--container">
        <h2 className="cta--title">More</h2>
      </div>
      <Plus size={30} className="cta--action-icon" />
    </div>
  );
}
