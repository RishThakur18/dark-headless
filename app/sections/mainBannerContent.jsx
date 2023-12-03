import { useEffect, useState } from 'react';
import styles from '../styles/mainBannerContent.css';

export function MainBannerContent() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {

    const header = document.querySelector('.header-wrapper');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  const calculateImageHeight = () => {
    return `calc(100vh - ${headerHeight}px)`;
  };

  return (
    <div className="main-banner-wrapper" style={{ height: calculateImageHeight() }}>
      <div className='banner-header'>
        <h1 data-text="EFFORTLESSLY ELEGANT">EFFORTLESSLY ELEGANT</h1>
      </div>

      <div>
        <button class="btn-primary"> SHOP NOW</button>
      </div>
    </div>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
