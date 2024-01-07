'use client';

import { useAction } from '@/hooks/use-action';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '../ui/popover';
import { createBoard } from '@/actions/create-board';
import { X } from 'lucide-react';
import FormSubmit from './form-submit';
import { ElementRef, ReactNode, useRef } from 'react';
import { Button } from '../ui/button';
import { FormInput } from './form-input';
import { toast } from 'sonner';
import FormPicker from './form-picker';
import { useRouter } from 'next/navigation';

interface FormPopoverProps {
  children: ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const FormPopover = ({
  children,
  align,
  side = 'bottom',
  sideOffset = 0,
}: FormPopoverProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success('Board created !');
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const image = formData.get('image') as string;
    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={'ghost'}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="spae-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              errors={fieldErrors}
              type="text"
              id="title"
              label="Board title"
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
