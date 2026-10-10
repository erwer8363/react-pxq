import PublicHeader from '@/components/header/header';
import './record.scss';
import {NavLink, Outlet, useParams} from "react-router";

const FLAG_BAR_POS: Record<string, string> = {
  'passed':'17%',
  'audited':'50%',
  'failed':'83%',
}

const Record = () => {
  const {type = ''} = useParams()
  const flagBarPos = FLAG_BAR_POS[type] ?? '17%'

  return (
      <main className="common-con-top">
        <PublicHeader title='记录' />
        <section className="record-nav-con">
          <nav className="record-nav">
              <NavLink to="passed" className="nav-link">已通过</NavLink>
              <NavLink to="audited" className="nav-link">待审核</NavLink>
              <NavLink to="failed" className="nav-link">未通过</NavLink>
          </nav>
          <i className="nav-flag-bar" style={{left: flagBarPos}}></i>
        </section>
        <Outlet />
      </main>
  );
}

export default Record;
