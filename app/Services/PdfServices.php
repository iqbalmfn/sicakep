<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Response;

class PdfServices {
    public function generate($path, $data, $title, $orientation = 'potrait') {
        $pdf = Pdf::loadview(
            $path,
            [
                'data' => $data,
                'title' => $title,
            ]
        )->setPaper('a4', $orientation);

        // Set nama file proposal
        $filename = $title . ".pdf";

        // Menggunakan Response untuk langsung mengirim file ke browser
        return Response::make($pdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $filename . '"',
        ]);
    }
}