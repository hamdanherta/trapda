<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class JobApplicationController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();

        // Auto transition: 'Dikirim' & 'Wawancara' > 30 hari → otomatis ditolak
        JobApplication::where('user_id', $userId)
            ->whereIn('status', ['Dikirim', 'Wawancara'])
            ->get()
            ->each(function ($app) {
                $app->checkAutoRejection();
            });

        // Auto flag ever_interviewed untuk Wawancara / Diterima / (Wawancara) Ditolak
        JobApplication::where('user_id', $userId)
            ->whereIn('status', ['Wawancara', 'Diterima', '(Wawancara) Ditolak'])
            ->update(['ever_interviewed' => true]);

        // Compute Statistics
        $allUserApps = JobApplication::where('user_id', $userId)->get();
        $totalAll = $allUserApps->count();
        $totalInterview         = $allUserApps->where('status', 'Wawancara')->count();
        $totalAccepted          = $allUserApps->where('status', 'Diterima')->count();
        $totalSent              = $allUserApps->where('status', 'Dikirim')->count();
        $totalDitolak           = $allUserApps->where('status', 'Ditolak')->count();
        $totalWawancaraDitolak  = $allUserApps->where('status', '(Wawancara) Ditolak')->count();
        $totalRejected          = $totalDitolak + $totalWawancaraDitolak;
        $totalEverInterviewed   = $allUserApps->where('ever_interviewed', true)->count();

        // Computations for Apply Hari Ini, Minggu Ini, Bulan Ini
        $today = Carbon::today();
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        $totalToday = $allUserApps->filter(function ($app) use ($today) {
            return $app->applied_at && Carbon::parse($app->applied_at)->isSameDay($today);
        })->count();

        $totalThisWeek = $allUserApps->filter(function ($app) use ($startOfWeek, $endOfWeek) {
            return $app->applied_at && Carbon::parse($app->applied_at)->between($startOfWeek, $endOfWeek);
        })->count();

        $totalThisMonth = $allUserApps->filter(function ($app) use ($startOfMonth, $endOfMonth) {
            return $app->applied_at && Carbon::parse($app->applied_at)->between($startOfMonth, $endOfMonth);
        })->count();

        $percentInterview = $totalAll > 0 ? round(($totalInterview / $totalAll) * 100, 1) : 0;
        $percentAccepted = $totalAll > 0 ? round(($totalAccepted / $totalAll) * 100, 1) : 0;
        $percentEverInterviewed = $totalAll > 0 ? round(($totalEverInterviewed / $totalAll) * 100, 1) : 0;
        
        // WinRate calculation excludes 'Dikirim' and 'Wawancara' (only decided applications)
        $totalDecided = $totalAccepted + $totalDitolak + $totalWawancaraDitolak;
        $winrate = $totalDecided > 0 ? round(($totalAccepted / $totalDecided) * 100, 1) : 0;

        $stats = [
            'total_all'               => $totalAll,
            'total_interview'         => $totalInterview,
            'total_accepted'          => $totalAccepted,
            'total_sent'              => $totalSent,
            'total_rejected'          => $totalRejected,
            'total_ditolak'           => $totalDitolak,
            'total_wawancara_ditolak' => $totalWawancaraDitolak,
            'total_ever_interviewed'  => $totalEverInterviewed,
            'total_today'             => $totalToday,
            'total_this_week'         => $totalThisWeek,
            'total_this_month'        => $totalThisMonth,
            'total_decided'           => $totalDecided,
            'percent_interview'       => $percentInterview,
            'percent_accepted'        => $percentAccepted,
            'percent_ever_interviewed'=> $percentEverInterviewed,
            'winrate'                 => $winrate,
        ];

        // Retrieve unique positions, locations, and platforms for filtering options
        $uniqueLocations = JobApplication::where('user_id', $userId)
            ->whereNotNull('location')
            ->distinct()
            ->pluck('location')
            ->values();

        $uniquePositions = JobApplication::where('user_id', $userId)
            ->whereNotNull('position_name')
            ->distinct()
            ->pluck('position_name')
            ->values();

        $uniquePlatforms = JobApplication::where('user_id', $userId)
            ->whereNotNull('platform')
            ->distinct()
            ->pluck('platform')
            ->values();

        // Build filtered query
        $query = JobApplication::where('user_id', $userId);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                  ->orWhere('position_name', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('platform', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('location')) {
            $query->where('location', $request->input('location'));
        }

        if ($request->filled('position')) {
            $query->where('position_name', $request->input('position'));
        }

        if ($request->filled('work_type')) {
            $query->where('work_type', $request->input('work_type'));
        }

        if ($request->filled('platform')) {
            $query->where('platform', $request->input('platform'));
        }

        if ($request->filled('date_filter')) {
            $dateFilter = $request->input('date_filter');
            if ($dateFilter === 'hari_ini') {
                $query->whereDate('applied_at', Carbon::today());
            } elseif ($dateFilter === 'minggu_ini') {
                $query->whereBetween('applied_at', [$startOfWeek, $endOfWeek]);
            } elseif ($dateFilter === 'bulan_ini') {
                $query->whereBetween('applied_at', [$startOfMonth, $endOfMonth]);
            }
        }

        $sort = $request->input('sort', 'terbaru');
        if ($sort === 'terlama') {
            $query->orderBy('applied_at', 'asc')->orderBy('id', 'asc');
        } else {
            $query->orderBy('applied_at', 'desc')->orderBy('id', 'desc');
        }

        $applications = $query->get()->map(function ($app) {
            return [
                'id' => $app->id,
                'position_name' => $app->position_name,
                'company_name' => $app->company_name,
                'location' => $app->location,
                'work_type' => $app->work_type ?? 'Onsite (WFO)',
                'platform' => $app->platform ?? 'Email',
                'status' => $app->status,
                'ever_interviewed' => (bool) $app->ever_interviewed,
                'applied_at' => $app->applied_at ? $app->applied_at->format('Y-m-d') : null,
                'applied_at_formatted' => $app->applied_at ? $app->applied_at->translatedFormat('d M Y') : '-',
                'created_at' => $app->created_at ? $app->created_at->format('Y-m-d H:i') : null,
            ];
        });

        return Inertia::render('Dashboard', [
            'applications' => $applications,
            'stats' => $stats,
            'uniqueLocations' => $uniqueLocations,
            'uniquePositions' => $uniquePositions,
            'uniquePlatforms' => $uniquePlatforms,
            'filters' => $request->only(['search', 'status', 'location', 'position', 'work_type', 'platform', 'date_filter', 'sort']),
            'user' => Auth::user(),
        ]);
    }

    public function store(Request $request)
    {
        $isRemote = $request->input('work_type') === 'Offsite (Remote)';

        $validated = $request->validate([
            'position_name' => ['required', 'string', 'max:255'],
            'company_name'  => ['required', 'string', 'max:255'],
            'location'      => [$isRemote ? 'nullable' : 'required', 'string', 'max:255'],
            'work_type'     => ['required', 'string', 'in:Onsite (WFO),Offsite (Remote)'],
            'platform'      => ['nullable', 'string', 'max:255'],
            'status'        => ['required', 'string', 'in:Dikirim,Wawancara,Diterima,Ditolak,(Wawancara) Ditolak'],
            'applied_at'    => ['nullable', 'date'],
        ], [
            'position_name.required' => 'Nama posisi wajib diisi.',
            'company_name.required'  => 'Nama perusahaan wajib diisi.',
            'location.required'      => 'Lokasi wajib diisi.',
            'work_type.required'     => 'Jenis pekerjaan wajib dipilih.',
            'status.required'        => 'Status lamaran wajib dipilih.',
        ]);

        $appliedAt = !empty($validated['applied_at']) 
            ? Carbon::parse($validated['applied_at']) 
            : Carbon::now();

        $location = $isRemote ? ($validated['location'] ?? 'Remote') : $validated['location'];
        if (empty($location)) {
            $location = $isRemote ? 'Remote' : '-';
        }

        $platform = !empty($validated['platform']) ? $validated['platform'] : 'Email';
        $isInterview = in_array($validated['status'], ['Wawancara', 'Diterima', '(Wawancara) Ditolak']);

        JobApplication::create([
            'user_id'       => Auth::id(),
            'position_name' => $validated['position_name'],
            'company_name'  => $validated['company_name'],
            'location'      => $location,
            'work_type'     => $validated['work_type'],
            'platform'      => $platform,
            'status'        => $validated['status'],
            'applied_at'    => $appliedAt,
            'ever_interviewed' => $isInterview,
        ]);

        return redirect()->back()->with('success', 'Lamaran kerja berhasil ditambahkan!');
    }

    public function update(Request $request, JobApplication $jobApplication)
    {
        if ($jobApplication->user_id !== Auth::id()) {
            abort(403);
        }

        // Prevent editing applications older than 30 days
        $appliedDate = Carbon::parse($jobApplication->applied_at ?? $jobApplication->created_at);
        if ($appliedDate->diffInDays(now()) > 30) {
            return redirect()->back()->with('error', 'Lamaran yang sudah lebih dari 30 hari tidak dapat di-edit kembali.');
        }

        $isRemote = $request->input('work_type') === 'Offsite (Remote)';

        $validated = $request->validate([
            'position_name' => ['required', 'string', 'max:255'],
            'company_name'  => ['required', 'string', 'max:255'],
            'location'      => [$isRemote ? 'nullable' : 'required', 'string', 'max:255'],
            'work_type'     => ['required', 'string', 'in:Onsite (WFO),Offsite (Remote)'],
            'platform'      => ['nullable', 'string', 'max:255'],
            'status'        => ['required', 'string', 'in:Dikirim,Wawancara,Diterima,Ditolak,(Wawancara) Ditolak'],
            'applied_at'    => ['nullable', 'date'],
        ]);

        $appliedAt = !empty($validated['applied_at']) 
            ? Carbon::parse($validated['applied_at']) 
            : $jobApplication->applied_at;

        $location = $isRemote ? ($validated['location'] ?? 'Remote') : $validated['location'];
        if (empty($location)) {
            $location = $isRemote ? 'Remote' : '-';
        }

        $platform = !empty($validated['platform']) ? $validated['platform'] : 'Email';

        $updateData = [
            'position_name' => $validated['position_name'],
            'company_name'  => $validated['company_name'],
            'location'      => $location,
            'work_type'     => $validated['work_type'],
            'platform'      => $platform,
            'status'        => $validated['status'],
            'applied_at'    => $appliedAt,
        ];

        if (in_array($validated['status'], ['Wawancara', 'Diterima', '(Wawancara) Ditolak'])) {
            $updateData['ever_interviewed'] = true;
        }

        $jobApplication->update($updateData);

        return redirect()->back()->with('success', 'Data lamaran kerja berhasil diperbarui!');
    }

    public function updateStatus(Request $request, JobApplication $jobApplication)
    {
        if ($jobApplication->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:Dikirim,Wawancara,Diterima,Ditolak,(Wawancara) Ditolak'],
        ]);

        $updateData = [
            'status' => $validated['status'],
        ];

        if (in_array($validated['status'], ['Wawancara', 'Diterima', '(Wawancara) Ditolak'])) {
            $updateData['ever_interviewed'] = true;
        }

        $jobApplication->update($updateData);

        return redirect()->back()->with('success', 'Status lamaran berhasil diubah menjadi ' . $validated['status'] . '!');
    }

    public function destroy(JobApplication $jobApplication)
    {
        if ($jobApplication->user_id !== Auth::id()) {
            abort(403);
        }

        $jobApplication->delete();

        return redirect()->back()->with('success', 'Data lamaran kerja berhasil dihapus!');
    }

    public function downloadPdf()
    {
        $userId = Auth::id();
        $applications = JobApplication::where('user_id', $userId)
            ->orderBy('applied_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        $user = Auth::user();
        $generatedAt = Carbon::now('Asia/Jakarta')->translatedFormat('d F Y H:i') . ' WIB';

        $pdf = Pdf::loadView('reports.job_applications_pdf', compact('applications', 'user', 'generatedAt'))
            ->setPaper('a4', 'landscape');

        return $pdf->download('Laporan_Lamaran_Kerja_Trapda_' . date('Ymd_His') . '.pdf');
    }
}
