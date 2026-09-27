<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Data Lamaran Kerja - Trapda</title>
    <style>
        @page {
            margin: 15mm 15mm 15mm 15mm;
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #1e293b;
            font-size: 10px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
        }
        .header {
            width: 100%;
            border-bottom: 2px solid #005BAB;
            padding-bottom: 12px;
            margin-bottom: 15px;
        }
        .header table {
            width: 100%;
            border-collapse: collapse;
        }
        .header-title {
            font-size: 18px;
            font-weight: bold;
            color: #005BAB;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .header-subtitle {
            font-size: 10px;
            color: #64748b;
            margin-top: 3px;
        }
        .header-meta {
            text-align: right;
            font-size: 9px;
            color: #475569;
        }
        .summary-box {
            background-color: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 8px 12px;
            margin-bottom: 15px;
        }
        .summary-table {
            width: 100%;
            border-collapse: collapse;
        }
        .summary-item {
            text-align: center;
        }
        .summary-label {
            font-size: 8px;
            font-weight: bold;
            color: #64748b;
            text-transform: uppercase;
        }
        .summary-value {
            font-size: 13px;
            font-weight: bold;
            color: #005BAB;
            margin-top: 2px;
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 5px;
        }
        .data-table th {
            background-color: #005BAB;
            color: #ffffff;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            padding: 7px 6px;
            text-align: left;
            border: 1px solid #005BAB;
        }
        .data-table td {
            padding: 6px 6px;
            font-size: 9.5px;
            border: 1px solid #e2e8f0;
            vertical-align: middle;
        }
        .data-table tr:nth-child(even) {
            background-color: #f8fafc;
        }
        .text-center {
            text-align: center;
        }
        .badge {
            display: inline-block;
            padding: 3px 6px;
            font-size: 8.5px;
            font-weight: bold;
            border-radius: 4px;
            color: #ffffff;
            text-align: center;
        }
        .badge-dikirim { background-color: #007FD3; }
        .badge-wawancara { background-color: #DAA000; }
        .badge-diterima { background-color: #4CBE00; }
        .badge-ditolak { background-color: #D70000; }
        .badge-wawancara-ditolak { background-color: #700000; }

        .badge-platform {
            display: inline-block;
            padding: 2px 5px;
            font-size: 8.5px;
            font-weight: bold;
            border-radius: 4px;
            background-color: #e2e8f0;
            color: #0f172a;
        }
        .footer {
            margin-top: 20px;
            width: 100%;
            border-top: 1px solid #e2e8f0;
            padding-top: 8px;
            font-size: 8px;
            color: #94a3b8;
        }
    </style>
</head>
<body>

    <!-- Header Section -->
    <div class="header">
        <table>
            <tr>
                <td>
                    <div class="header-title">TRAPDA - LAPORAN DATA LAMARAN KERJA</div>
                    <div class="header-subtitle">Sistem Manajemen & Tracking Riwayat Lamaran Pekerjaan</div>
                </td>
                <td class="header-meta">
                    <div><strong>Pengguna:</strong> {{ $user->username ?? $user->name ?? 'User Trapda' }} @if(!empty($user->email) && $user->email !== ($user->username ?? $user->name)) ({{ $user->email }}) @endif</div>
                    <div><strong>Tanggal Unduh:</strong> {{ $generatedAt }}</div>
                    <div><strong>Total Lamaran:</strong> {{ $applications->count() }} Data</div>
                </td>
            </tr>
        </table>
    </div>

    <!-- Quick Summary Box -->
    <div class="summary-box">
        <table class="summary-table">
            <tr>
                <td class="summary-item">
                    <div class="summary-label">Total Lamaran</div>
                    <div class="summary-value">{{ $applications->count() }}</div>
                </td>
                <td class="summary-item">
                    <div class="summary-label">Dikirim</div>
                    <div class="summary-value" style="color: #007FD3;">{{ $applications->where('status', 'Dikirim')->count() }}</div>
                </td>
                <td class="summary-item">
                    <div class="summary-label">Wawancara</div>
                    <div class="summary-value" style="color: #DAA000;">{{ $applications->where('status', 'Wawancara')->count() }}</div>
                </td>
                <td class="summary-item">
                    <div class="summary-label">Diterima</div>
                    <div class="summary-value" style="color: #4CBE00;">{{ $applications->where('status', 'Diterima')->count() }}</div>
                </td>
                <td class="summary-item">
                    <div class="summary-label">Ditolak</div>
                    <div class="summary-value" style="color: #D70000;">{{ $applications->where('status', 'Ditolak')->count() + $applications->where('status', '(Wawancara) Ditolak')->count() }}</div>
                </td>
                <td class="summary-item">
                    <div class="summary-label">WinRate Selesai</div>
                    @php
                        $accCount = $applications->where('status', 'Diterima')->count();
                        $rejCount = $applications->where('status', 'Ditolak')->count() + $applications->where('status', '(Wawancara) Ditolak')->count();
                        $decCount = $accCount + $rejCount;
                        $wrPerc = $decCount > 0 ? round(($accCount / $decCount) * 100, 1) : 0;
                    @endphp
                    <div class="summary-value" style="color: #4CBE00;">{{ $wrPerc }}%</div>
                </td>
            </tr>
        </table>
    </div>

    <!-- Main Data Table -->
    <table class="data-table">
        <thead>
            <tr>
                <th style="width: 4%;" class="text-center">No</th>
                <th style="width: 18%;">Posisi Pekerjaan</th>
                <th style="width: 18%;">Nama Perusahaan</th>
                <th style="width: 12%;">Lokasi</th>
                <th style="width: 12%;">Jenis Kerja</th>
                <th style="width: 10%;" class="text-center">Platform</th>
                <th style="width: 12%;" class="text-center">Tanggal Apply</th>
                <th style="width: 14%;" class="text-center">Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($applications as $index => $app)
                <tr>
                    <td class="text-center" style="font-weight: bold;">{{ $index + 1 }}</td>
                    <td style="font-weight: bold; color: #005BAB;">{{ $app->position_name }}</td>
                    <td>{{ $app->company_name }}</td>
                    <td>{{ $app->location }}</td>
                    <td>{{ $app->work_type }}</td>
                    <td class="text-center">
                        <span class="badge-platform">{{ $app->platform ?? 'Email' }}</span>
                    </td>
                    <td class="text-center">
                        {{ $app->applied_at ? \Carbon\Carbon::parse($app->applied_at)->translatedFormat('d M Y') : '-' }}
                    </td>
                    <td class="text-center">
                        @php
                            $badgeClass = match($app->status) {
                                'Dikirim' => 'badge-dikirim',
                                'Wawancara' => 'badge-wawancara',
                                'Diterima' => 'badge-diterima',
                                'Ditolak' => 'badge-ditolak',
                                '(Wawancara) Ditolak' => 'badge-wawancara-ditolak',
                                default => 'badge-dikirim',
                            };
                        @endphp
                        <span class="badge {{ $badgeClass }}">{{ $app->status }}</span>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="8" class="text-center" style="padding: 20px; color: #64748b;">
                        Belum ada data lamaran pekerjaan yang tersimpan di database.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <!-- Footer Section -->
    <div class="footer">
        <table style="width: 100%;">
            <tr>
                <td>Laporan ini dicetak secara otomatis dari aplikasi Trapda (Job Application Management).</td>
                <td style="text-align: right;">Halaman 1</td>
            </tr>
        </table>
    </div>

</body>
</html>
