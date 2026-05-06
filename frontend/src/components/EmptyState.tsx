interface EmptyStateProps {
  onUpload?: () => void;
  title?: string;
  description?: string;
}

export default function EmptyState({ 
  onUpload, 
  title = 'Media Gallery Kosong', 
  description = 'Belum ada media yang diunggah. Mulai dengan mengunggah file pertama Anda.' 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="relative">
        <div className="absolute inset-0 bg-[#6ab149]/10 blur-3xl rounded-full scale-150" />
        
        <div className="relative w-28 h-28 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center">
          <div className="absolute inset-2 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
          
          <svg
            className="w-14 h-14 text-[#6ab149] relative z-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
        </div>

        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#6ab149] rounded-full flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-white text-sm">photo_library</span>
        </div>
      </div>

      <div className="mt-8 text-center max-w-sm">
        <h3 className="text-xl font-black font-headline text-on-surface mb-2">
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant font-body leading-relaxed">
          {description}
        </p>
      </div>

      <button
        onClick={onUpload}
        className="mt-8 flex items-center gap-2 px-6 py-3 bg-[#6ab149] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#6ab149]/25 hover:shadow-xl hover:shadow-[#6ab149]/30 active:scale-95 transition-all"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Start Uploading
      </button>
    </div>
  );
}