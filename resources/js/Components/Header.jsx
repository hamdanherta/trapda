import React from 'react';
import { Menu, Sparkles } from 'lucide-react';

export default function Header({ user, onToggleSidebar }) {
    // return (
    //     <header className="bg-trapda-white border-b-2 border-[#005BAB] sticky top-0 z-30 px-4 sm:px-8 py-4 shadow-xs">
    //         <div className="flex items-center justify-between max-w-7xl mx-auto">
    //             <div className="flex items-center space-x-3 sm:space-x-4">
    //                 <button
    //                     onClick={onToggleSidebar}
    //                     className="p-2 rounded-xl border-2 border-[#005BAB] text-[#005BAB] bg-trapda-cream hover:bg-[#005BAB] hover:text-[#FFFFFF] transition-all lg:hidden"
    //                     aria-label="Buka Menu"
    //                 >
    //                     <Menu className="w-6 h-6" />
    //                 </button>

    //                 <div>
    //                     <div className="flex items-center space-x-2">
    //                         <span className="hidden sm:inline-block px-2.5 py-0.5 bg-trapda-cream border border-[#005BAB] text-[#005BAB] rounded-full text-[10px] font-black uppercase tracking-wider">
    //                             Dasbor Utama
    //                         </span>
    //                         <h2 className="text-lg sm:text-2xl font-black text-[#005BAB] tracking-tight flex items-center gap-1.5">
    //                             Halo, @{user?.username || 'Pencari Kerja'}
    //                         </h2>
    //                     </div>
    //                     <p className="text-xs font-semibold text-[#005BAB]/70 hidden sm:block">
    //                         Pantau dan kelola seluruh riwayat lamaran pekerjaan Anda di satu tempat.
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     </header>
    // );
}

