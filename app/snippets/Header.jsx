import { Await, NavLink } from '@remix-run/react';
import { Suspense, useEffect, useState } from 'react';
import { useRootLoaderData } from '~/root';

export function Header({ header, isLoggedIn, cart }) {
  const { shop, menu } = header;
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-wrapper ${isSticky ? "sticky-header" : ""}`}>
      <div className="header-logo-block">
        <HeaderIcons mobileMenu={true} />
        <NavLink prefetch="intent" to="/" className="logo-icon-link">
          <img class="header-logo" src="https://cdn.shopify.com/s/files/1/0625/5919/1260/files/White_Logo_Dark_f22e4927-1ad3-4b24-ab19-dd56580577b5.png?v=1701029258" />
        </NavLink>
        <HeaderIcons isLoggedIn={ isLoggedIn ? isLoggedIn : null } cart={cart} />
      </div>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
      />

    </header>
  );
}

export function HeaderMenu({ menu, primaryDomainUrl, viewport }) {
  const { publicStoreDomain } = useRootLoaderData();

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={`header-menu-${viewport}`} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {menu.items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            className="header-menu-item"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderIcons({ isLoggedIn, cart, mobileMenu }) {
  return (
    <nav className="header-icons-wrapper" role="navigation">
 
      {mobileMenu &&
        <HeaderMenuMobileToggle />
      }
 
      {isLoggedIn || isLoggedIn === null &&
        <NavLink prefetch="intent" to="/account" className="logo-icon-link">
          {isLoggedIn === null ? 'Account' : 'Sign in'}
        </NavLink>
      }
 
      {cart &&
        <CartToggle cart={cart} />
      }
 
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside">Search</a>;
}

function CartBadge({ count }) {
  return <a href="#cart-aside">Cart {count}</a>;
}

function CartToggle({ cart }) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}