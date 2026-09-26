<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'position_name',
        'company_name',
        'location',
        'work_type',
        'status',
        'applied_at',
        'ever_interviewed',
    ];

    protected function casts(): array
    {
        return [
            'applied_at' => 'datetime',
            'ever_interviewed' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Auto update status setelah 30 hari:
     * - 'Dikirim'    > 30 hari → 'Ditolak'
     * - 'Wawancara'  > 30 hari → '(Wawancara) Ditolak'
     */
    public function checkAutoRejection(): void
    {
        if (!in_array($this->status, ['Dikirim', 'Wawancara'])) {
            return;
        }

        $appliedDate = Carbon::parse($this->applied_at ?? $this->created_at);

        if ($appliedDate->diffInDays(now()) > 30) {
            if ($this->status === 'Wawancara') {
                // Wawancara > 30 hari → status khusus (Wawancara) Ditolak
                $this->update([
                    'status'          => '(Wawancara) Ditolak',
                    'ever_interviewed' => true,
                ]);
            } else {
                // Dikirim > 30 hari → Ditolak biasa
                $wasInterviewed = (bool) $this->ever_interviewed;
                $this->update([
                    'status'          => 'Ditolak',
                    'ever_interviewed' => $wasInterviewed,
                ]);
            }
        }
    }
}
