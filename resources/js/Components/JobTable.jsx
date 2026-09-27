import React, { useState, useEffect } from 'react';
import { Building, MapPin, Edit3, Trash2, CheckCircle2, Clock, Send, XCircle, AlertTriangle, ChevronLeft, ChevronRight, Building2, Laptop, Globe, FileText, Download } from 'lucide-react';
import { translations, translateData } from '../Utils/translations';

// ─── Palet warna status ────────────────────────────────────────────────────────
// Dikirim           → #007FD3 (biru)
// Wawancara         → #DAA000 (kuning)
// Diterima          → #4CBE00 (hijau)
// Ditolak           → #D70000 (merah)
// (Wawancara) Ditolak → #700000 (merah gelap)
// ──────────────────────────────────────────────────────────────────────────────

const STATUS_COLORS = {
    'Dikirim':             { bg: '#007FD3', border: '#005fa3', text: '#ffffff' },
    'Wawancara':           { bg: '#DAA000', border: '#b38200', text: '#ffffff' },
    'Diterima':            { bg: '#4CBE00', border: '#3a9400', text: '#ffffff' },
    'Ditolak':             { bg: '#D70000', border: '#a80000', text: '#ffffff' },
    '(Wawancara) Ditolak': { bg: '#700000', border: '#500000', text: '#ffffff' },
};

const STATUS_ICONS = {
    'Dikirim':             Send,
    'Wawancara':           Clock,
    'Diterima':            CheckCircle2,
    'Ditolak':             XCircle,
    '(Wawancara) Ditolak': AlertTriangle,
};

function StatusBadge({ status, lang = 'id' }) {
    const c = STATUS_COLORS[status] ?? STATUS_COLORS['Ditolak'];
    const Icon = STATUS_ICONS[status] ?? XCircle;
    const translatedText = translateData(status, lang);

    return (
        <span
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-black rounded-full shadow-xs whitespace-normal max-w-[125px] leading-tight text-center justify-center"
            style={{ backgroundColor: c.bg, border: `1.5px solid ${c.border}`, color: c.text }}
        >
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="break-words">{translatedText}</span>
        </span>
    );
}

