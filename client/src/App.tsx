import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";

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
import Gallery from "./pages/Gallery";
import Financing from "./pages/Financing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import Inventory from "./pages/Inventory";
import Configurator3D from "./pages/Configurator3D";
import NotFound from "./pages/NotFound";
import CmsFirstPage from "./pages/CmsFirstPage";

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Admin = lazy(() => import("./pages/Admin"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const AdminCloudinaryUpload = lazy(() => import("./pages/AdminCloudinaryUpload"));
const AssetAudit = lazy(() => import("./pages/AssetAudit"));
const DynamicPage = lazy(() => import("./pages/DynamicPage"));

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <ScrollToTop />

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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/3d-configurator" element={<Configurator3D />} />

          {/* CMS-FIRST */}
          <Route
            path="/cms/*"
            element={
              <Suspense fallback={null}>
                <CmsFirstPage />
              </Suspense>
            }
          />

          {/* ADMIN (lazy only) */}
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={null}>
                <AdminLogin />
              </Suspense>
            }
          />

          <Route
            path="/auth/callback"
            element={
              <Suspense fallback={null}>
                <AuthCallback />
              </Suspense>
            }
          />

          <Route
            path="/admin/*"
            element={
              <Suspense fallback={null}>
                <Admin />
              </Suspense>
            }
          />

          <Route
            path="/cloudinary-upload"
            element={
              <Suspense fallback={null}>
                <AdminCloudinaryUpload />
              </Suspense>
            }
          />

          <Route
            path="/asset-audit"
            element={
              <Suspense fallback={null}>
                <AssetAudit />
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;