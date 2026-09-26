import React from 'react';
import { Search, Filter, MapPin, Briefcase, ArrowUpDown, RefreshCw, Building2 } from 'lucide-react';
import { translations, translateData } from '../Utils/translations';

export default function FilterBar({ filters, uniqueLocations, uniquePositions, onFilterChange, onReset, lang = 'id' }) {
    const t = translations[lang] || translations.id;

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

                <button
                    onClick={onReset}
                    type="button"
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs font-extrabold text-[#005BAB] hover:bg-[#005BAB] hover:text-[#FFFFFF] transition-all active:scale-95 flex-shrink-0"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
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

                {/* Filter Status */}
                <div className="w-full md:w-auto min-w-[150px] relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#005BAB]">
                        <Filter className="w-4 h-4" />
                    </div>
                    <select
                        value={filters.status || ''}
                        onChange={(e) => onFilterChange('status', e.target.value)}
                        className="w-full pl-9 pr-7 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all appearance-none cursor-pointer text-ellipsis overflow-hidden"
                    >
                        {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filter Jenis Pekerjaan */}
                <div className="w-full md:w-auto min-w-[170px] relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#005BAB]">
                        <Building2 className="w-4 h-4" />
                    </div>
                    <select
                        value={filters.work_type || ''}
                        onChange={(e) => onFilterChange('work_type', e.target.value)}
                        className="w-full pl-9 pr-7 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all appearance-none cursor-pointer text-ellipsis overflow-hidden"
                    >
                        {workTypeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filter Lokasi */}
                <div className="w-full md:w-auto min-w-[140px] relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#005BAB]">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <select
                        value={filters.location || ''}
                        onChange={(e) => onFilterChange('location', e.target.value)}
                        className="w-full pl-9 pr-7 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all appearance-none cursor-pointer text-ellipsis overflow-hidden"
                    >
                        <option value="">{t.allLocations}</option>
                        {uniqueLocations.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filter Posisi */}
                <div className="w-full md:w-auto min-w-[140px] relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#005BAB]">
                        <Briefcase className="w-4 h-4" />
                    </div>
                    <select
                        value={filters.position || ''}
                        onChange={(e) => onFilterChange('position', e.target.value)}
                        className="w-full pl-9 pr-7 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all appearance-none cursor-pointer text-ellipsis overflow-hidden"
                    >
                        <option value="">{t.allPositions}</option>
                        {uniquePositions.map((pos) => (
                            <option key={pos} value={pos}>
                                {pos}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Order */}
                <div className="w-full md:w-auto min-w-[130px] relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#005BAB]">
                        <ArrowUpDown className="w-4 h-4" />
                    </div>
                    <select
                        value={filters.sort || 'terbaru'}
                        onChange={(e) => onFilterChange('sort', e.target.value)}
                        className="w-full pl-9 pr-7 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all appearance-none cursor-pointer"
                    >
                        {sortOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}


