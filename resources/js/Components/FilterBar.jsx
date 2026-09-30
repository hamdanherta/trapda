import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, MapPin, Briefcase, ArrowUpDown, RefreshCw, Building2, Calendar, Globe, ChevronDown } from 'lucide-react';
import { translations, translateData } from '../Utils/translations';

// Custom Scrollable Dropdown Select Component
function CustomSelect({ icon: Icon, value, options, onChange, placeholder, minWidth = "min-w-[140px]" }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => String(opt.value) === String(value)) || options[0];

    return (
        <div ref={containerRef} className={`relative w-full md:w-auto ${minWidth}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full pl-9 pr-7 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all flex items-center justify-between text-left cursor-pointer truncate shadow-xs"
            >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#005BAB]">
                    <Icon className="w-4 h-4" />
                </div>
                <span className="truncate">{selectedOption?.label || placeholder}</span>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#005BAB]">
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 mt-1 z-50 max-h-52 overflow-y-auto bg-trapda-white border-2 border-[#005BAB] rounded-2xl shadow-xl py-1 divide-y divide-[#FFF3DD] animate-fade-in min-w-[180px]">
                    {options.map((opt) => {
                        const isSelected = String(opt.value) === String(value);
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-colors block break-words whitespace-normal leading-snug ${
                                    isSelected
                                        ? 'bg-[#005BAB] text-[#FFFFFF] font-extrabold'
                                        : 'text-[#005BAB] hover:bg-trapda-cream'
                                }`}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function FilterBar({ filters, uniqueLocations = [], uniquePositions = [], uniquePlatforms = [], stats = {}, onFilterChange, onReset, lang = 'id' }) {
    const t = translations[lang] || translations.id;

    const dateFilterOptions = [
        { label: `${t.allDates} (${stats?.total_all ?? 0})`, value: '' },
        { label: `${t.applyToday} (${stats?.total_today ?? 0})`, value: 'hari_ini' },
        { label: `${t.applyThisWeek} (${stats?.total_this_week ?? 0})`, value: 'minggu_ini' },
        { label: `${t.applyThisMonth} (${stats?.total_this_month ?? 0})`, value: 'bulan_ini' },
    ];

    const defaultPlatforms = ['Email', 'LinkedIn', 'Glints', 'Jobstreet', 'Indeed', 'GForm'];
    const mergedPlatforms = Array.from(new Set([...defaultPlatforms, ...uniquePlatforms])).filter(Boolean);

    const platformOptions = [
        { label: t.allPlatforms, value: '' },
        ...mergedPlatforms.map(p => ({ label: p, value: p }))
    ];

    const statusOptions = [
        { label: t.allStatus,                    value: '' },
        { label: translateData('Dikirim', lang),               value: 'Dikirim' },
        { label: translateData('Wawancara', lang),             value: 'Wawancara' },
        { label: translateData('Diterima', lang),              value: 'Diterima' },
        { label: translateData('Ditolak', lang),               value: 'Ditolak' },
        { label: translateData('(Wawancara) Ditolak', lang),   value: '(Wawancara) Ditolak' },
    ];

    const workTypeOptions = [
        { label: t.allWorkTypes,                     value: '' },
        { label: translateData('Onsite (WFO)', lang),     value: 'Onsite (WFO)' },
        { label: translateData('Offsite (Remote)', lang), value: 'Offsite (Remote)' },
    ];

    const locationOptions = [
        { label: t.allLocations, value: '' },
        ...uniqueLocations.map(loc => ({ label: loc, value: loc }))
    ];

    const positionOptions = [
        { label: t.allPositions, value: '' },
        ...uniquePositions.map(pos => ({ label: pos, value: pos }))
    ];

    const sortOptions = [
        { label: t.sortTerbaru, value: 'terbaru' },
        { label: t.sortTerlama, value: 'terlama' },
    ];

    return (
        <div className="bg-trapda-white border-2 border-[#005BAB] rounded-3xl p-4 sm:p-6 mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#FFF3DD]">
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-trapda-cream border-2 border-[#005BAB] rounded-xl">
                        <Filter className="w-4 h-4 text-[#005BAB]" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#005BAB]">
                        {t.searchFilterTitle}
                    </h3>
                </div>

                {/* REQUIREMENT: Tombol reset filter warna MERAH */}
                <button
                    onClick={onReset}
                    type="button"
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#D70000] border-2 border-[#a80000] rounded-xl text-xs font-extrabold text-[#FFFFFF] hover:bg-[#a80000] transition-all active:scale-95 flex-shrink-0 shadow-xs"
                >
                    <RefreshCw className="w-3.5 h-3.5 text-[#FFFFFF]" />
                    <span>{t.resetFilter}</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap gap-3 items-stretch md:items-center">
                {/* Search Bar */}
                <div className="flex-1 min-w-[200px] relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#005BAB]">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={filters.search || ''}
                        onChange={(e) => onFilterChange('search', e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] placeholder-[#005BAB]/50 focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all"
                    />
                </div>

                {/* Filter Waktu Apply */}
                <CustomSelect
                    icon={Calendar}
                    value={filters.date_filter || ''}
                    options={dateFilterOptions}
                    onChange={(val) => onFilterChange('date_filter', val)}
                    placeholder={t.allDates}
                    minWidth="min-w-[170px]"
                />

                {/* Filter Platform */}
                <CustomSelect
                    icon={Globe}
                    value={filters.platform || ''}
                    options={platformOptions}
                    onChange={(val) => onFilterChange('platform', val)}
                    placeholder={t.allPlatforms}
                    minWidth="min-w-[150px]"
                />

                {/* Filter Status */}
                <CustomSelect
                    icon={Filter}
                    value={filters.status || ''}
                    options={statusOptions}
                    onChange={(val) => onFilterChange('status', val)}
                    placeholder={t.allStatus}
                    minWidth="min-w-[140px]"
                />

                {/* Filter Jenis Pekerjaan */}
                <CustomSelect
                    icon={Building2}
                    value={filters.work_type || ''}
                    options={workTypeOptions}
                    onChange={(val) => onFilterChange('work_type', val)}
                    placeholder={t.allWorkTypes}
                    minWidth="min-w-[160px]"
                />

                {/* REQUIREMENT: Filter Lokasi (Scrollable max-h-52) */}
                <CustomSelect
                    icon={MapPin}
                    value={filters.location || ''}
                    options={locationOptions}
                    onChange={(val) => onFilterChange('location', val)}
                    placeholder={t.allLocations}
                    minWidth="min-w-[140px]"
                />

                {/* REQUIREMENT: Filter Posisi (Scrollable max-h-52, tidak memanjang bawah) */}
                <CustomSelect
                    icon={Briefcase}
                    value={filters.position || ''}
                    options={positionOptions}
                    onChange={(val) => onFilterChange('position', val)}
                    placeholder={t.allPositions}
                    minWidth="min-w-[140px]"
                />

                {/* Sort Order */}
                <CustomSelect
                    icon={ArrowUpDown}
                    value={filters.sort || 'terbaru'}
                    options={sortOptions}
                    onChange={(val) => onFilterChange('sort', val)}
                    placeholder={t.sortTerbaru}
                    minWidth="min-w-[130px]"
                />
            </div>
        </div>
    );
}
