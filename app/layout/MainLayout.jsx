import { SectionGroupLayout } from './SectionGroupLayout';
import { Header } from '~/sections/Header';
import { Footer } from '~/sections/Footer';
import { AnnouncementBar } from '~/sections/AnnouncementBar';
import { CartMain } from '~/sections/Cart';
import { SearchForm } from '~/sections/Search';
import { Suspense } from 'react';
import { Await } from '@remix-run/react';


export function MainLayout({children, cart, header, isLoggedIn }) {
  return (
    <div className="main-wrapper">

       <SectionGroupLayout>
        <CartMain cart={cart}/>
      </SectionGroupLayout>
  
      {/*<SectionGroupLayout>
        <SearchForm />
      </SectionGroupLayout>
   */}
      {/* <SectionGroupLayout>
        <MobileMenuAside menu={header.menu} />
      </SectionGroupLayout> */}

      <SectionGroupLayout>
        <AnnouncementBar />
        <Header header={header} cart={cart} isLoggedIn={isLoggedIn}  />
      </SectionGroupLayout>

      <SectionGroupLayout>
        <main>{children}</main>
      </SectionGroupLayout>

      {/* <Suspense>
        <Await resolve={footer}>
        <SectionGroupLayout>
          {(footer) => <Footer menu={footer.menu} />}
        </SectionGroupLayout>  
        </Await>
      </Suspense> */}

    </div>
  );
}

