import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={`button button--secondary button--lg ${styles.linkMargin}`}
            to="/docs/">
            阅读文档
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/tutorial">
            开始教程
          </Link>
        </div>

        <div className={styles.sandbox}>
          <iframe src="https://codesandbox.io/embed/cool-villani-b80ts?fontsize=14&hidenavigation=1&theme=dark"
            style={{ width: "100%", height: 500, border: 0, borderRadius: 4, overflow: "hidden" }}
            title="cool-villani-b80ts"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  React.useEffect(() => {
    var hm = window.document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?3787670caff23f077f9aa40c32a8e3c8";
    window.document.body.appendChild(hm);
    var a = window.document.createElement("a");
    a.href = 'http://beian.miit.gov.cn';
    a.innerHTML = '京ICP备19003167号-2';
    window.document.body.appendChild(a);
  }, []);
  return (
    <Layout
      title={`React路由`}
      image={'https://www.reactrouter.cn/img/logo.png'}
      description="React路由,React路由第六版,React路由第6版,React路由中文,React Router,react-router,react-router-dom,react-router v6">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
