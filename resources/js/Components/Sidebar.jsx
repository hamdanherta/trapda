import React from 'react';
import { useForm } from '@inertiajs/react';
import { BarChart3, Table, PlusCircle, LogOut, X, Info, Globe } from 'lucide-react';
import { translations } from '../Utils/translations';

export default function Sidebar({
    user,
    isOpen,
    onClose,
    onOpenAddModal,
    activeTab = 'kelola',
    onTabChange,
    lang = 'id',
    onLanguageChange,
}) {
    const { post } = useForm();
    const t = translations[lang] || translations.id;

    const handleLogout = (e) => {
        e.preventDefault();
        post('/logout');
    };

    const handleSelectTab = (tab) => {
        if (onTabChange) {
            onTabChange(tab);
        }
        if (isOpen && onClose) {
            onClose();
        }
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-trapda-blue bg-opacity-50 backdrop-blur-xs lg:hidden animate-fade-in"
                />
            )}

            {/* Sidebar Drawer Container */}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-trapda-white border-r-2 border-[#005BAB] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ boxShadow: '8px 0 24px -10px rgba(0, 91, 171, 0.2)' }}
            >
                {/* Brand Header */}
                <div className="p-6 border-b-2 border-trapda-cream flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img
                            src="/logoutama.png"
                            alt="Trapda Logo"
                            className="h-13 w-auto object-contain shrink-0"
                        />
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-trapda-blue">
                                {t.brandName}
                            </h1>
                            <p className="text-[11px] font-extrabold uppercase tracking-widest text-trapda-blue text-opacity-70 leading-tight">
                                Aplikasi Manajemen Lamaran <br />by Herta Devlabs
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full text-trapda-blue hover:bg-trapda-cream lg:hidden"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {/* Add Application CTA Button */}
                    <button
                        onClick={() => {
                            onOpenAddModal();
                            if (isOpen) onClose();
                        }}
                        className="w-full py-3.5 px-4 bg-[#005BAB] text-[#FFFFFF] font-extrabold text-sm rounded-2xl hover:bg-opacity-90 hover:bg-[#005BAB] transition-all active:scale-95 shadow-md flex items-center justify-center space-x-2"
                    >
                        <PlusCircle className="w-5 h-5 text-[#FFF3DD]" />
                        <span>+ {t.btnAddApp}</span>
                    </button>

                    <div className="pt-2">
                        <p className="text-[11px] font-black uppercase tracking-wider text-trapda-blue text-opacity-60 px-3 mb-2">
                            Menu Utama
                        </p>
                        <nav className="space-y-2">
                            {/* Menu 2: Ringkasan & Statistik Data */}
                            <button
                                type="button"
                                onClick={() => handleSelectTab('statistik')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 font-extrabold text-sm rounded-2xl border-2 transition-all ${
                                    activeTab === 'statistik'
                                        ? 'bg-[#005BAB] text-[#FFFFFF] border-[#005BAB] shadow-md'
                                        : 'bg-trapda-cream text-trapda-blue border-[#005BAB] border-opacity-40 hover:border-[#005BAB]'
                                }`}
                            >
                                <BarChart3 className="w-5 h-5" />
                                <span>{t.statistikTab}</span>
                            </button>
                             
                            {/* Menu 1: Kelola Data Lamaran */}
                            <button
                                type="button"
                                onClick={() => handleSelectTab('kelola')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 font-extrabold text-sm rounded-2xl border-2 transition-all ${
                                    activeTab === 'kelola'
                                        ? 'bg-[#005BAB] text-[#FFFFFF] border-[#005BAB] shadow-md'
                                        : 'bg-trapda-cream text-trapda-blue border-[#005BAB] border-opacity-40 hover:border-[#005BAB]'
                                }`}
                            >
                                <Table className="w-5 h-5" />
                                <span>{t.kelolaDataTab}</span>
                            </button>

                            {/* Menu 3: Informasi Status */}
                            <button
                                type="button"
                                onClick={() => handleSelectTab('informasi')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 font-extrabold text-sm rounded-2xl border-2 transition-all ${
                                    activeTab === 'informasi'
                                        ? 'bg-[#005BAB] text-[#FFFFFF] border-[#005BAB] shadow-md'
                                        : 'bg-trapda-cream text-trapda-blue border-[#005BAB] border-opacity-40 hover:border-[#005BAB]'
                                }`}
                            >
                                <Info className="w-5 h-5" />
                                <span>{t.informasiStatusTab}</span>
                            </button>
                        </nav>
                    </div>

                    {/* Language Switcher Section */}
                    <div className="pt-4 border-t border-[#005BAB] border-opacity-20">
                        <div className="flex items-center justify-between px-2 mb-2">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-trapda-blue text-opacity-70 flex items-center gap-1.5">
                                <Globe className="w-3.5 h-3.5" />
                                {t.languageLabel}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 p-1 bg-trapda-cream border-2 border-[#005BAB] rounded-xl">
                            <button
                                type="button"
                                onClick={() => onLanguageChange && onLanguageChange('id')}
                                className={`py-1.5 px-2 rounded-lg text-xs font-black transition-all flex items-center justify-center space-x-1 ${
                                    lang === 'id'
                                        ? 'bg-[#005BAB] text-[#FFFFFF] shadow-sm'
                                        : 'text-trapda-blue hover:bg-trapda-white'
                                }`}
                            >
                                <span>Indo</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => onLanguageChange && onLanguageChange('en')}
                                className={`py-1.5 px-2 rounded-lg text-xs font-black transition-all flex items-center justify-center space-x-1 ${
                                    lang === 'en'
                                        ? 'bg-[#005BAB] text-[#FFFFFF] shadow-sm'
                                        : 'text-trapda-blue hover:bg-trapda-white'
                                }`}
                            >
                                <span>Eng</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Profile Footer */}
                <div className="p-6 border-t-2 border-[#FFF3DD] bg-trapda-cream bg-opacity-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-full bg-[#005BAB] text-[#FFFFFF] font-black flex items-center justify-center text-base border-2 border-[#005BAB] flex-shrink-0">
                                {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="truncate">
                                <h4 className="text-sm font-extrabold text-trapda-blue truncate">
                                    @{user?.username || 'User'}
                                </h4>
                                <span className="text-[11px] font-semibold text-trapda-blue text-opacity-70">
                                    {t.userActive}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            title={t.logout}
                            className="p-2.5 rounded-xl bg-trapda-white border-2 border-[#005BAB] text-trapda-blue hover:bg-[#005BAB] hover:text-[#FFFFFF] transition-all active:scale-95 flex-shrink-0"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="mt-3 text-left">
                        <span className="text-xs font-normal text-trapda-blue text-opacity-60">Versi Aplikasi<br />v.1.12.0</span>
                    </div>
                </div>
            </aside>
        </>
    );
}

