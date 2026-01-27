import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { BuyersGuideLinkInterceptor } from "@/components/BuyersGuideLinkInterceptor";
import CodeSnippetInjector from "@/components/CodeSnippetInjector";

// Lazy-load admin components to avoid initialization issues
const GlobalEditToolbar = lazy(() => import("@/components/admin/GlobalEditToolbar").then(m => ({ default: m.GlobalEditToolbar })));

// Core pages - eagerly loaded for fast initial navigation
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import OurModels from "./pages/OurModels";
import Styles from "./pages/Styles";
import StylesUtility from "./pages/StylesUtility";
import StylesBarn from "./pages/StylesBarn";
import StylesModern from "./pages/StylesModern";
import BasicStorage from "./pages/BasicStorage";
import DeluxeStorageCabins from "./pages/DeluxeStorageCabins";
import GaragesCarports from "./pages/GaragesCarports";
import NotFound from "./pages/NotFound";

// Secondary pages - lazy loaded for smaller initial bundle
const Greenhouse = lazy(() => import("./pages/Greenhouse"));
const AnimalShelters = lazy(() => import("./pages/AnimalShelters"));
const UtilityShed = lazy(() => import("./pages/UtilityShed"));
const ProLoftedBarn = lazy(() => import("./pages/ProLoftedBarn"));
const EconomyShed = lazy(() => import("./pages/EconomyShed"));
const BudgetProLoftedBarn = lazy(() => import("./pages/BudgetProLoftedBarn"));
const BudgetProUtility = lazy(() => import("./pages/BudgetProUtility"));
const Garage = lazy(() => import("./pages/Garage"));
const Cabin = lazy(() => import("./pages/Cabin"));
const BarnCabin = lazy(() => import("./pages/BarnCabin"));
const ModernShed = lazy(() => import("./pages/ModernShed"));
const Carports = lazy(() => import("./pages/Carports"));
const BuyersGuide = lazy(() => import("./pages/BuyersGuide"));
const BlockChart = lazy(() => import("./pages/BlockChart"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Financing = lazy(() => import("./pages/Financing"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Configurator3D = lazy(() => import("./pages/Configurator3D"));
const CmsFirstPage = lazy(() => import("./pages/CmsFirstPage"));

// Lazy-load admin app as separate bundle
const AdminApp = lazy(() => import("./admin/AdminApp"));
const DynamicPage = lazy(() => import("./pages/DynamicPage"));
const Signup = lazy(() => import("./pages/Signup"));
const SignupCallback = lazy(() => import("./pages/SignupCallback"));

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <AdminAuthProvider>
          <BuyersGuideLinkInterceptor>
            <ScrollToTop />
            <CodeSnippetInjector />
            <Suspense fallback={null}>
              <GlobalEditToolbar />
            </Suspense>

          <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/types" element={<OurModels />} />

          <Route path="/styles" element={<Styles />} />
          <Route path="/styles/utility" element={<StylesUtility />} />
          <Route path="/styles/barn" element={<StylesBarn />} />
          <Route path="/styles/modern" element={<StylesModern />} />
          <Route path="/styles/greenhouse" element={<Suspense fallback={null}><Greenhouse /></Suspense>} />
          <Route path="/styles/animal-shelters" element={<Suspense fallback={null}><AnimalShelters /></Suspense>} />

          <Route path="/types/basic-storage" element={<BasicStorage />} />
          <Route path="/types/basic-storage/economy-shed" element={<Suspense fallback={null}><EconomyShed /></Suspense>} />
          <Route path="/types/basic-storage/budget-pro-lofted-barn" element={<Suspense fallback={null}><BudgetProLoftedBarn /></Suspense>} />
          <Route path="/types/basic-storage/budget-pro-utility" element={<Suspense fallback={null}><BudgetProUtility /></Suspense>} />

          <Route path="/types/deluxe-storage-cabins" element={<DeluxeStorageCabins />} />
          <Route path="/types/deluxe-storage-cabins/pro-utility-shed" element={<Suspense fallback={null}><UtilityShed /></Suspense>} />
          <Route path="/types/deluxe-storage-cabins/pro-lofted-barn" element={<Suspense fallback={null}><ProLoftedBarn /></Suspense>} />
          <Route path="/types/deluxe-storage-cabins/cabin" element={<Suspense fallback={null}><Cabin /></Suspense>} />
          <Route path="/types/deluxe-storage-cabins/barn-cabin" element={<Suspense fallback={null}><BarnCabin /></Suspense>} />
          <Route path="/types/deluxe-storage-cabins/modern-shed" element={<Suspense fallback={null}><ModernShed /></Suspense>} />

          <Route path="/types/garages-carports" element={<GaragesCarports />} />
          <Route path="/types/garages-carports/garage" element={<Suspense fallback={null}><Garage /></Suspense>} />
          <Route path="/types/garages-carports/carports" element={<Suspense fallback={null}><Carports /></Suspense>} />

          <Route path="/buyers-guide" element={<Suspense fallback={null}><BuyersGuide /></Suspense>} />
          <Route path="/block-chart" element={<Suspense fallback={null}><BlockChart /></Suspense>} />
          <Route path="/gallery" element={<Suspense fallback={null}><Gallery /></Suspense>} />
          <Route path="/financing" element={<Suspense fallback={null}><Financing /></Suspense>} />
          <Route path="/privacy-policy" element={<Suspense fallback={null}><PrivacyPolicy /></Suspense>} />
          <Route path="/contact-us" element={<Suspense fallback={null}><ContactUs /></Suspense>} />
          <Route path="/inventory" element={<Suspense fallback={null}><Inventory /></Suspense>} />
          <Route path="/3d-configurator" element={<Suspense fallback={null}><Configurator3D /></Suspense>} />

          {/* SIGNUP ROUTES */}
          <Route
            path="/signup"
            element={
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Loading...</div>
                </div>
              }>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/signup/callback"
            element={
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Processing...</div>
                </div>
              }>
                <SignupCallback />
              </Suspense>
            }
          />

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
          </BuyersGuideLinkInterceptor>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;