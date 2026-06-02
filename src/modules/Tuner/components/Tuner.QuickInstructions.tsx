import React from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle } from 'lucide-react';

export const TunerQuickInstructions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col gap-3 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 p-4 select-none">
      {/* Título de Ajuda */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800/80 pb-2">
        <HelpCircle className="w-4 h-4 text-tunerState-success" />
        <h4 className="text-xs uppercase font-black tracking-wider text-slate-800 dark:text-tunerDark-text">
          {t('tuner.instructions.title')}
        </h4>
      </div>
      
      {/* Passos de Uso */}
      <ul className="flex flex-col gap-2.5 text-[11px] text-slate-600 dark:text-tunerDark-muted font-semibold leading-relaxed">
        <li className="flex gap-2">
          <span className="text-tunerState-success font-black">•</span>
          <span>{t('tuner.instructions.step1')}</span>
        </li>
        <li className="flex gap-2">
          <span className="text-tunerState-success font-black">•</span>
          <span>{t('tuner.instructions.step2')}</span>
        </li>
        <li className="flex gap-2">
          <span className="text-tunerState-success font-black">•</span>
          <span>{t('tuner.instructions.step3')}</span>
        </li>
        <li className="flex gap-2">
          <span className="text-tunerState-success font-black">•</span>
          <span>{t('tuner.instructions.step4')}</span>
        </li>
      </ul>
    </div>
  );
};

export default TunerQuickInstructions;
