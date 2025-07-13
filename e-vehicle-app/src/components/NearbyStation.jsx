const NearbyStation = () => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
                </linearGradient>

                <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f1f5f9;stop-opacity:1" />
                </linearGradient>

                <animate id="pulse" attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
            </defs>

            <circle cx="24" cy="24" r="23" fill="url(#bgGradient)" stroke="#1e40af" stroke-width="1" />

            <circle cx="24" cy="25" r="22" fill="rgba(0,0,0,0.1)" opacity="0.3" />

            <circle cx="24" cy="24" r="10" fill="none" stroke="#60a5fa" stroke-width="1" opacity="0.7">
                <animate attributeName="r" values="8;18;8" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite" />
            </circle>

            <path d="M24 10c-5.5 0-10 4.5-10 10 0 7.5 10 20 10 20s10-12.5 10-20c0-5.5-4.5-10-10-10z"
                fill="url(#pinGradient)" stroke="#e2e8f0" stroke-width="0.5" />

            <circle cx="24" cy="20" r="3" fill="#1e40af" />
            <circle cx="24" cy="20" r="1.5" fill="#ffffff" />

            <line x1="24" y1="20" x2="19" y2="15" stroke="#1e40af" stroke-width="1" opacity="0.6" />
            <line x1="24" y1="20" x2="29" y2="15" stroke="#1e40af" stroke-width="1" opacity="0.6" />
            <line x1="24" y1="20" x2="16" y2="22" stroke="#1e40af" stroke-width="1" opacity="0.6" />
            <line x1="24" y1="20" x2="32" y2="22" stroke="#1e40af" stroke-width="1" opacity="0.6" />

            <g>
                <circle cx="19" cy="15" r="2" fill="#ffffff" stroke="#1e40af" stroke-width="1" />
                <circle cx="29" cy="15" r="2" fill="#ffffff" stroke="#1e40af" stroke-width="1" />
                <circle cx="16" cy="22" r="2" fill="#ffffff" stroke="#1e40af" stroke-width="1" />
                <circle cx="32" cy="22" r="2" fill="#ffffff" stroke="#1e40af" stroke-width="1" />

                <circle cx="12" cy="30" r="1.5" fill="#60a5fa" opacity="0.8" />
                <circle cx="36" cy="30" r="1.5" fill="#60a5fa" opacity="0.8" />
                <circle cx="20" cy="35" r="1.5" fill="#60a5fa" opacity="0.6" />
                <circle cx="28" cy="35" r="1.5" fill="#60a5fa" opacity="0.6" />

                <circle cx="15" cy="8" r="1" fill="#93c5fd" opacity="0.5" />
                <circle cx="33" cy="8" r="1" fill="#93c5fd" opacity="0.5" />
                <circle cx="8" cy="18" r="1" fill="#93c5fd" opacity="0.5" />
                <circle cx="40" cy="18" r="1" fill="#93c5fd" opacity="0.5" />
            </g>
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        </svg>
    );
}

export default NearbyStation;