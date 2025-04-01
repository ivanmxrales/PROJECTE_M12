<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Styles / Scripts -->
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @endif

        <style>
            .btn {
                background-color: #b3b3b3; /* Gray background */
                border: 2px solid #333; /* Dark border */
                padding: 10px 20px;
                text-align: center;
                display: inline-block;
                text-decoration: none;
                color: black;
                font-weight: 500;
                transition: 0.3s;
            }

            .btn:hover {
                background-color: #a0a0a0;
            }
        </style>
    </head>
    <body class="bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] flex flex-col items-center justify-center min-h-screen">

        <h1 class="text-green-600 text-2xl font-bold mb-6">NOM PROVISIONAL</h1>

        @if (Route::has('login'))
            <div class="flex gap-6">
                @auth
                    <a href="{{ url('/dashboard') }}" class="btn">Dashboard</a>
                @else
                    <a href="{{ route('login') }}" class="btn">Log in</a>
                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="btn">Register</a>
                    @endif
                @endauth
            </div>
        @endif

    </body>
</html>
