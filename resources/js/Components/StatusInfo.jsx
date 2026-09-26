import React from 'react';
import { Info, Send, Clock, CheckCircle2, XCircle, AlertTriangle, Building2, Laptop } from 'lucide-react';
import { translations, translateData } from '../Utils/translations';

export default function StatusInfo({ lang = 'id' }) {
    const t = translations[lang] || translations.id;

    const statuses = [
        {
            name: 'Dikirim',
            displayName: translateData('Dikirim', lang),
            bgColor: '#007FD3',
            borderColor: '#005fa3',
            icon: Send,
            desc: t.statusDikirimDesc,
        },
        {
            name: 'Wawancara',
            displayName: translateData('Wawancara', lang),
            bgColor: '#DAA000',
            borderColor: '#b38200',
            icon: Clock,
            desc: t.statusWawancaraDesc,
        },
        {
            name: 'Diterima',
            displayName: translateData('Diterima', lang),
            bgColor: '#4CBE00',
            borderColor: '#3a9400',
            icon: CheckCircle2,
            desc: t.statusDiterimaDesc,
        },
        {
            name: 'Ditolak',
            displayName: translateData('Ditolak', lang),
            bgColor: '#D70000',
            borderColor: '#a80000',
            icon: XCircle,
            desc: t.statusDitolakDesc,
        },
        {
            name: '(Wawancara) Ditolak',
            displayName: translateData('(Wawancara) Ditolak', lang),
            bgColor: '#700000',
            borderColor: '#500000',
            icon: AlertTriangle,
            desc: t.statusWawancaraDitolakDesc,
        },
    ];

    const workTypes = [
        {
            title: t.workTypeOnsiteTitle,
            typeBadge: translateData('Onsite (WFO)', lang),
            icon: Building2,
            borderColor: '#005BAB',
            bgColor: '#FFF3DD',
            desc: t.workTypeOnsiteDesc,
        },
        {
            title: t.workTypeOffsiteTitle,
            typeBadge: translateData('Offsite (Remote)', lang),
            icon: Laptop,
            borderColor: '#005BAB',
            bgColor: '#FFF3DD',
            desc: t.workTypeOffsiteDesc,
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in mb-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#005BAB] tracking-tight flex items-center space-x-3">
                    <Info className="w-8 h-8 text-[#005BAB]" />
                    <span>{t.statusInfoTitle}</span>
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-[#005BAB]/80 mt-1">
                    {t.statusInfoSub}
                </p>
            </div>

            {/* SECTION 1: Penjelasan 5 Status Lamaran */}
            <div className="bg-trapda-white border-2 border-[#005BAB] rounded-3xl p-6 shadow-lg">
                <h2 className="text-lg sm:text-xl font-black text-[#005BAB] mb-6 flex items-center space-x-2 border-b-2 border-[#FFF3DD] pb-3">
                    <span className="p-2 bg-trapda-cream border border-[#005BAB] rounded-xl text-[#005BAB]">
                        <Info className="w-5 h-5" />
                    </span>
                    <span>{t.statusSectionTitle}</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statuses.map((item, idx) => {
                        const IconComp = item.icon;
                        return (
                            <div
                                key={idx}
                                className="border-2 rounded-2xl p-5 bg-trapda-white transition-all hover:shadow-md flex flex-col justify-between"
                                style={{ borderColor: item.borderColor }}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-black text-white flex items-center space-x-1.5 shadow-xs"
                                            style={{
                                                backgroundColor: item.bgColor,
                                                border: `1.5px solid ${item.borderColor}`,
                                            }}
                                        >
                                            <IconComp className="w-4 h-4" />
                                            <span>{item.displayName}</span>
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm font-semibold text-[#005BAB]/90 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* SECTION 2: Penjelasan Sistem Jenis Pekerjaan */}
            <div className="bg-trapda-white border-2 border-[#005BAB] rounded-3xl p-6 shadow-lg">
                <h2 className="text-lg sm:text-xl font-black text-[#005BAB] mb-6 flex items-center space-x-2 border-b-2 border-[#FFF3DD] pb-3">
                    <span className="p-2 bg-trapda-cream border border-[#005BAB] rounded-xl text-[#005BAB]">
                        <Building2 className="w-5 h-5" />
                    </span>
                    <span>{t.workTypeSectionTitle}</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {workTypes.map((wt, idx) => {
                        const IconComp = wt.icon;
                        return (
                            <div
                                key={idx}
                                className="border-2 border-[#005BAB] rounded-2xl p-5 bg-trapda-cream/30 flex items-start space-x-4 transition-all hover:shadow-md"
                            >
                                <div className="p-3 bg-[#005BAB] text-[#FFF3DD] rounded-xl border-2 border-[#005BAB] flex-shrink-0 mt-1">
                                    <IconComp className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="px-2.5 py-0.5 bg-[#005BAB] text-[#FFFFFF] rounded-md text-[10px] font-black uppercase tracking-wider">
                                        {wt.typeBadge}
                                    </span>
                                    <h3 className="text-base sm:text-lg font-black text-[#005BAB] mt-1">
                                        {wt.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm font-semibold text-[#005BAB]/80 mt-2 leading-relaxed">
                                        {wt.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
