import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '../ui/tooltip';

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  sideOffset?: number;
}

const Hint = ({
  children,
  description,
  side = 'bottom',
  sideOffset = 0,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          className="text-sm max-w-[220px] break-words"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
