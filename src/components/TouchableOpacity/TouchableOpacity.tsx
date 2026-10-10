import {FC, useState} from 'react';
import './TouchableOpacity.scss';

interface TouchableOpacityProps {
  clickCallBack?: ()=>void;
  text?: string;
  className?: string;
}
/**
 * 点击状态组件
 */
const TouchableOpacity: FC<TouchableOpacityProps> = ({text, className='', clickCallBack}) => {

  const [pressed, setPressed] = useState(false)

  return (
      <div className={`btn-con ${className}`}
           style={{opacity: pressed ? 0.3 : 1}}
           onTouchStart={() => setPressed(true)}
           onTouchEnd={()=>{setPressed(false); clickCallBack?.()}}
           onTouchCancel={()=> setPressed(false)}
      >
        {text || '确认'}
      </div>
  );
}
export default TouchableOpacity;