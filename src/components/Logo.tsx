import { cn } from '@/lib/utils';

type Props = { wordmark: string; tagline: string; className?: string; inverted?: boolean };

export default function Logo({ wordmark, tagline, className, inverted }: Props) {
  const words = tagline.split(' ');
  const half = Math.floor(words.length / 2);
  return (
    <span className={cn('inline-flex items-center gap-3', inverted ? 'text-white' : 'text-foreground', className)}>
      <span className="font-sans text-[28px] font-black leading-none tracking-[-0.04em]">{wordmark}</span>
      <span className="whitespace-nowrap text-[8.5px] font-medium uppercase leading-[1.15] tracking-[0.02em]">
        {words.slice(0, half).join(' ')}
        <br />
        {words.slice(half).join(' ')}
      </span>
    </span>
  );
}
