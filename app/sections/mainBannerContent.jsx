import styles from '../styles/mainBannerContent.css';

export function MainBannerContent() {

 return (
   <div className="main-banner-content-wrapper">
      <h1>DARK</h1>
   </div>
 );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
