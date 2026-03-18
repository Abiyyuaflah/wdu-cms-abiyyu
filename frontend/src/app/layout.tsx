import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wahana Data Utama | Transforming Data",
  description: "Wahana Data Utama architects intelligence. We bridge the gap between complex raw data and high-velocity business growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: #6ab149;
            --secondary: #2d8bc9;
            --background-light: #ffffff;
            --background-alt: #f8fafc;
            --accent-dark: #0f172a;
          }
          
          body {
            font-family: 'Sora', sans-serif;
            margin: 0;
            padding: 0;
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          
          .glass {
            background: rgba(255, 255, 255, 0.45);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
          }
          
          .glass-header {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(106, 177, 73, 0.1);
          }
          
          .data-grid-bg {
            background-image: radial-gradient(circle at 2px 2px, rgba(106, 177, 73, 0.05) 1px, transparent 0);
            background-size: 40px 40px;
          }
          
          .mesh-gradient {
            background: radial-gradient(at 0% 0%, hsla(102, 42%, 49%, 0.15) 0, transparent 50%), 
                        radial-gradient(at 50% 0%, hsla(203, 64%, 48%, 0.1) 0, transparent 50%), 
                        radial-gradient(at 100% 0%, hsla(102, 42%, 49%, 0.15) 0, transparent 50%);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #0f172a 0%, #6ab149 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .hero-blob {
            background: linear-gradient(135deg, rgba(106, 177, 73, 0.15) 0%, rgba(45, 139, 201, 0.1) 100%);
            filter: blur(80px);
            animation: blob-float 20s infinite alternate;
          }
          
          @keyframes blob-float {
            from { transform: translate(0, 0) scale(1); }
            to { transform: translate(50px, 100px) scale(1.1); }
          }
          
          .btn-futuristic-primary {
            background: #0f172a;
            position: relative;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .btn-futuristic-primary::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: 0.5s;
          }
          
          .btn-futuristic-primary:hover::after {
            left: 100%;
          }
          
          .btn-futuristic-primary:hover {
            background: #6ab149;
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 15px 30px -10px rgba(106, 177, 73, 0.4);
          }
          
          .btn-futuristic-secondary {
            background: white;
            border: 1.5px solid #0f172a;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .btn-futuristic-secondary:hover {
            background: #0f172a;
            color: white;
            transform: translateY(-3px);
          }
          
          .floating-ui {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
