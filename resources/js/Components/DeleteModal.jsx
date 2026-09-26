import React from 'react';
import { Trash2, AlertCircle, X } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, applicationName, isSubmitting }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#005BAB]/50 backdrop-blur-xs animate-fade-in">
            <div className="relative w-full max-w-md bg-trapda-white border-2 border-[#005BAB] rounded-2xl p-6 shadow-2xl animate-pop-in overflow-hidden">
                <button 
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="absolute top-4 right-4 p-1.5 rounded-full text-[#005BAB] hover:bg-trapda-cream transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-trapda-cream border-2 border-[#005BAB] rounded-full mb-4">
                        <Trash2 className="w-10 h-10 text-[#005BAB]" />
                    </div>

                    <h3 className="text-xl font-extrabold text-[#005BAB]">
                        Hapus Lamaran Kerja?
                    </h3>

                    <p className="mt-2 text-sm font-medium text-[#005BAB]/80 leading-relaxed max-w-xs">
                        Apakah Anda yakin ingin menghapus lamaran untuk <strong className="text-[#005BAB] underline font-bold">{applicationName}</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>

                    <div className="mt-6 flex items-center justify-center space-x-3 w-full">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="w-1/2 py-2.5 px-4 bg-trapda-cream text-[#005BAB] border-2 border-[#005BAB] font-bold text-sm rounded-xl hover:bg-trapda-cream/70 transition-all active:scale-95"
                        >
                            Batal
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isSubmitting}
                            className="w-1/2 py-2.5 px-4 bg-[#005BAB] text-[#FFFFFF] font-extrabold text-sm rounded-xl hover:bg-[#005BAB]/90 transition-all active:scale-95 shadow-md flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <span>Menghapus...</span>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    <span>Ya, Hapus</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
