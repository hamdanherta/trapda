import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Briefcase, Lock, User, UserPlus, ArrowLeft } from 'lucide-react';
import NotificationModal from '../../Components/NotificationModal';

export default function Register() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    const [notification, setNotification] = useState({
        isOpen: Boolean(flash?.error),
        type: 'error',
        title: 'Gagal Mendaftar',
        message: flash?.error || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register', {
            onError: (err) => {
                const firstErrMsg = err.username || err.password || 'Gagal membuat akun, silakan periksa data input Anda.';
                setNotification({
                    isOpen: true,
                    type: 'error',
                    title: 'Pendaftaran Gagal',
                    message: firstErrMsg,
                });
            },
        });
    };

    return (
        <div className="min-h-screen bg-trapda-cream flex items-center justify-center p-4 sm:p-6 antialiased">
            <NotificationModal
                isOpen={notification.isOpen}
                type={notification.type}
                title={notification.title}
                message={notification.message}
                onClose={() => setNotification({ ...notification, isOpen: false })}
            />

            <div className="w-full max-w-md bg-trapda-white border-2 border-[#005BAB] rounded-3xl p-6 sm:p-8 shadow-2xl animate-pop-in relative overflow-hidden"
                 style={{ boxShadow: '0 20px 40px -15px rgba(0, 91, 171, 0.25)' }}>
                {/* Brand Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-[#005BAB] text-[#FFF3DD] border-2 border-[#005BAB] rounded-2xl shadow-md mb-3">
                        <Briefcase className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black text-[#005BAB] tracking-tight">
                        Buat Akun Trapda
                    </h1>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-[#005BAB]/70 mt-1">
                        Manajemen Lamaran Kerja
                    </p>
                    <p className="text-xs font-bold text-[#005BAB]/80 mt-2">
                        Daftar menggunakan username dan password pilihan Anda
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block text-xs font-extrabold text-[#005BAB] uppercase tracking-wider mb-1">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#005BAB]">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                required
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                placeholder="Pilih username unik (min. 3 karakter)"
                                className="w-full pl-10 pr-4 py-3 bg-trapda-cream border-2 border-[#005BAB] rounded-2xl text-sm font-bold text-[#005BAB] placeholder-[#005BAB]/40 focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all"
                            />
                        </div>
                        {errors.username && (
                            <p className="mt-1 text-xs font-bold text-[#005BAB]">{errors.username}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-extrabold text-[#005BAB] uppercase tracking-wider mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#005BAB]">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Buat password (min. 4 karakter)"
                                className="w-full pl-10 pr-4 py-3 bg-trapda-cream border-2 border-[#005BAB] rounded-2xl text-sm font-bold text-[#005BAB] placeholder-[#005BAB]/40 focus:outline-none focus:ring-2 focus:ring-[#005BAB] transition-all"
                            />
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs font-bold text-[#005BAB]">{errors.password}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3.5 px-4 bg-[#005BAB] text-[#FFFFFF] font-extrabold text-sm rounded-2xl hover:bg-[#005BAB]/90 transition-all active:scale-95 shadow-md flex items-center justify-center space-x-2 mt-6"
                    >
                        {processing ? (
                            <span>Mendaftarkan...</span>
                        ) : (
                            <>
                                <UserPlus className="w-4 h-4 text-[#FFF3DD]" />
                                <span>Daftar Akun Sekarang</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Switch to Login */}
                <div className="mt-8 pt-6 border-t-2 border-[#FFF3DD] text-center">
                    <p className="text-xs font-bold text-[#005BAB]/80 flex items-center justify-center space-x-1">
                        <ArrowLeft className="w-3.5 h-3.5 text-[#005BAB]" />
                        <span>Sudah punya akun? </span>
                        <Link
                            href="/login"
                            className="text-[#005BAB] font-black underline hover:text-[#005BAB]/80 transition-colors"
                        >
                            Masuk di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
