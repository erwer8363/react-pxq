import {FC, useState} from 'react';
import './TouchableOpacity.scss';

interface TouchableOpacityProps {
  clickCallBack?: () => void;
  text?: string;
  className?: string;
}
/**
 * 点击状态组件：按下时变淡，点击触发回调
 * 按下状态用 Pointer Events（鼠标 + 触摸通用），点击用 onClick
 */
const TouchableOpacity: FC<TouchableOpacityProps> = ({text, className = '', clickCallBack}) => {
  const [pressed, setPressed] = useState(false)
  const release = () => setPressed(false)

  return (
      <div className={`btn-con ${className}`}
           style={{opacity: pressed ? 0.3 : 1}}
           onPointerDown={() => setPressed(true)}
           onPointerUp={release}
           onPointerLeave={release}
           onPointerCancel={release}
           onClick={() => clickCallBack?.()}
      >
        {text || '确认'}
      </div>
  );
}
export default TouchableOpacity;
