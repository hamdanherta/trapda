import React, { useState, useEffect } from 'react';
import { router, usePage, Head } from '@inertiajs/react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import StatsCards from '../Components/StatsCards';
import FilterBar from '../Components/FilterBar';
import JobTable from '../Components/JobTable';
import JobModal from '../Components/JobModal';
import DeleteModal from '../Components/DeleteModal';
import NotificationModal from '../Components/NotificationModal';
import StatusInfo from '../Components/StatusInfo';
import { BarChart3, Table, Info } from 'lucide-react';
import { translations } from '../Utils/translations';

export default function Dashboard({ applications, stats, uniqueLocations, uniquePositions, filters, user }) {
    const { flash } = usePage().props;

    // Language state ('id' | 'en')
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('trapda_lang') || 'id';
        }
        return 'id';
    });

    const t = translations[lang] || translations.id;

    const handleLanguageChange = (newLang) => {
        setLang(newLang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('trapda_lang', newLang);
        }
    };

    // Mobile sidebar state
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Active View Tab State: 'kelola' | 'statistik' | 'informasi'
    const [activeTab, setActiveTab] = useState('statistik');

    // Filter states
    const [localFilters, setLocalFilters] = useState({
        search: filters?.search || '',
        status: filters?.status || '',
        location: filters?.location || '',
        position: filters?.position || '',
        work_type: filters?.work_type || '',
        sort: filters?.sort || 'terbaru',
    });

    // Modals state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingApp, setEditingApp] = useState(null);
    const [deletingApp, setDeletingApp] = useState(null);
    const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);

    // Notification State
    const [notification, setNotification] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: '',
    });

    useEffect(() => {
        if (flash?.success) {
            setNotification({
                isOpen: true,
                type: 'success',
                title: 'Berhasil!',
                message: flash.success,
            });
        } else if (flash?.error) {
            setNotification({
                isOpen: true,
                type: 'error',
                title: 'Gagal!',
                message: flash.error,
            });
        }
    }, [flash]);

    // Handle filter update with router.get
    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);

        router.get('/dashboard', newFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleResetFilters = () => {
        const resetFilters = {
            search: '',
            status: '',
            location: '',
            position: '',
            work_type: '',
            sort: 'terbaru',
        };
        setLocalFilters(resetFilters);
        router.get('/dashboard', resetFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };



    // Confirm Delete Application
    const handleConfirmDelete = () => {
        if (!deletingApp) return;
        setIsSubmittingDelete(true);

        router.delete('/job-applications/' + deletingApp.id, {
            preserveScroll: true,
            onSuccess: () => {
                setIsSubmittingDelete(false);
                setDeletingApp(null);
                setNotification({
                    isOpen: true,
                    type: 'success',
                    title: 'Lamaran Dihapus',
                    message: 'Data lamaran kerja berhasil dihapus dari sistem.',
                });
            },
            onError: () => {
                setIsSubmittingDelete(false);
                setNotification({
                    isOpen: true,
                    type: 'error',
                    title: 'Gagal Menghapus',
                    message: 'Gagal menghapus data lamaran kerja.',
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-trapda-cream text-[#005BAB] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
            <Head title="Trapda - Manajemen Lamaran Kamu" />
            {/* Sidebar with distinct navigation tabs */}
            <Sidebar
                user={user}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onOpenAddModal={() => setIsAddModalOpen(true)}
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab)}
                lang={lang}
                onLanguageChange={handleLanguageChange}
            />

            {/* Main Content Area */}
            <div className="lg:pl-72 flex flex-col flex-1 min-w-0">
                {/* Dashboard Body */}
                <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
                    {/* VIEW 1: RINGKASAN & STATISTIK DATA */}
                    {activeTab === 'statistik' && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black text-[#005BAB] tracking-tight flex items-center space-x-3">
                                    <BarChart3 className="w-8 h-8 text-[#005BAB]" />
                                    <span>{t.statsTitle}</span>
                                </h1>
                                <p className="text-xs sm:text-sm font-semibold text-[#005BAB]/80 mt-1">
                                    {t.statsSub}
                                </p>
                            </div>

                            {/* Stat Cards Grid */}
                            <StatsCards stats={stats} lang={lang} />
                        </div>
                    )}

                    {/* VIEW 2: KELOLA DATA LAMARAN (TABEL LIST & FILTER) */}
                    {activeTab === 'kelola' && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black text-[#005BAB] tracking-tight flex items-center space-x-3">
                                    <Table className="w-8 h-8 text-[#005BAB]" />
                                    <span>{t.kelolaTitle}</span>
                                </h1>
                                <p className="text-xs sm:text-sm font-semibold text-[#005BAB]/80 mt-1">
                                    {t.kelolaSub}
                                </p>
                            </div>

                            {/* Filter Bar */}
                            <FilterBar
                                filters={localFilters}
                                uniqueLocations={uniqueLocations}
                                uniquePositions={uniquePositions}
                                onFilterChange={handleFilterChange}
                                onReset={handleResetFilters}
                                lang={lang}
                            />

                            {/* Applications List Table */}
                            {applications.length > 0 ? (
                                <JobTable
                                    applications={applications}
                                    onEdit={(item) => setEditingApp(item)}
                                    onDelete={(item) => setDeletingApp(item)}
                                    lang={lang}
                                />
                            ) : (
                                /* Empty State */
                                <div className="bg-trapda-white border-2 border-[#005BAB] rounded-3xl p-8 sm:p-12 text-center shadow-lg my-6">
                                    <div className="inline-flex p-4 bg-trapda-cream border-2 border-[#005BAB] rounded-full mb-4">
                                        <Info className="w-10 h-10 text-[#005BAB]" />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-[#005BAB]">
                                        {t.noDataTitle}
                                    </h3>
                                    <p className="mt-2 text-sm font-semibold text-[#005BAB]/80 max-w-md mx-auto">
                                        {t.noDataSub}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* VIEW 3: INFORMASI STATUS & JENIS PEKERJAAN */}
                    {activeTab === 'informasi' && (
                        <StatusInfo lang={lang} />
                    )}
                </main>
            </div>

            {/* Modal Components */}
            <JobModal
                isOpen={isAddModalOpen || Boolean(editingApp)}
                onClose={() => {
                    setIsAddModalOpen(false);
                    setEditingApp(null);
                }}
                application={editingApp}
                lang={lang}
                onSuccess={(msg) => {
                    setNotification({
                        isOpen: true,
                        type: 'success',
                        title: 'Berhasil!',
                        message: msg,
                    });
                }}
                onError={(msg) => {
                    setNotification({
                        isOpen: true,
                        type: 'error',
                        title: 'Terjadi Kesalahan',
                        message: msg,
                    });
                }}
            />

            <DeleteModal
                isOpen={Boolean(deletingApp)}
                onClose={() => setDeletingApp(null)}
                onConfirm={handleConfirmDelete}
                applicationName={deletingApp?.position_name ? `${deletingApp.position_name} di ${deletingApp.company_name}` : ''}
                isSubmitting={isSubmittingDelete}
            />

            <NotificationModal
                isOpen={notification.isOpen}
                type={notification.type}
                title={notification.title}
                message={notification.message}
                onClose={() => setNotification({ ...notification, isOpen: false })}
            />
        </div>
    );
}

