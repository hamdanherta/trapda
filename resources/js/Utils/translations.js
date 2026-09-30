// System Translation Dictionary (Indonesian & English)

export const translations = {
    id: {
        // App / Brand
        brandName: "Trapda",
        brandSubtitle: "Aplikasi Manajemen Lamaran by Herta Devlabs",
        userActive: "Akun Aktif",
        logout: "Keluar / Logout",
        
        // Navigation Tabs
        kelolaDataTab: "Kelola Data Lamaran",
        statistikTab: "Ringkasan Statistik",
        informasiStatusTab: "Informasi Status",
        
        // Header
        greeting: "Halo,",
        dashboardHeaderSub: "Pantau dan kelola seluruh riwayat lamaran pekerjaan Anda di satu tempat.",
        
        // Kelola Data Page
        kelolaTitle: "Halaman Kelola Data Lamaran",
        kelolaSub: "Cari, filter, edit, dan perbarui daftar riwayat seluruh lamaran kerja Anda.",
        noDataTitle: "Tidak Ada Data Lamaran",
        noDataSub: "Belum ada lamaran kerja yang sesuai dengan filter atau kata kunci Anda. Silakan atur ulang filter pencarian Anda.",
        downloadPdfReport: "Unduh Laporan PDF",
        
        // Filter Bar
        searchPlaceholder: "Cari perusahaan, posisi, atau lokasi...",
        allStatus: "Semua Status",
        allLocations: "Semua Lokasi",
        allPositions: "Semua Posisi",
        allPlatforms: "Semua Platform",
        allWorkTypes: "Semua Jenis Pekerjaan",
        allDates: "Semua Waktu",
        applyToday: "Apply Hari Ini",
        applyThisWeek: "Apply Minggu Ini",
        applyThisMonth: "Apply Bulan Ini",
        sortTerbaru: "Terbaru",
        sortTerlama: "Terlama",
        resetFilter: "Reset Filter",
        searchFilterTitle: "Pencarian & Filter Lamaran",
        
        // Job Table Columns
        colNo: "No",
        colPosition: "Posisi",
        colLocation: "Lokasi",
        colWorkType: "Jenis Pekerjaan",
        colPlatform: "Platform",
        colStatus: "Status",
        colCompany: "Perusahaan",
        colAppliedDate: "Tanggal Apply",
        colAction: "Aksi",
        btnEdit: "Edit",
        btnDelete: "Hapus",
        
        // Pagination
        showing: "Menampilkan",
        to: "-",
        fromTotal: "dari",
        totalJobData: "data lamaran",
        btnPrev: "Sebelumnya",
        btnNext: "Selanjutnya",
        
        // Stats Cards Page
        statsTitle: "Ringkasan & Statistik Data Lamaran",
        statsSub: "Pantau indikator keberhasilan dan statistik penerimaan kerja Anda secara menyeluruh.",
        
        // Status Cards
        cardTotalAllTitle: "Total Seluruh Lamaran",
        cardTotalAllSub: "Jumlah semua data lamaran di database",
        cardApplyTodayTitle: "Apply Hari Ini",
        cardApplyTodaySub: "Lamaran yang dikirim hari ini",
        cardApplyWeekTitle: "Apply Minggu Ini",
        cardApplyWeekSub: "Lamaran yang dikirim minggu ini",
        cardApplyMonthTitle: "Apply Bulan Ini",
        cardApplyMonthSub: "Lamaran yang dikirim bulan ini",
        cardSentTitle: "Total Lamaran Dikirim",
        cardSentSub: "Lamaran yang sudah dikirim",
        cardInterviewTitle: "Sedang Tahap Wawancara",
        cardInterviewSub: "Lamaran yang aktif di tahap interview",
        cardWawancaraDitolakTitle: "Ditolak (usai Wawancara)",
        cardWawancaraDitolakSub: "Setelah Wawancara Tidak ada Kabar Lagi",
        cardDitolakTitle: "Total Ditolak",
        cardDitolakSub: "Setelah Dikirim Tidak ada Kabar Interview",
        cardAcceptedTitle: "Total Diterima Kerja",
        
        // WinRate Card
        ratioTag: "Rasio Kelulusan",
        highPerf: "Performa Tinggi",
        winrateTitle: "WinRate Keberhasilan Diterima",
        winrateSub: "Persentase total lamaran kerja yang berhasil diterima dibanding seluruh lamaran.",
        totalSuccessLabel: "Total Berhasil",
        jobCountSuffix: "Lamaran",

        // Status Info Page
        statusInfoTitle: "Pusat Informasi Status & Jenis Pekerjaan",
        statusInfoSub: "Pelajari arti dari 5 indikator warna status lamaran dan 2 sistem jenis pekerjaan.",
        statusSectionTitle: "Penjelasan 5 Label Status Lamaran",
        workTypeSectionTitle: "Penjelasan Sistem Jenis Pekerjaan",

        // 5 Status Descriptions
        statusDikirimDesc: "Lamaran pekerjaan telah dikirimkan ke perusahaan dan sedang menunggu proses peninjauan awal oleh tim rekruter/HRD.",
        statusWawancaraDesc: "Selamat! Lamaran Anda lolos seleksi berkas awal dan Anda diundang untuk mengikuti sesi wawancara (interview).",
        statusDiterimaDesc: "Selamat! Anda dinyatakan lulus seluruh rangkaian seleksi dan telah menerima penawaran kerja (Offer Letter).",
        statusDitolakDesc: "Lamaran belum berhasil pada tahap peninjauan berkas atau kualifikasi belum sesuai dengan kebutuhan perusahaan saat ini.",
        statusWawancaraDitolakDesc: "Proses lamaran dihentikan setelah mengikuti sesi wawancara (tidak lolos tahap interview/wawancara lanjutan). Atau Tidak Menghadiri Proses Interview.",

        // Work Types Descriptions
        workTypeOnsiteTitle: "Onsite (WFO - Work From Office)",
        workTypeOnsiteDesc: "Sistem kerja konvensional di mana karyawan diwajibkan untuk datang dan melakukan seluruh aktivitas pekerjaan langsung dari lokasi fisik kantor perusahaan setiap hari kerja.",
        workTypeOffsiteTitle: "Offsite (Remote / WFH)",
        workTypeOffsiteDesc: "Sistem kerja fleksibel / jarak jauh di mana karyawan dapat bekerja dari mana saja (rumah, cafe, atau lokasi lain) tanpa harus hadir secara fisik di kantor perusahaan.",

        // Modals (Add / Edit)
        modalAddTitle: "Tambah Lamaran Kerja Baru",
        modalEditTitle: "Edit Data Lamaran Kerja",
        fieldPositionName: "Nama Posisi / Jabatan",
        fieldCompanyName: "Perusahaan",
        fieldLocation: "Lokasi Perusahaan / Kota", 
        fieldWorkType: "Jenis Pekerjaan",
        fieldPlatform: "Platform Melamar",
        fieldStatus: "Status Lamaran",
        fieldAppliedDate: "Tanggal Apply",
        placeholderPosition: "Contoh: Software Engineer, Marketing Manager",
        placeholderCompany: "Contoh: PT Teknologi Indonesia",
        placeholderLocation: "Contoh: Jakarta Selatan, Bandung, atau Remote",
        placeholderPlatform: "Contoh: Email, LinkedIn, Glints, Jobstreet, Indeed...",
        btnCancel: "Batal",
        btnSaveChange: "Simpan Perubahan",
        btnAddApp: "Tambah Lamaran",
        
        // Delete Modal
        deleteTitle: "Hapus Data Lamaran",
        deleteConfirmText: "Apakah Anda yakin ingin menghapus data lamaran kerja berikut?",
        deleteWarning: "Tindakan ini tidak dapat dibatalkan. Seluruh data lamaran ini akan dihapus permanen.",
        btnDeleting: "Menghapus...",
        btnDeleteConfirm: "Ya, Hapus Data",

        // Language Switcher Toggle
        languageLabel: "Bahasa / Language",
        langIndo: "Indonesia",
        langEng: "English",
    },
    en: {
        // App / Brand
        brandName: "Trapda",
        brandSubtitle: "Job Application Management App by Herta Devlabs",
        userActive: "Active Account",
        logout: "Logout",
        
        // Navigation Tabs
        kelolaDataTab: "Manage Applications",
        statistikTab: "Summary & Statistics",
        informasiStatusTab: "Status Information",
        
        // Header
        greeting: "Hello,",
        dashboardHeaderSub: "Monitor and manage all your job application history in one place.",
        
        // Kelola Data Page
        kelolaTitle: "Manage Job Applications",
        kelolaSub: "Search, filter, edit, and update all your job application history.",
        noDataTitle: "No Applications Found",
        noDataSub: "There are no job applications matching your filters or keywords. Please reset your search filters.",
        downloadPdfReport: "Download PDF Report",
        
        // Filter Bar
        searchPlaceholder: "Search company, position, or location...",
        allStatus: "All Statuses",
        allLocations: "All Locations",
        allPositions: "All Positions",
        allPlatforms: "All Platforms",
        allWorkTypes: "All Work Types",
        allDates: "All Time",
        applyToday: "Applied Today",
        applyThisWeek: "Applied This Week",
        applyThisMonth: "Applied This Month",
        sortTerbaru: "Newest First",
        sortTerlama: "Oldest First",
        resetFilter: "Reset Filters",
        searchFilterTitle: "Search & Filter Applications",
        
        // Job Table Columns
        colNo: "No",
        colPosition: "Position",
        colLocation: "Location",
        colWorkType: "Work Type",
        colPlatform: "Platform",
        colStatus: "Status",
        colCompany: "Company Name",
        colAppliedDate: "Applied Date",
        colAction: "Action",
        btnEdit: "Edit",
        btnDelete: "Delete",
        
        // Pagination
        showing: "Showing",
        to: "to",
        fromTotal: "of",
        totalJobData: "job applications",
        btnPrev: "Previous",
        btnNext: "Next",
        
        // Stats Cards Page
        statsTitle: "Application Summary & Statistics",
        statsSub: "Monitor success rates and overall employment statistics seamlessly.",
        
        // Status Cards
        cardTotalAllTitle: "Total Applications",
        cardTotalAllSub: "Total count of all job applications in database",
        cardApplyTodayTitle: "Applied Today",
        cardApplyTodaySub: "Applications submitted today",
        cardApplyWeekTitle: "Applied This Week",
        cardApplyWeekSub: "Applications submitted this week",
        cardApplyMonthTitle: "Applied This Month",
        cardApplyMonthSub: "Applications submitted this month",
        cardSentTitle: "Total Applications Sent",
        cardSentSub: "Applications submitted",
        cardInterviewTitle: "Interviewing Stage",
        cardInterviewSub: "Active applications in interview process",
        cardWawancaraDitolakTitle: "Rejected (Post Interview)",
        cardWawancaraDitolakSub: "No further response after interview",
        cardDitolakTitle: "Total Rejected",
        cardDitolakSub: "No interview invitation after submission",
        cardAcceptedTitle: "Total Job Offers Accepted",
        
        // WinRate Card
        ratioTag: "Pass Ratio",
        highPerf: "High Performance",
        winrateTitle: "Job Acceptance WinRate",
        winrateSub: "Percentage of job applications accepted compared to total applications submitted.",
        totalSuccessLabel: "Total Accepted",
        jobCountSuffix: "Applications",

        // Status Info Page
        statusInfoTitle: "Status & Work Type Information Center",
        statusInfoSub: "Understand the meaning of 5 status indicators and 2 work type systems.",
        statusSectionTitle: "Understanding 5 Job Application Status Labels",
        workTypeSectionTitle: "Understanding Work Type Systems",

        // 5 Status Descriptions
        statusDikirimDesc: "The job application has been submitted to the company and is waiting for initial review by recruiters/HR.",
        statusWawancaraDesc: "Congratulations! Your application passed the initial screening and you are invited for an interview session.",
        statusDiterimaDesc: "Congratulations! You successfully passed all selection rounds and received an official Job Offer Letter.",
        statusDitolakDesc: "Application was not selected during document screening or qualifications did not match the company's current needs.",
        statusWawancaraDitolakDesc: "The application process ended after attending interview sessions (did not pass post-interview selection).",

        // Work Types Descriptions
        workTypeOnsiteTitle: "Onsite (WFO - Work From Office)",
        workTypeOnsiteDesc: "A traditional work system where employees are required to work in person directly from the company's physical office location every working day.",
        workTypeOffsiteTitle: "Offsite (Remote / WFH)",
        workTypeOffsiteDesc: "A flexible / remote work system where employees can work from anywhere (home, cafe, or other location) without physical presence at the office.",

        // Modals (Add / Edit)
        modalAddTitle: "Add New Job Application",
        modalEditTitle: "Edit Job Application",
        fieldPositionName: "Position Title",
        fieldCompanyName: "Company Name",
        fieldLocation: "Company Location / City",
        fieldWorkType: "Work Type",
        fieldPlatform: "Application Platform",
        fieldStatus: "Application Status",
        fieldAppliedDate: "Date Applied",
        placeholderPosition: "Example: Software Engineer, Marketing Manager",
        placeholderCompany: "Example: Tech Corp Inc.",
        placeholderLocation: "Example: Jakarta, New York, or Remote",
        placeholderPlatform: "Example: Email, LinkedIn, Glints, Jobstreet, Indeed...",
        btnCancel: "Cancel",
        btnSaveChange: "Save Changes",
        btnAddApp: "Add Application",
        
        // Delete Modal
        deleteTitle: "Delete Job Application",
        deleteConfirmText: "Are you sure you want to delete the following job application record?",
        deleteWarning: "This action cannot be undone. All data for this application will be permanently removed.",
        btnDeleting: "Deleting...",
        btnDeleteConfirm: "Yes, Delete Record",

        // Language Switcher Toggle
        languageLabel: "Language",
        langIndo: "Indonesia",
        langEng: "English",
    }
};

// Dynamic data translation helper (translates statuses, work types, etc. on the fly)
export function translateData(text, lang = 'id') {
    if (!text) return '';
    if (lang === 'id') return text;

    // Translation maps for dynamic values
    const valueMap = {
        // Statuses
        'Dikirim': 'Sent',
        'Wawancara': 'Interview',
        'Diterima': 'Accepted',
        'Ditolak': 'Rejected',
        '(Wawancara) Ditolak': '(Interview) Rejected',
        
        // Work types
        'Onsite (WFO)': 'Onsite (WFO)',
        'Offsite (Remote)': 'Offsite (Remote)',
    };

    return valueMap[text] || text;
}
