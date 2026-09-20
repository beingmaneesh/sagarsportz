import Hero from '@/components/home/Hero';
import CustomJerseyShowcase from '@/components/home/CustomJerseyShowcase';
import ShopBySport from '@/components/home/ShopBySport';
import ProcessSection from '@/components/home/ProcessSection';
import SportswearSection from '@/components/home/SportswearSection';
import EquipmentSection from '@/components/home/EquipmentSection';
import BulkOrders from '@/components/home/BulkOrders';
import PrintingServices from '@/components/home/PrintingServices';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import CustomisationShowcase from '@/components/home/CustomisationShowcase';
import WhySagarSportz from '@/components/home/WhySagarSportz';
import Testimonials from '@/components/home/Testimonials';
import InstagramGrid from '@/components/home/InstagramGrid';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CustomJerseyShowcase />
      <ShopBySport />
      <ProcessSection />
      <SportswearSection />
      <EquipmentSection />
      <BulkOrders />
      <PrintingServices />
      <FeaturedProducts />
      <NewArrivals />
      <CustomisationShowcase />
      <WhySagarSportz />
      <Testimonials />
      <InstagramGrid />
      <FinalCTA />
    </>
  );
}
