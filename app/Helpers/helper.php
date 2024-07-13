<?php

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


function responseError($message, $errors = [], $code = 400) {
    return [
        'success' => false,
        'message' => $message,
        'data' => $errors,
        'code' => $code
    ];
}

function responseSuccess($message, $data = []) {
    return [
        'success' => true,
        'message' => $message,
        'data' => $data
    ];
}

function sendResponse($message, $result)
{
    $response = [
        "success" => true,
        "message" => $message,
        "data"    => $result
    ];

    return response()->json($response, 200);
}

function sendError($error, $errorMessage = [], $code = 402)
{
    $response = [
        "success" => false,
        "message" => $error,
    ];

    if (!empty($errorMessage)) {
        $response['data'] = $errorMessage;
    }

    return response()->json($response, $code);
}

function saveFile($file, $path, $prefix) 
{
    $file_name = $prefix . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
    $file->storeAs($path, $file_name, 'public');

    return $file_name;
}

function deleteFile($path, $file_name) {
    Storage::disk('public')->delete($path.'/'.$file_name);
}

function makeSlug($title)
{
    $slug = Str::slug($title, "-");
    return $slug;
}

function formatRupiah($number, $suffixCount = 2) {
    return 'Rp. ' . number_format($number, $suffixCount, ',', '.');
}

function formatRupiahWithoutSymbol($number) {
    return number_format($number, 0, ',', '.');
}

function rentangTahun($tahunPlus) {
    // Mendapatkan tanggal sekarang
    $tanggalSekarang = new DateTime();

    // Menambahkan 2 tahun ke tanggal sekarang
    $tanggalSekarang->modify('+'.$tahunPlus.' years -1 years');

    // Mengambil tanggal setelah ditambah 2 tahun
    $tanggalHasil = $tanggalSekarang->format('Y-m-d');

    // Mengambil tahun dari tanggal hasil
    $tahunSekarang = date('Y', strtotime($tanggalSekarang->format('Y')));
    $tahunHasil = date('Y', strtotime($tanggalHasil));

    // Membuat array rentang tahun
    $rentangTahun = range($tahunSekarang, $tahunHasil);

    return implode(",", $rentangTahun);
}

function numberFormat($number, $decimals = 2, $decimalSeparator = ',', $thousandsSeparator = '.') {
    return number_format($number, $decimals, $decimalSeparator, $thousandsSeparator);
}
