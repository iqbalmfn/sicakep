// import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                standard: "rgb(107 114 128 / 1)",
                disabled: "var(--color-disabled)",
                primary: "var(--color-primary)",
                "primary-hover": "var(--color-primary-hover)",
                "primary-important": "#021d3a",
                "primary-important-hover": "#011224",
                success: "var(--color-success)",
                "success-hover": "var(--color-success-hover)",
                info: "var(--color-info)",
                "info-hover": "var(--color-info-hover)",
                warning: "var(--color-warning)",
                "warning-hover": "var(--color-warning-hover)",
                danger: "var(--color-danger)",
                "danger-hover": "var(--color-danger-hover)",
                secondary: "#fcb040",
            },
            keyframes: {
                slideIn: {
                    "0%": {
                        transform: "translateX(100%)",
                        visibility: "hidden",
                    },
                    "1%": {
                        visibility: "visible",
                    },
                    "100%": {
                        transform: "translateX(0)",
                        visibility: "visible",
                    },
                },
                slideOut: {
                    "0%": {
                        transform: "translateX(0)",
                        visibility: "visible",
                    },
                    "99%": {
                        visibility: "visible",
                    },
                    "100%": {
                        transform: "translateX(100%)",
                        visibility: "hidden",
                    },
                },
            },
            animation: {
                slideIn: "slideIn 300ms forwards",
                slideInToggle: "slideIn 450ms forwards",
                slideOut: "slideOut 300ms forwards",
            },
            boxShadow: {
                top: "0 -2px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 2px -1px rgba(0, 0, 0, 0.01)", // Adjust values as needed
            },
        },
    },

    plugins: [forms],
};
