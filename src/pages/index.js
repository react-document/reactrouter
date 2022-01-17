import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

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
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      image={'https://fanyi.baidu.com/appdownload/download.html?tab=app&appchannel=webbannerfinal&fr=pcproduct'}
      description="React Router v6 中文">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
