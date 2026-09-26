import React from 'react';
import { Building, MapPin, Calendar, Edit3, Trash2, CheckCircle2, Clock, Send, XCircle, AlertTriangle } from 'lucide-react';

// ─── Palet warna status ────────────────────────────────────────────────────────
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

function StatusBadge({ status }) {
    const c    = STATUS_COLORS[status] ?? STATUS_COLORS['Ditolak'];
    const Icon = STATUS_ICONS[status]  ?? XCircle;
    return (
        <span
            className="inline-flex items-center space-x-1 px-3 py-1 text-xs font-black rounded-full shadow-sm"
            style={{ backgroundColor: c.bg, border: `1.5px solid ${c.border}`, color: c.text }}
        >
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{status}</span>
        </span>
    );
}

export default function JobCard({ application, onEdit, onDelete, onQuickStatusChange, isUpdating }) {
    const { id, position_name, company_name, location, status, applied_at_formatted } = application;

    const statusList = ['Dikirim', 'Wawancara', 'Diterima', 'Ditolak', '(Wawancara) Ditolak'];

    return (
        <div className="bg-trapda-white border-2 border-[#005BAB] rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 relative overflow-hidden group">
            {/* Top Row: Position & Status Badge */}
            <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#005BAB] leading-snug group-hover:underline">
                        {position_name}
                    </h3>
                    <div className="flex-shrink-0">
                        <StatusBadge status={status} />
                    </div>
                </div>

                {/* Company Name & Location */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm font-bold text-[#005BAB]/80">
                    <div className="flex items-center space-x-1.5">
                        <Building className="w-4 h-4 text-[#005BAB]" />
                        <span>{company_name}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                        <MapPin className="w-4 h-4 text-[#005BAB]" />
                        <span>{location}</span>
                    </div>
                </div>

                {/* Applied Date */}
                <div className="mt-3 inline-flex items-center space-x-1.5 text-xs font-semibold text-[#005BAB]/70 bg-trapda-cream px-3 py-1 rounded-xl border border-[#005BAB]/30">
                    <Calendar className="w-3.5 h-3.5 text-[#005BAB]" />
                    <span>Dilamar pada: {applied_at_formatted}</span>
                </div>
            </div>

            {/* Quick Status Change Section */}
            <div className="pt-3 border-t-2 border-[#FFF3DD]">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold text-[#005BAB] uppercase tracking-wider">
                        Ubah Status Cepat:
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {statusList.map((st) => {
                        const isActive = status === st;
                        const c = STATUS_COLORS[st] ?? STATUS_COLORS['Ditolak'];
                        const Icon = STATUS_ICONS[st] ?? XCircle;
                        return (
                            <button
                                key={st}
                                type="button"
                                disabled={isUpdating || isActive}
                                onClick={() => onQuickStatusChange(id, st)}
                                className="py-1.5 px-2 text-[11px] font-extrabold rounded-xl border-2 transition-all flex items-center justify-center space-x-1"
                                style={
                                    isActive
                                        ? { backgroundColor: c.bg, borderColor: c.border, color: c.text, cursor: 'default', opacity: 1 }
                                        : { backgroundColor: '#FFF3DD', borderColor: c.bg, color: c.bg }
                                }
                            >
                                <Icon className="w-3 h-3 flex-shrink-0" />
                                <span>{st}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Actions: Edit & Delete */}
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#FFF3DD]">
                <button
                    type="button"
                    onClick={() => onEdit(application)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-trapda-cream text-[#005BAB] border-2 border-[#005BAB] rounded-xl text-xs font-extrabold hover:bg-[#005BAB] hover:text-[#FFFFFF] transition-all active:scale-95"
                >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(application)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-trapda-white text-[#005BAB] border-2 border-[#005BAB] rounded-xl text-xs font-extrabold hover:bg-[#005BAB] hover:text-[#FFFFFF] transition-all active:scale-95"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                </button>
            </div>
        </div>
    );
}
