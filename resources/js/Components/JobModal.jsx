import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Briefcase, MapPin, Building, Calendar, CheckCircle, Tag, Send, Users, CheckCircle2, XCircle, AlertTriangle, Building2, Laptop, Globe } from 'lucide-react';
import { translations, translateData } from '../Utils/translations';

const PRESET_PLATFORMS = ['Email', 'LinkedIn', 'Glints', 'Jobstreet', 'Indeed', 'GForm'];

export default function JobModal({ isOpen, onClose, application = null, onSuccess, onError, lang = 'id', uniquePositions = [], uniqueLocations = [] }) {
    const t = translations[lang] || translations.id;
    const isEdit = Boolean(application);

    const positionOptions = Array.from(new Set(uniquePositions.filter(Boolean)));
    const locationOptions = Array.from(new Set(uniqueLocations.filter(Boolean)));

    const getCurrentLocalDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day  = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [isCustomPlatform, setIsCustomPlatform] = useState(false);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        position_name: '',
        company_name:  '',
        location:      '',
        work_type:     'Onsite (WFO)',
        platform:      'Email',
        status:        'Dikirim',
        applied_at:    getCurrentLocalDate(),
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (application) {
                let formattedAppliedAt = getCurrentLocalDate();
                if (application.applied_at) {
                    const dateObj = new Date(application.applied_at);
                    if (!isNaN(dateObj.getTime())) {
                        const yr = dateObj.getFullYear();
                        const mo = String(dateObj.getMonth() + 1).padStart(2, '0');
                        const da = String(dateObj.getDate()).padStart(2, '0');
                        formattedAppliedAt = `${yr}-${mo}-${da}`;
                    }
                }
                const appPlatform = application.platform || 'Email';
                const isPreset = PRESET_PLATFORMS.includes(appPlatform);
                setIsCustomPlatform(!isPreset);

                setData({
                    position_name: application.position_name || '',
                    company_name:  application.company_name  || '',
                    location:      application.location      || '',
                    work_type:     application.work_type     || 'Onsite (WFO)',
                    platform:      appPlatform,
                    status:        application.status        || 'Dikirim',
                    applied_at:    formattedAppliedAt,
                });
            } else {
                setIsCustomPlatform(false);
                setData({
                    position_name: '',
                    company_name:  '',
                    location:      '',
                    work_type:     'Onsite (WFO)',
                    platform:      'Email',
                    status:        'Dikirim',
                    applied_at:    getCurrentLocalDate(),
                });
            }
        }
    }, [isOpen, application]);

    if (!isOpen) return null;

    const handleWorkTypeChange = (wtId) => {
        if (wtId === 'Offsite (Remote)') {
            setData((prev) => ({
                ...prev,
                work_type: wtId,
                location: 'Remote',
            }));
        } else {
            setData((prev) => ({
                ...prev,
                work_type: wtId,
                location: prev.location === 'Remote' ? '' : prev.location,
            }));
        }
    };

    const handlePlatformSelect = (pName) => {
        if (pName === 'Lainnya') {
            setIsCustomPlatform(true);
            setData('platform', '');
        } else {
            setIsCustomPlatform(false);
            setData('platform', pName);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure location is set to Remote if Offsite (Remote)
        let finalLocation = data.location;
        if (data.work_type === 'Offsite (Remote)') {
            finalLocation = 'Remote';
        }

        const payload = {
            ...data,
            location: finalLocation,
            platform: data.platform || 'Email',
        };

        if (isEdit) {
            put('/job-applications/' + application.id, {
                data: payload,
                onSuccess: () => { onClose(); onSuccess('Data lamaran kerja berhasil diperbarui!'); },
                onError:   () => { onError('Gagal menyimpan data. Harap periksa kembali input formulir Anda.'); },
            });
        } else {
            post('/job-applications', {
                data: payload,
                onSuccess: () => { onClose(); reset(); onSuccess('Lamaran kerja baru berhasil ditambahkan!'); },
                onError:   () => { onError('Gagal menambah lamaran. Harap periksa kembali input formulir Anda.'); },
            });
        }
    };

    const statusOptions = [
        {
            id:    'Dikirim',
            label: translateData('Dikirim', lang),
            icon:  Send,
            selectedStyle:   { backgroundColor: '#007FD3', borderColor: '#005fa3', color: '#ffffff' },
            unselectedStyle: { backgroundColor: '#e8f4fb', borderColor: '#007FD3', color: '#005fa3' },
        },
        {
            id:    'Wawancara',
            label: translateData('Wawancara', lang),
            icon:  Users,
            selectedStyle:   { backgroundColor: '#DAA000', borderColor: '#b38200', color: '#ffffff' },
            unselectedStyle: { backgroundColor: '#fdf6e0', borderColor: '#DAA000', color: '#8a6500' },
        },
        {
            id:    'Diterima',
            label: translateData('Diterima', lang),
            icon:  CheckCircle2,
            selectedStyle:   { backgroundColor: '#4CBE00', borderColor: '#3a9400', color: '#ffffff' },
            unselectedStyle: { backgroundColor: '#edfbe0', borderColor: '#4CBE00', color: '#2d7a00' },
        },
        {
            id:    'Ditolak',
            label: translateData('Ditolak', lang),
            icon:  XCircle,
            selectedStyle:   { backgroundColor: '#D70000', borderColor: '#a80000', color: '#ffffff' },
            unselectedStyle: { backgroundColor: '#fce8e8', borderColor: '#D70000', color: '#9a0000' },
        },
        {
            id:    '(Wawancara) Ditolak',
            label: translateData('(Wawancara) Ditolak', lang),
            icon:  AlertTriangle,
            selectedStyle:   { backgroundColor: '#700000', borderColor: '#500000', color: '#ffffff' },
            unselectedStyle: { backgroundColor: '#f5e0e0', borderColor: '#700000', color: '#500000' },
        },
    ];

    const workTypeOptions = [
        { id: 'Onsite (WFO)', label: translateData('Onsite (WFO)', lang), icon: Building2 },
        { id: 'Offsite (Remote)', label: translateData('Offsite (Remote)', lang), icon: Laptop },
    ];

    const isOffsiteRemote = data.work_type === 'Offsite (Remote)';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#005BAB]/50 backdrop-blur-xs animate-fade-in overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-trapda-white border-2 border-[#005BAB] rounded-3xl p-6 sm:p-8 shadow-2xl animate-pop-in my-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-[#FFF3DD]">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl">
                            <Briefcase className="w-6 h-6 text-[#005BAB]" />
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold text-[#005BAB]">
                                {isEdit ? t.modalEditTitle : t.modalAddTitle}
                            </h3>
                            <p className="text-xs font-semibold text-[#005BAB]/70">
                                {isEdit ? 'Perbarui informasi lamaran pekerjaan Anda' : 'Isi formulir detail lamaran kerja yang baru saja Anda lamar'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} type="button" className="p-1.5 rounded-full text-[#005BAB] hover:bg-trapda-cream transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form 2-Column Grid Layout */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* 1. Nama Posisi */}
                        <div>
                            <label className="block text-xs font-extrabold text-[#005BAB] uppercase tracking-wider mb-1">
                                {t.fieldPositionName} <span className="text-[#005BAB]">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#005BAB]">
                                    <Tag className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    list="position-list-suggestions"
                                    value={data.position_name}
                                    onChange={(e) => setData('position_name', e.target.value)}
                                    placeholder={t.placeholderPosition}
                                    className="w-full pl-10 pr-4 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] placeholder-[#005BAB]/40 focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all"
                                    autoComplete="off"
                                />
                                <datalist id="position-list-suggestions">
                                    {positionOptions.map((pos, idx) => (
                                        <option key={idx} value={pos} />
                                    ))}
                                </datalist>
                            </div>
                            {errors.position_name && <p className="mt-1 text-xs font-bold text-red-600">{errors.position_name}</p>}
                        </div>

                        {/* 2. Nama Perusahaan */}
                        <div>
                            <label className="block text-xs font-extrabold text-[#005BAB] uppercase tracking-wider mb-1">
                                {t.fieldCompanyName} <span className="text-[#005BAB]">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#005BAB]">
                                    <Building className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    placeholder={t.placeholderCompany}
                                    className="w-full pl-10 pr-4 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] placeholder-[#005BAB]/40 focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all"
                                />
                            </div>
                            {errors.company_name && <p className="mt-1 text-xs font-bold text-red-600">{errors.company_name}</p>}
                        </div>

                        {/* 3. Jenis Pekerjaan */}
                        <div>
                            <label className="block text-xs font-extrabold text-[#005BAB] uppercase tracking-wider mb-1">
                                {t.fieldWorkType} <span className="text-[#005BAB]">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {workTypeOptions.map((wtOpt) => {
                                    const IconComp = wtOpt.icon;
                                    const isSelected = data.work_type === wtOpt.id;
                                    return (
                                        <button
                                            key={wtOpt.id}
                                            type="button"
                                            onClick={() => handleWorkTypeChange(wtOpt.id)}
                                            className={`py-2 px-3 border-2 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition-all ${
                                                isSelected
                                                    ? 'bg-[#005BAB] text-[#FFFFFF] border-[#005BAB] shadow-sm'
                                                    : 'bg-trapda-cream text-[#005BAB] border-[#005BAB]/40 hover:border-[#005BAB]'
                                            }`}
                                        >
                                            <IconComp className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span className="truncate">{wtOpt.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.work_type && <p className="mt-1 text-xs font-bold text-red-600">{errors.work_type}</p>}
                        </div>

                        {/* REQUIREMENT 7: jika select jenis pekerjan Offsite(Remote), maka form Lokasi Hilang */}
                        {!isOffsiteRemote && (
                            <div>
                                <label className="block text-xs font-extrabold text-[#005BAB] uppercase tracking-wider mb-1">
                                    {t.fieldLocation} <span className="text-[#005BAB]">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#005BAB]">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        required={!isOffsiteRemote}
                                        list="location-list-suggestions"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder={t.placeholderLocation}
                                        className="w-full pl-10 pr-4 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] placeholder-[#005BAB]/40 focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all"
                                        autoComplete="off"
                                    />
                                    <datalist id="location-list-suggestions">
                                        {locationOptions.map((loc, idx) => (
                                            <option key={idx} value={loc} />
                                        ))}
                                    </datalist>
                                </div>
                                {errors.location && <p className="mt-1 text-xs font-bold text-red-600">{errors.location}</p>}
                            </div>
                        )}

                        {/* Tanggal Apply */}
                        <div className={isOffsiteRemote ? "" : "sm:col-span-2"}>
                            <label className="block text-xs font-extrabold text-[#005BAB] uppercase tracking-wider mb-1">
                                {t.fieldAppliedDate}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#005BAB]">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <input
                                    type="date"
                                    value={data.applied_at}
                                    onChange={(e) => setData('applied_at', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all"
                                />
                            </div>
                            {errors.applied_at && <p className="mt-1 text-xs font-bold text-red-600">{errors.applied_at}</p>}
                        </div>

                        {/* REQUIREMENT 3: Field Platform (email, glints, jobstreet, indeed, gform, lainnya isi sendiri) */}
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-extrabold text-[#005BAB] uppercase tracking-wider mb-1">
                                {t.fieldPlatform} <span className="text-[#005BAB]">*</span>
                            </label>

                            {/* Preset Buttons */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {PRESET_PLATFORMS.map((pName) => {
                                    const isSelected = !isCustomPlatform && data.platform === pName;
                                    return (
                                        <button
                                            key={pName}
                                            type="button"
                                            onClick={() => handlePlatformSelect(pName)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border-2 transition-all flex items-center space-x-1 ${
                                                isSelected
                                                    ? 'bg-[#005BAB] text-[#FFFFFF] border-[#005BAB] shadow-xs'
                                                    : 'bg-trapda-cream text-[#005BAB] border-[#005BAB]/40 hover:border-[#005BAB]'
                                            }`}
                                        >
                                            <Globe className="w-3 h-3 flex-shrink-0" />
                                            <span>{pName}</span>
                                        </button>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={() => handlePlatformSelect('Lainnya')}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border-2 transition-all ${
                                        isCustomPlatform
                                            ? 'bg-[#005BAB] text-[#FFFFFF] border-[#005BAB] shadow-xs'
                                            : 'bg-trapda-cream text-[#005BAB] border-[#005BAB]/40 hover:border-[#005BAB]'
                                    }`}
                                >
                                    + Lainnya (Isi Sendiri)
                                </button>
                            </div>

                            {/* Custom Input when 'Lainnya' selected */}
                            {isCustomPlatform && (
                                <div className="relative mt-2">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#005BAB]">
                                        <Globe className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        autoFocus
                                        value={data.platform}
                                        onChange={(e) => setData('platform', e.target.value)}
                                        placeholder="Ketik nama platform (contoh: LinkedIn, Website Perusahaan, Kalibrr...)"
                                        className="w-full pl-10 pr-4 py-2.5 bg-trapda-cream border-2 border-[#005BAB] rounded-xl text-xs sm:text-sm font-bold text-[#005BAB] placeholder-[#005BAB]/40 focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all"
                                    />
                                </div>
                            )}
                            {errors.platform && <p className="mt-1 text-xs font-bold text-red-600">{errors.platform}</p>}
                        </div>

                        {/* Status Sekarang (Full width 5 kolom horizontal) */}
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-extrabold text-[#005BAB] uppercase tracking-wider mb-1">
                                {t.fieldStatus} <span className="text-[#005BAB]">*</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {statusOptions.map((statusOpt) => {
                                    const IconComp  = statusOpt.icon;
                                    const isSelected = data.status === statusOpt.id;
                                    return (
                                        <button
                                            key={statusOpt.id}
                                            type="button"
                                            onClick={() => setData('status', statusOpt.id)}
                                            className="py-2.5 px-2 border-2 rounded-xl text-[11px] sm:text-xs font-extrabold flex flex-col items-center justify-center space-y-1 transition-all"
                                            style={isSelected ? statusOpt.selectedStyle : statusOpt.unselectedStyle}
                                        >
                                            <IconComp className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-center leading-tight">{statusOpt.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.status && <p className="mt-1 text-xs font-bold text-red-600">{errors.status}</p>}
                        </div>
                    </div>

                    {/* Form Action Buttons */}
                    <div className="pt-4 border-t-2 border-[#FFF3DD] flex items-center justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="px-5 py-2.5 bg-trapda-cream text-[#005BAB] border-2 border-[#005BAB] font-bold text-xs sm:text-sm rounded-xl hover:bg-trapda-cream/80 transition-all active:scale-95"
                        >
                            {t.btnCancel}
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-[#005BAB] text-[#FFFFFF] font-extrabold text-xs sm:text-sm rounded-xl hover:bg-[#005BAB]/90 transition-all active:scale-95 shadow-md flex items-center space-x-2"
                        >
                            {processing ? (
                                <span>Menyimpan...</span>
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    <span>{isEdit ? t.btnSaveChange : t.btnAddApp}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
