import { Plus } from 'react-feather';
import './CtaAdd.scss';

export default function CtaAdd() {
  return (
    <div className="cta">
      <div className="cta--container">
        <h2 className="cta--title">Add Activity</h2>
      </div>
      <Plus size={30} className="cta--action-icon" />
    </div>
  );
}
