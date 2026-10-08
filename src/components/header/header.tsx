import { FC, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './header.scss';

interface IHeaderProps {
  title: string;
  record?: boolean;
  confirm?: boolean;
}

const PublicHeader: FC<IHeaderProps> = ({title,record,confirm}) => {
  // 导航栏是否显示
  const [navState, setNavState] = useState(false)
  // CSSTransition 的目标节点，避免内部使用 findDOMNode
  const navRef = useRef<HTMLElement>(null)

  // 切换左侧导航栏状态
  const toggleNav = () => {
    setNavState(!navState);
  }
  return(
      <header className="header-container">
        <span className="header-slide-icon icon-catalog" onClick={toggleNav}></span>
        <span className="header-title">{title}</span>
        {
            record&&<NavLink to="/record" exact className="header-link icon-jilu"></NavLink>
        }
        {
            confirm&&<NavLink to="/" exact className="header-link header-link-confim">确定</NavLink>
        }
        <CSSTransition in={navState} timeout={300} classNames="nav" nodeRef={navRef} unmountOnExit>
          <aside ref={navRef} className="nav-slide-list" onClick={toggleNav}>
            <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">首页</NavLink>
            <NavLink to="/balance" exact className="nav-link icon-jiantou-copy-copy">提现</NavLink>
            <NavLink to="/helpcenter" exact className="nav-link icon-jiantou-copy-copy">帮助中心</NavLink>
          </aside>
        </CSSTransition>
      </header>
  );
}
export default PublicHeader;