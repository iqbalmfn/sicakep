<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $title }}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
        }

        p {
            margin-top: 0px;
        }

        .border {
            border-collapse: collapse;
            page-break-inside: auto
        }

        .border tr,
        .border td,
        .border th {
            border: 1px solid #000;
            padding: 2px 4px;
        }

        .line-height {
            line-height: 13px;
        }
    </style>
</head>

<body>
    <div style="font-size:10px;">
        <table class="border" style="width:100%;">
            <tr>
                <th class="text-left">No</th>
                <th class="text-left">Judul</th>
            </tr>
            @forelse ($data as $d)
                
                <tr>
                    <td class="text-left">
                        {{ $loop->iteration }}
                    </td>
                    <td class="text-left">
                        {{ $d->judul }}
                    </td>
                </tr>
            @empty
            @endforelse
        </table>
    </div>
</body>

</html>
