import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

export default function NotificationModal({ type = 'success', title, message, isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const isSuccess = type === 'success';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#005BAB]/40 backdrop-blur-xs animate-fade-in">
            <div 
                className="relative w-full max-w-md bg-trapda-white border-2 border-[#005BAB] rounded-2xl p-6 shadow-2xl animate-pop-in overflow-hidden"
                style={{ boxShadow: '0 20px 40px -15px rgba(0, 91, 171, 0.3)' }}
            >
                {/* Decorative Top Accent */}
                <div className={`absolute top-0 left-0 right-0 h-2 ${isSuccess ? 'bg-[#005BAB]' : 'bg-[#005BAB] opacity-75'}`} />

                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full text-[#005BAB] hover:bg-trapda-cream transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-trapda-cream border-2 border-[#005BAB] rounded-xl">
                        {isSuccess ? (
                            <CheckCircle2 className="w-8 h-8 text-[#005BAB]" />
                        ) : (
                            <AlertTriangle className="w-8 h-8 text-[#005BAB]" />
                        )}
                    </div>
                    <div className="flex-1 pr-4">
                        <h3 className="text-lg font-extrabold text-[#005BAB] leading-tight">
                            {title || (isSuccess ? 'Berhasil!' : 'Terjadi Kesalahan')}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-[#005BAB]/80 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-[#005BAB] text-[#FFFFFF] font-bold text-sm rounded-xl hover:bg-[#005BAB]/90 transition-all active:scale-95 shadow-md"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
