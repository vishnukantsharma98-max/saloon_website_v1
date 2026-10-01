/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import { BookingProvider, useBooking } from './context/BookingContext';
import { TopNavigationHeader } from './components/navigation/TopNavigationHeader';
import { MobileBottomBar } from './components/navigation/MobileBottomBar';
import { HomePage } from './components/home/HomePage';
import { EnrichBookingSystem } from './components/booking/EnrichBookingSystem';
import { ContactPage } from './components/contact/ContactPage';
import { ChooseTimeModal } from './components/booking/ChooseTimeModal';
import { GuestDetailsModal } from './components/booking/GuestDetailsModal';
import { GlobalStickyBookingBar } from './components/booking/GlobalStickyBookingBar';
import { FloatingWhatsApp } from './components/cta/FloatingWhatsApp';
import { Footer } from './components/footer/Footer';

function MainAppShell() {
  const { activePage } = useBooking();

  return (
    <div className="min-h-screen bg-white text-[#18181B] flex flex-col font-sans selection:bg-[#D61C4E]/20 selection:text-[#D61C4E]">
      {/* 1. Desktop & Tablet Top Navigation (Logo click takes to Home) */}
      <TopNavigationHeader />

      {/* 2. Page Content Switcher */}
      <main className="flex-1 bg-white">
        {activePage === 'home' && <HomePage />}
        {activePage === 'services' && <EnrichBookingSystem />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Single Floating WhatsApp Button (Guaranteed Zero Overlap with CTAs) */}
      <FloatingWhatsApp />

      {/* 5. Mobile Fixed Bottom Navigation Bar (3 Buttons: Home, Services, Contact Us) */}
      <MobileBottomBar />

      {/* 6. Global Sticky Booking Bar (Appears across Homepage and Services when services are selected) */}
      <GlobalStickyBookingBar />

      {/* 7. Booking Dialogs & Modals */}
      <ChooseTimeModal />
      <GuestDetailsModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BookingProvider>
        <MainAppShell />
      </BookingProvider>
    </ThemeProvider>
  );
}
