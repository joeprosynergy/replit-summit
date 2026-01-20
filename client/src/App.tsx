import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { GlobalEditToolbar } from "@/components/admin/GlobalEditToolbar";

import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import OurModels from "./pages/OurModels";
import Styles from "./pages/Styles";
import Greenhouse from "./pages/Greenhouse";
import AnimalShelters from "./pages/AnimalShelters";
import StylesUtility from "./pages/StylesUtility";
import StylesBarn from "./pages/StylesBarn";
import StylesModern from "./pages/StylesModern";
import BasicStorage from "./pages/BasicStorage";
import DeluxeStorageCabins from "./pages/DeluxeStorageCabins";
import UtilityShed from "./pages/UtilityShed";
import ProLoftedBarn from "./pages/ProLoftedBarn";
import EconomyShed from "./pages/EconomyShed";
import BudgetProLoftedBarn from "./pages/BudgetProLoftedBarn";
import BudgetProUtility from "./pages/BudgetProUtility";
import Garage from "./pages/Garage";
import Cabin from "./pages/Cabin";
import BarnCabin from "./pages/BarnCabin";
import ModernShed from "./pages/ModernShed";
import Carports from "./pages/Carports";
import GaragesCarports from "./pages/GaragesCarports";
import BuyersGuide from "./pages/BuyersGuide";
import BlockChart from "./pages/BlockChart";
import Gallery from "./pages/Gallery";
import Financing from "./pages/Financing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import Inventory from "./pages/Inventory";
import Configurator3D from "./pages/Configurator3D";
import NotFound from "./pages/NotFound";
import CmsFirstPage from "./pages/CmsFirstPage";

// Lazy-load admin app as separate bundle
const AdminApp = lazy(() => import("./admin/AdminApp"));
const DynamicPage = lazy(() => import("./pages/DynamicPage"));

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <AdminAuthProvider>
          <ScrollToTop />
          <GlobalEditToolbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/types" element={<OurModels />} />

          <Route path="/styles" element={<Styles />} />
          <Route path="/styles/utility" element={<StylesUtility />} />
          <Route path="/styles/barn" element={<StylesBarn />} />
          <Route path="/styles/modern" element={<StylesModern />} />
          <Route path="/styles/greenhouse" element={<Greenhouse />} />
          <Route path="/styles/animal-shelters" element={<AnimalShelters />} />

          <Route path="/types/basic-storage" element={<BasicStorage />} />
          <Route path="/types/basic-storage/economy-shed" element={<EconomyShed />} />
          <Route path="/types/basic-storage/budget-pro-lofted-barn" element={<BudgetProLoftedBarn />} />
          <Route path="/types/basic-storage/budget-pro-utility" element={<BudgetProUtility />} />

          <Route path="/types/deluxe-storage-cabins" element={<DeluxeStorageCabins />} />
          <Route path="/types/deluxe-storage-cabins/pro-utility-shed" element={<UtilityShed />} />
          <Route path="/types/deluxe-storage-cabins/pro-lofted-barn" element={<ProLoftedBarn />} />
          <Route path="/types/deluxe-storage-cabins/cabin" element={<Cabin />} />
          <Route path="/types/deluxe-storage-cabins/barn-cabin" element={<BarnCabin />} />
          <Route path="/types/deluxe-storage-cabins/modern-shed" element={<ModernShed />} />

          <Route path="/types/garages-carports" element={<GaragesCarports />} />
          <Route path="/types/garages-carports/garage" element={<Garage />} />
          <Route path="/types/garages-carports/carports" element={<Carports />} />

          <Route path="/buyers-guide" element={<BuyersGuide />} />
          <Route path="/block-chart" element={<BlockChart />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/3d-configurator" element={<Configurator3D />} />

        
        
          {/* ADMIN - Lazy-loaded separate bundle */}
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Loading admin...</div>
                </div>
              }>
                <AdminApp />
              </Suspense>
            }
          />
          
          {/* Auth callback (used by admin) */}
          <Route
            path="/auth/callback"
            element={
              <Suspense fallback={null}>
                <AdminApp />
              </Suspense>
            }
          />

          {/* CMS-FIRST */}
          <Route
            path="/cms/*"
            element={
              <Suspense fallback={<div className="p-6 text-sm">Loading…</div>}>
                <CmsFirstPage />
              </Suspense>
            }
          />
          
          {/* LEGACY / FALLBACK */}
          <Route
            path="/*"
            element={
              <Suspense fallback={null}>
                <DynamicPage />
              </Suspense>
            }
          />

        </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;