import {FC, useRef} from 'react';
import TouchableOpacity from '@/components/TouchableOpacity/TouchableOpacity';
import { CSSTransition } from 'react-transition-group';
import './alert.scss';

interface AlertProps {
  closeAlert: () => void;
  alertTip: string;
  alertStatus: boolean;
}

const Alert:FC<AlertProps> = ({closeAlert, alertTip, alertStatus}) => {

  // CSSTransition 的目标节点，避免内部使用 findDOMNode
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
      <CSSTransition in={alertStatus} timeout={300} classNames="alert" nodeRef={nodeRef} unmountOnExit>
        <div ref={nodeRef} className="alert-con">
          <div className="alert-context">
            <div className="alert-content-detail">{alertTip}</div>
            <TouchableOpacity className="confirm-btn" clickCallBack={closeAlert}/>
          </div>
        </div>
      </CSSTransition>
  );
}
export default Alert;