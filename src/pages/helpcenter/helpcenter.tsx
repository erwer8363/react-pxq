import PublicHeader from '@/components/header/header';
import './helpcenter.scss';

export default function HelpCenter() {

  return (
      <main>
        <PublicHeader title="帮助中心" record />
        <article className="context-con">
          <h2>介绍</h2>
          <p>本项目最初用于理解 react 和 redux 的编译方式，现已改造为 hooks + TypeScript + jotai 的实现</p>
          <h2>技术要点</h2>
          <p>react：v18</p>
          <p>jotai：v3</p>
          <p>react-router：v7</p>
          <p>TypeScript：v6</p>
          <p>vite：v7</p>
          <p>axios：v1</p>
          <p>sass</p>
          <p>项目地址 <a href="https://github.com/bailicangdu/react-pxq">github</a></p>
        </article>
      </main>
  )
}