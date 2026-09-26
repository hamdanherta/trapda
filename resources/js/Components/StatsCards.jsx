import React from 'react';
import { Send, Users, AlertTriangle, XCircle, CheckCircle2, Trophy, TrendingUp, Layers } from 'lucide-react';
import { translations, translateData } from '../Utils/translations';

// ─── Palet warna — sama persis dengan label status ─────────────────────────
// Total All            → #FFFFFF
// Dikirim              → #007FD3
// Wawancara            → #DAA000
// (Wawancara) Ditolak  → #700000
// Ditolak              → #D70000
// Diterima             → #4CBE00
// ──────────────────────────────────────────────────────────────────────────

export default function StatsCards({ stats, lang = 'id' }) {
    const t = translations[lang] || translations.id;

    const cards = [
        {
            title:       t.cardTotalAllTitle,
            value:       stats?.total_all ?? 0,
            suffix:      'DATABASE',
            icon:        Layers,
            subtitle:    t.cardTotalAllSub,
            mainColor:   '#FFFFFF',
            borderColor: '#005BAB',
            tintColor:   '#FFF3DD',
            tintText:    '#005BAB',
            textColor:   '#005BAB',
        },
        {
            title:    t.cardSentTitle,
            value:    stats?.total_sent ?? 0,
            suffix:   translateData('Dikirim', lang),
            icon:     Send,
            subtitle: t.cardSentSub,
            mainColor:   '#007FD3',
            borderColor: '#005fa3',
            tintColor:   '#e8f4fb',
            tintText:    '#005fa3',
            textColor:   '#ffffff',
        },
        {
            title:    t.cardInterviewTitle,
            value:    stats?.total_interview ?? 0,
            suffix:   translateData('Wawancara', lang),
            icon:     Users,
            subtitle: t.cardInterviewSub,
            mainColor:   '#DAA000',
            borderColor: '#b38200',
            tintColor:   '#fdf6e0',
            tintText:    '#7a5900',
            textColor:   '#ffffff',
        },
        {
            title:    t.cardWawancaraDitolakTitle,
            value:    stats?.total_wawancara_ditolak ?? 0,
            suffix:   translateData('(Wawancara) Ditolak', lang),
            icon:     AlertTriangle,
            subtitle: t.cardWawancaraDitolakSub,
            mainColor:   '#700000',
            borderColor: '#500000',
            tintColor:   '#f5e0e0',
            tintText:    '#500000',
            textColor:   '#ffffff',
        },
        {
            title:    t.cardDitolakTitle,
            value:    stats?.total_ditolak ?? 0,
            suffix:   translateData('Ditolak', lang),
            icon:     XCircle,
            subtitle: t.cardDitolakSub,
            mainColor:   '#D70000',
            borderColor: '#a80000',
            tintColor:   '#fce8e8',
            tintText:    '#9a0000',
            textColor:   '#ffffff',
        },
        {
            title:    t.cardAcceptedTitle,
            value:    stats?.total_accepted ?? 0,
            suffix:   translateData('Diterima', lang),
            icon:     CheckCircle2,
            mainColor:   '#4CBE00',
            borderColor: '#3a9400',
            tintColor:   '#edfbe0',
            tintText:    '#2d7a00',
            textColor:   '#ffffff',
        },
    ];

    const winrate = stats?.winrate ?? 0;
    const totalAccepted = stats?.total_accepted ?? 0;
    const totalAll = stats?.total_all ?? 0;

    return (
        <div className="space-y-6 mb-8">
            {/* Grid Status Cards (6 Cards = 3 Kolom 2 Baris) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {cards.map((card, idx) => {
                    const IconComponent = card.icon;
                    return (
                        <div
                            key={idx}
                            className="relative rounded-3xl p-5 border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                            style={{
                                backgroundColor: card.mainColor,
                                borderColor:     card.borderColor,
                                color:           card.textColor,
                            }}
                        >
                            {/* Top row: badge + icon */}
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                                    style={{
                                        backgroundColor: card.tintColor,
                                        borderColor:     card.borderColor,
                                        color:           card.tintText,
                                    }}
                                >
                                    {card.suffix}
                                </span>
                                <div
                                    className="p-2.5 rounded-2xl border-2"
                                    style={{
                                        backgroundColor: card.tintColor,
                                        borderColor:     card.borderColor,
                                        color:           card.tintText,
                                    }}
                                >
                                    <IconComponent className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="mt-4">
                                <h4 className="text-xs font-extrabold uppercase tracking-wider opacity-90 leading-tight">
                                    {card.title}
                                </h4>
                                <div className="flex items-baseline space-x-2 mt-1">
                                    <span className="text-4xl font-black tracking-tight">
                                        {card.value}
                                    </span>
                                </div>
                                {card.subtitle && (
                                    <p className="mt-2 text-xs font-bold opacity-80">
                                        {card.subtitle}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* BARIS BARU: Card WinRate Keberhasilan Diterima */}
            <div className="bg-trapda-white border-2 border-[#005BAB] rounded-3xl p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-200 hover:shadow-xl">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="p-4 bg-[#005BAB] text-[#FFF3DD] rounded-2xl border-2 border-[#005BAB] shadow-md flex-shrink-0">
                        <Trophy className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="px-2.5 py-0.5 bg-trapda-cream border border-[#005BAB] text-[#005BAB] rounded-full text-[10px] font-black uppercase tracking-wider">
                                {t.ratioTag}
                            </span>
                            <span className="text-xs font-bold text-[#005BAB]/70 flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5 text-[#4CBE00]" /> {t.highPerf}
                            </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-[#005BAB] tracking-tight mt-1">
                            {t.winrateTitle}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#005BAB]/80">
                            {t.winrateSub}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-4 bg-trapda-cream border-2 border-[#005BAB] rounded-2xl px-6 py-3.5 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="text-right">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-[#005BAB]/70">
                            {t.totalSuccessLabel}
                        </div>
                        <div className="text-sm font-black text-[#005BAB]">
                            {totalAccepted} / {totalAll} {t.jobCountSuffix}
                        </div>
                    </div>
                    <div className="h-10 w-0.5 bg-[#005BAB]/30 hidden sm:block" />
                    <div className="text-center sm:text-left">
                        <span className="text-3xl sm:text-4xl font-black text-[#4CBE00] tracking-tight">
                            {winrate}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}


