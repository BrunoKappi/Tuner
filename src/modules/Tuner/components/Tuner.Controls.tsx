import React from 'react';
import { useTranslation } from 'react-i18next';
import { MicOff, Mic, RotateCcw } from 'lucide-react';

interface TunerControlsProps {
  isMuted: boolean;
  isActive: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
}

export const TunerControls: React.FC<TunerControlsProps> = ({
  isMuted,
  isActive,
  onToggleMute,
  onRestart,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex items-center justify-center gap-3">
      {/* Silenciar / Ativar Afinador */}
      <button
        disabled={!isActive}
        onClick={onToggleMute}
        className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border select-none focus:outline-none transition-all duration-300 ${
          !isActive
            ? 'bg-slate-200/50 dark:bg-slate-800/10 border-slate-100 dark:border-slate-700/10 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            : isMuted
            ? 'bg-tunerState-warning/10 border-tunerState-warning/30 text-tunerState-warning hover:bg-tunerState-warning/20'
            : 'bg-slate-100 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700/80 text-slate-700 dark:text-tunerDark-text hover:bg-slate-200/60 dark:hover:bg-slate-700/40'
        }`}
      >
        {isMuted ? <Mic className="w-3.5 h-3.5 animate-pulse" /> : <MicOff className="w-3.5 h-3.5" />}
        <span>{isMuted ? t('tuner.microphone.unmute') : t('tuner.microphone.mute')}</span>
      </button>

      {/* Reiniciar Análise */}
      <button
        disabled={!isActive}
        onClick={onRestart}
        className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border select-none focus:outline-none transition-all duration-300 ${
          !isActive
            ? 'bg-slate-200/50 dark:bg-slate-800/10 border-slate-100 dark:border-slate-700/10 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            : 'bg-slate-100 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700/80 text-slate-700 dark:text-tunerDark-text hover:bg-slate-200/60 dark:hover:bg-slate-700/40'
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>{t('tuner.microphone.reset')}</span>
      </button>
    </div>
  );
};

export default TunerControls;
