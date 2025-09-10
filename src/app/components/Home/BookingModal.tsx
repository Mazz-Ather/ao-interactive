'use client';

import React, { useState, useEffect, useRef } from 'react';

// Types
export interface BookingOption {
  time: string;
  date: string;
};

const BookingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  specialist: string;
}> = ({ isOpen, onClose, specialist }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [bookingOptions, setBookingOptions] = useState<BookingOption[]>([
    { time: '9:00 AM', date: 'Mon, Jun 10' },
    { time: '11:30 AM', date: 'Mon, Jun 10' },
    { time: '2:00 PM', date: 'Tue, Jun 11' },
    { time: '4:30 PM', date: 'Wed, Jun 12' },
  ]);

  // Handle click outside to close modal
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle keyboard trap for accessibility
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 max-w-md w-full shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 id="booking-modal-title" className="text-xl font-semibold text-white">Book a call with {specialist}</h3>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close booking modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4 my-4">
          <p className="text-white/70">Select a time that works for you:</p>
          <div className="grid grid-cols-2 gap-3">
            {bookingOptions.map((option, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-3 border border-white/10 rounded-lg hover:border-[#40ED70] hover:bg-white/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#40ED70]/50"
              >
                <span className="text-[#40ED70] font-medium">{option.time}</span>
                <span className="text-white/70 text-sm">{option.date}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-white/20 rounded-lg text-white/80 hover:text-white hover:border-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Cancel
          </button>
          <a 
            href="https://calendly.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#40ED70] hover:bg-[#40ED70]/90 text-black rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#40ED70]/50"
          >
            Open Calendly
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;