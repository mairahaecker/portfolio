type IconProps = { className?: string };
const base = "h-5 w-5";

const stroke = (className: string, children: React.ReactNode) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const MailIcon = ({ className = base }: IconProps) =>
  stroke(className, (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>));

export const PhoneIcon = ({ className = base }: IconProps) =>
  stroke(className, <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />);

export const LinkedInIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9V9Z" />
  </svg>
);

export const InstagramIcon = ({ className = base }: IconProps) =>
  stroke(className, (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" /></>));

export const WhatsAppIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2A9.93 9.93 0 0 0 2.1 11.9c0 1.75.46 3.46 1.33 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004A9.93 9.93 0 0 0 22 11.92 9.86 9.86 0 0 0 12.04 2Zm5.8 14.05c-.24.69-1.4 1.32-1.95 1.36-.5.04-.5.4-3.16-.66-2.66-1.06-4.32-3.8-4.45-3.97-.13-.18-1.06-1.4-1.06-2.67 0-1.27.67-1.9.9-2.16.24-.26.52-.33.7-.33.18 0 .35 0 .5.01.16.01.38-.06.6.46.23.53.77 1.84.84 1.97.07.13.11.29.02.46-.09.18-.13.29-.26.45-.13.16-.27.35-.39.47-.13.13-.26.27-.11.53.15.26.66 1.09 1.42 1.76.98.87 1.8 1.14 2.06 1.27.26.13.41.11.56-.07.15-.18.65-.76.82-1.02.17-.26.35-.22.59-.13.24.09 1.53.72 1.79.85.26.13.43.2.5.31.07.11.07.62-.17 1.31Z" />
  </svg>
);

export const CalendarIcon = ({ className = base }: IconProps) =>
  stroke(className, (<><rect x="3" y="4.5" width="18" height="16" rx="2.5" /><path d="M3 9h18M8 3v3M16 3v3" /><circle cx="8.5" cy="13.5" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="13.5" r="1" fill="currentColor" stroke="none" /><circle cx="15.5" cy="13.5" r="1" fill="currentColor" stroke="none" /></>));

export const ChatIcon = ({ className = base }: IconProps) =>
  stroke(className, (<><path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /><path d="M8 10h8M8 13h5" /></>));

export const PlayIcon = ({ className = base }: IconProps) =>
  stroke(className, (<><circle cx="12" cy="12" r="9" /><path d="M10 9l5 3-5 3V9Z" fill="currentColor" /></>));

export const ArrowIcon = ({ className = base }: IconProps) =>
  stroke(className, <path d="M5 12h14M13 6l6 6-6 6" />);

export const ArrowUpRight = ({ className = base }: IconProps) =>
  stroke(className, <path d="M7 17 17 7M8 7h9v9" />);

export const DownloadIcon = ({ className = base }: IconProps) =>
  stroke(className, <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" />);

export const PinIcon = ({ className = base }: IconProps) =>
  stroke(className, (<><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>));

export const SparkIcon = ({ className = base }: IconProps) =>
  stroke(className, <path d="M12 3c.4 3.6 1.4 4.6 5 5-3.6.4-4.6 1.4-5 5-.4-3.6-1.4-4.6-5-5 3.6-.4 4.6-1.4 5-5Z" />);

export const RocketIcon = ({ className = base }: IconProps) =>
  stroke(className, (<><path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5" /><path d="M9 15l-2-2c1-5 5-9 11-10 1 6-3 10-8 11l-1-1Z" /><circle cx="14.5" cy="9.5" r="1.4" /></>));

export const MicIcon = ({ className = base }: IconProps) =>
  stroke(className, (<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" /></>));

export const ImageIcon = ({ className = base }: IconProps) =>
  stroke(className, (<><rect x="3" y="4" width="18" height="16" rx="2.5" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="m4 17 5-5 4 4 3-3 4 4" /></>));

export const MenuIcon = ({ className = base }: IconProps) =>
  stroke(className, <path d="M4 7h16M4 12h16M4 17h16" />);

export const CloseIcon = ({ className = base }: IconProps) =>
  stroke(className, <path d="M6 6l12 12M18 6 6 18" />);