function WorkTypeBadge({ workType, lang = 'id' }) {
    const isOffsite = workType === 'Offsite (Remote)';
    const Icon = isOffsite ? Laptop : Building2;
    const translatedText = translateData(workType || 'Onsite (WFO)', lang);

    return (
        <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-extrabold rounded-xl bg-trapda-cream text-[#005BAB] border border-[#005BAB]/40 whitespace-normal max-w-[125px] leading-tight${isOffsite ? ' justify-start text-left' : ' justify-center text-center'}`}>
            <Icon className="w-3.5 h-3.5 flex-shrink-0 text-[#005BAB]" />
            <span>{translatedText}</span>
        </span>
    );
}

function PlatformBadge({ platform }) {
    return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-extrabold rounded-xl bg-[#005BAB]/10 text-[#005BAB] border border-[#005BAB]/30 whitespace-nowrap">
            <Globe className="w-3.5 h-3.5 flex-shrink-0 text-[#005BAB]" />
            <span>{platform || 'Email'}</span>
        </span>
    );
}

export default function JobTable({ applications, onEdit, onDelete, filters, lang = 'id' }) {
    const t = translations[lang] || translations.id;
    const [currentPage, setCurrentPage] = useState(1);
    
    // REQUIREMENT 5: Tampilkan maks 8 data di tabel
    const ITEMS_PER_PAGE = 8;

    // Reset pagination to page 1 ONLY when filters change (not when editing/saving data)
    useEffect(() => {
        setCurrentPage(1);
    }, [JSON.stringify(filters)]);

    const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
    const validPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

    // Slice max 8 items for the current page
    const displayedApplications = applications.slice(
        (validPage - 1) * ITEMS_PER_PAGE,
        validPage * ITEMS_PER_PAGE
    );

    // Calculate dynamic page numbers (Max 5 buttons shown)
    let startPage = 1;
    let endPage = Math.min(5, totalPages);

    if (totalPages > 5) {
        if (validPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (validPage >= totalPages - 2) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = validPage - 2;
            endPage = validPage + 2;
        }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    // Check if applied date is older than 1 month (30 days) - Re-enabled per user request
    const isMoreThanOneMonthOld = (appliedAtStr) => {
        if (!appliedAtStr) return false;
        const appliedDate = new Date(appliedAtStr);
        if (isNaN(appliedDate.getTime())) return false;
        const now = new Date();
        const diffDays = (now.getTime() - appliedDate.getTime()) / (1000 * 3600 * 24);
        return diffDays > 30;
    };

    const getRowClass = (status) => {
        if (status === 'Dikirim') {
            return 'bg-[#e8f4fb] hover:bg-[#d8eefc] transition-colors group';
        }
        if (status === 'Wawancara') {
            return 'bg-[#fdf6e0] hover:bg-[#f8ebc2] transition-colors group';
        }
        return 'hover:bg-trapda-cream/50 transition-colors group';
    };

    return (
        <div className="bg-trapda-white border-2 border-[#005BAB] rounded-3xl shadow-lg overflow-hidden">
            {/* REQUIREMENT 6: Above the table action bar (Tombol Unduh Laporan PDF) */}
            <div className="p-4 sm:p-5 bg-trapda-cream border-b-2 border-[#005BAB] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs sm:text-sm font-extrabold text-[#005BAB] flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-[#005BAB] rounded-full inline-block"></span>
                    <span>Daftar Riwayat Lamaran Pekerjaan</span>
                </div>

                <a
                    href="/job-applications/pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2 bg-[#4CBE00] text-[#FFFFFF] border-2 border-[#3a9400] rounded-xl font-extrabold text-xs sm:text-sm hover:bg-[#3a9400] transition-all active:scale-95 shadow-md group"
                >
                    <FileText className="w-4 h-4 text-[#FFFFFF] group-hover:scale-110 transition-transform" />
                    <Download className="w-3.5 h-3.5 text-[#FFFFFF]" />
                    <span>{t.downloadPdfReport}</span>
                </a>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-[#005BAB] text-[#FFFFFF] text-xs font-extrabold uppercase tracking-wider border-b-2 border-[#005BAB]">
                            <th className="py-3.5 pl-5 sm:pl-6 pr-3">{t.colPosition}</th>
                            <th className="py-3.5 px-2 text-center">{t.colWorkType}</th>
                            <th className="py-3.5 px-3 sm:px-4">{t.colLocation}</th>
                            <th className="py-3.5 px-2 text-center">{t.colStatus}</th>
                            <th className="py-3.5 px-3 sm:px-4">{t.colCompany}</th>
                            {/* REQUIREMENT 4: Kolom tanggal apply diganti dengan kolom Platform */}
                            <th className="py-3.5 px-3 sm:px-4 text-center">{t.colPlatform}</th>
                            <th className="py-3.5 pr-5 sm:pr-6 pl-2 text-center">{t.colAction}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-[#FFF3DD]">
                        {displayedApplications.map((app) => {
                            const isExpired = isMoreThanOneMonthOld(app.created_at);
                            const rowStyleClass = getRowClass(app.status);

                            return (
                                <tr
                                    key={app.id}
                                    className={rowStyleClass}
                                >
                                    {/* 1. Posisi */}
                                    <td className="py-3.5 pl-5 sm:pl-6 pr-3 align-middle">
                                        <div className="max-w-[140px] sm:max-w-[180px] break-words text-xs sm:text-sm font-extrabold text-[#005BAB] leading-snug">
                                            {app.position_name}
                                        </div>
                                    </td>

                                    {/* 2. Jenis Pekerjaan */}
                                    <td className="py-3.5 px-2 text-center align-middle">
                                        <WorkTypeBadge workType={app.work_type} lang={lang} />
                                    </td>

                                    {/* 3. Lokasi */}
                                    <td className="py-3.5 px-3 sm:px-4 align-middle">
                                        <div className="max-w-[110px] sm:max-w-[140px] break-words inline-flex items-start space-x-1 text-xs sm:text-sm font-bold text-[#005BAB] leading-snug">
                                            <MapPin className="w-3.5 h-3.5 text-[#005BAB] flex-shrink-0 mt-0.5" />
                                            <span className="break-words">{app.location}</span>
                                        </div>
                                    </td>

                                    {/* 4. Status */}
                                    <td className="py-3.5 px-2 text-center align-middle">
                                        <div className="inline-flex flex-col items-center justify-center">
                                            <StatusBadge status={app.status} lang={lang} />
                                        </div>
                                    </td>

                                    {/* 5. Nama Perusahaan */}
                                    <td className="py-3.5 px-3 sm:px-4 align-middle">
                                        <div className="max-w-[120px] sm:max-w-[150px] break-words inline-flex items-start space-x-1 text-xs sm:text-sm font-bold text-[#005BAB] leading-snug">
                                            <Building className="w-3.5 h-3.5 text-[#005BAB] flex-shrink-0 mt-0.5" />
                                            <span className="break-words">{app.company_name}</span>
                                        </div>
                                    </td>

                                    {/* 6. Platform (Menggantikan Tanggal Apply) */}
                                    <td className="py-3.5 px-3 sm:px-4 text-center align-middle">
                                        <div className="inline-flex flex-col items-center justify-center">
                                            <PlatformBadge platform={app.platform} />
                                        </div>
                                    </td>

                                    {/* 7. Aksi */}
                                    <td className="py-3.5 pr-5 sm:pr-6 pl-2 text-center align-middle">
                                        <div className="flex items-center justify-center space-x-1.5">
                                            {!isExpired && (
                                                <button
                                                    type="button"
                                                    onClick={() => onEdit(app)}
                                                    className="inline-flex items-center justify-center p-2 bg-trapda-cream text-[#005BAB] border-2 border-[#005BAB] rounded-xl hover:bg-[#005BAB] hover:text-[#FFFFFF] transition-all active:scale-95 shadow-xs"
                                                    title={t.btnEdit}
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() => onDelete(app)}
                                                className="inline-flex items-center justify-center p-2 bg-trapda-white text-[#005BAB] border-2 border-[#005BAB] rounded-xl hover:bg-[#005BAB] hover:text-[#FFFFFF] transition-all active:scale-95 shadow-xs"
                                                title={t.btnDelete}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* REQUIREMENT 5: Footer Pagination Controls (Maks 8 data per halaman) */}
            {totalPages > 1 && (
                <div className="p-4 sm:p-5 bg-trapda-cream/50 border-t-2 border-[#005BAB] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs sm:text-sm font-bold text-[#005BAB]">
                        {t.showing} <span className="font-extrabold underline">{(validPage - 1) * ITEMS_PER_PAGE + 1}</span> {t.to} <span className="font-extrabold underline">{Math.min(validPage * ITEMS_PER_PAGE, applications.length)}</span> {t.fromTotal} <span className="font-extrabold underline">{applications.length}</span> {t.totalJobData}
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Tombol Sebelumnya */}
                        <button
                            type="button"
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            disabled={validPage === 1}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border-2 transition-all flex items-center space-x-1 ${
                                validPage === 1
                                    ? 'opacity-40 cursor-not-allowed bg-trapda-white border-[#005BAB]/30 text-[#005BAB]'
                                    : 'bg-trapda-cream text-[#005BAB] border-[#005BAB] hover:bg-[#005BAB] hover:text-[#FFFFFF] active:scale-95 shadow-xs'
                            }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>{t.btnPrev}</span>
                        </button>

                        {/* Angka Halaman */}
                        <div className="flex items-center space-x-1">
                            {pageNumbers.map((pg) => (
                                <button
                                    key={pg}
                                    type="button"
                                    onClick={() => setCurrentPage(pg)}
                                    className={`w-8 h-8 rounded-xl text-xs font-black border-2 transition-all flex items-center justify-center ${
                                        validPage === pg
                                            ? 'bg-[#005BAB] text-[#FFFFFF] border-[#005BAB] shadow-md scale-105'
                                            : 'bg-trapda-white text-[#005BAB] border-[#005BAB]/40 hover:border-[#005BAB] hover:bg-trapda-cream'
                                    }`}
                                >
                                    {pg}
                                </button>
                            ))}
                        </div>

                        {/* Tombol Selanjutnya */}
                        <button
                            type="button"
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={validPage === totalPages}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border-2 transition-all flex items-center space-x-1 ${
                                validPage === totalPages
                                    ? 'opacity-40 cursor-not-allowed bg-trapda-white border-[#005BAB]/30 text-[#005BAB]'
                                    : 'bg-trapda-cream text-[#005BAB] border-[#005BAB] hover:bg-[#005BAB] hover:text-[#FFFFFF] active:scale-95 shadow-xs'
                            }`}
                        >
                            <span>{t.btnNext}</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
