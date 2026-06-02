import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PitchData, TuningStatus, SignalLevel } from '../types/Tuner.Types';
import { INSTRUMENTS } from '../constants/Tuner.Constants';
import { Radio } from 'lucide-react';

interface TunerStatusDisplayProps {
  pitchData: PitchData | null;
  status: TuningStatus;
  isActive: boolean;
  signalLevel: SignalLevel;
  selectedInstrumentKey: string;
}

export const TunerStatusDisplay: React.FC<TunerStatusDisplayProps> = ({
  pitchData,
  status,
  isActive,
  signalLevel,
  selectedInstrumentKey,
}) => {
  const { t } = useTranslation();

  const currentInstrument = INSTRUMENTS.find((i) => i.key === selectedInstrumentKey);
  
  const getMatchedStringNumber = () => {
    if (!pitchData || !currentInstrument || currentInstrument.key === 'chromatic') return null;
    
    const idx = currentInstrument.strings.findIndex(
      (s) => s.note === pitchData.noteName && s.octave === pitchData.octave
    );
    
    if (idx !== -1) {
      // Como o array de cordas está ordenado de cima para baixo (do mais fino para o mais grosso):
      // Violão/Guitarra: idx 0 (E4, 1ª corda), idx 5 (E2, 6ª corda)
      // Número físico real da corda (6ª a 1ª)
      // Número da corda = strings.length - idx
      return currentInstrument.strings.length - idx;
    }
    return null;
  };

  const matchedString = getMatchedStringNumber();

  const getStatusTextClass = () => {
    if (!isActive || !pitchData) return 'text-slate-400 dark:text-tunerDark-muted';
    switch (status) {
      case 'in_tune':
        return 'text-tunerState-success font-black drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] scale-105';
      case 'near_in_tune':
      case 'near_sharp':
        return 'text-tunerState-nearSuccess font-black';
      case 'low':
      case 'sharp':
        return 'text-tunerState-warning font-bold';
      case 'very_low':
      case 'very_sharp':
      default:
        return 'text-tunerState-danger font-bold';
    }
  };

  const getSignalLevelBadge = () => {
    switch (signalLevel) {
      case 'good':
        return (
          <span className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-wider text-tunerState-success bg-tunerState-success/10 px-2.5 py-1 rounded-full border border-tunerState-success/20 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-tunerState-success animate-pulse" />
            {t('tuner.microphone.signals.good')}
          </span>
        );
      case 'weak':
        return (
          <span className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-wider text-tunerState-warning bg-tunerState-warning/10 px-2.5 py-1 rounded-full border border-tunerState-warning/20 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-tunerState-warning animate-ping" />
            {t('tuner.microphone.signals.weak')}
          </span>
        );
      case 'none':
      default:
        return (
          <span className="flex items-center gap-1.5 text-[9px] uppercase font-black tracking-wider text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-slate-800/40 px-2.5 py-1 rounded-full border border-slate-300 dark:border-slate-700/60 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-450" />
            {t('tuner.microphone.signals.none')}
          </span>
        );
    }
  };

  const getTargetFrequency = () => {
    if (!pitchData) return 0;
    const n = 12 * Math.log2(pitchData.frequency / 440) + 69;
    const midiNote = Math.round(n);
    return Math.round(440 * Math.pow(2, (midiNote - 69) / 12) * 10) / 10;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      {/* Nível de Entrada de Sinal */}
      <div className="w-full flex items-center justify-between px-1 border-b border-slate-200 dark:border-slate-800/80 pb-2">
        <div className="flex items-center gap-1.5 select-none text-slate-400 dark:text-slate-500">
          <Radio className="w-3.5 h-3.5" />
          <span className="text-[9px] uppercase font-black tracking-widest">
            {t('tuner.microphone.signals.title')}
          </span>
        </div>
        {getSignalLevelBadge()}
      </div>

      {/* Visor Compacto Minimalista (Sem o círculo de 200px gigante) */}
      <div className="flex flex-col items-center justify-center select-none py-0.5 h-20">
        {isActive && pitchData ? (
          <div className="flex flex-col items-center gap-0.5 animate-fade-in">
            {/* Nota + Oitava + Rótulo de Corda lado a lado para extrema economia de altura */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-baseline select-none">
                <span className={`text-5xl font-black font-sans tracking-tighter transition-all duration-300 ${
                  status === 'in_tune' ? 'text-tunerState-success' : 'text-slate-900 dark:text-white'
                }`}>
                  {pitchData.noteName}
                </span>
                <span className="text-base font-black text-slate-400 dark:text-tunerDark-muted ml-0.5 select-none">
                  {pitchData.octave}
                </span>
              </div>

              {/* Número da Corda física correspondente */}
              {matchedString !== null && (
                <span className="text-[8px] font-black uppercase tracking-widest text-tunerState-success bg-tunerState-success/10 px-1.5 py-0.5 rounded-lg border border-tunerState-success/20 select-none animate-pulse">
                  {t('tuner.instruments.string')} {matchedString}
                </span>
              )}
            </div>

            {/* Rótulo de Qualidade da Afinação */}
            <h4 className={`text-[10px] select-none uppercase tracking-wider transition-all duration-300 ${getStatusTextClass()}`}>
              {t(`tuner.status.${status}`)}
            </h4>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-extralight text-slate-300 dark:text-slate-700 animate-pulse-slow tracking-wider">
              --
            </span>
            <h4 className="text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-tunerDark-muted mt-1 select-none">
              {t('tuner.status.waiting')}
            </h4>
          </div>
        )}
      </div>

      {/* Frequência Real e Ideal Compactada */}
      <div className="grid grid-cols-2 w-full gap-4 border-t border-slate-200 dark:border-slate-800/80 pt-3 px-1 select-none">
        <div className="flex flex-col items-start select-none">
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-tunerDark-muted">
            {t('tuner.metrics.frequency')}
          </span>
          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white mt-0.5">
            {isActive && pitchData ? `${pitchData.frequency} Hz` : '-- Hz'}
          </span>
        </div>

        <div className="flex flex-col items-end select-none">
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-tunerDark-muted">
            {t('tuner.metrics.target')}
          </span>
          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white mt-0.5">
            {isActive && pitchData ? `${getTargetFrequency()} Hz` : '-- Hz'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TunerStatusDisplay;
