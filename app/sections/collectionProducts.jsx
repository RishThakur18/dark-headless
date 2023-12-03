import { Suspense, useEffect } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import { Await } from '@remix-run/react';

import styles from '../styles/collectionProducts.css';

export function CollectionProducts({ products }) {

  useEffect(() => {

    function setCardWidth() {
      const card = document.querySelector('.product-card');
      const cardHeight = card.offsetHeight;
      const cardWidth = card.offsetWidth;

      document.documentElement.style.setProperty('--card-height', `${cardHeight}px`);
      document.documentElement.style.setProperty('--card-width', `${cardWidth}px`);

    }

    setCardWidth();

    window.addEventListener('resize', setCardWidth);

    const cards = document.querySelectorAll('.product-card');
    const glowArea = document.querySelector('.glow-area');

    function toggleGlow(entries) {
      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        entry.target.classList.toggle("glow", entry.isIntersecting)
      });
    }
    const observer = new IntersectionObserver(toggleGlow, {
      root: null,
      rootMargin: '0px',
      threshold: 1 // Adjust this value for the intersection sensitivity
    });

    cards.forEach(card => {
      observer.observe(card);
    });


  }, []);
  return (
    <>
      <div>
        <div class="product-grid-title-card glassmorphic-card">
          BOOTS Collection
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={products}>
            {({ products }) => (
              <div class="product-item-grid">
                {products.nodes.map((product) => (
                  <div class="product-card glassmorphic-card">
                    <div class="imgBox">
                      <Image
                        data={product.images.nodes[0]}
                        sizes="(min-width: 45em) 20vw, 50vw"
                        class="product-image"
                      />
                    </div>
                    <div class="contentBox">
                      <div class="content-details">
                        <h3>{product.title}</h3>
                        <p>Lorem Ipsum is simply dummy text</p>
                        <Money data={product.priceRange.minVariantPrice} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Await>
        </Suspense>
      </div >
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}