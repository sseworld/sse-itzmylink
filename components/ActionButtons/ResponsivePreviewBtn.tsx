'use client';

import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Drawer } from 'vaul';
import { useData } from '@/lib/Context';
import { BACKGROUND_OPTIONS } from '../Background/BgSnippets';
import { DrawerContent, DrawerTrigger } from '../ui/Drrawer';
import DisplayData from '../DisplayData';

interface PreviewButtonProps {}

const PreviewButton: FC<PreviewButtonProps> = () => {
  const { MyLink } = useData();

  const [isEmpty, setIsEmpty] = React.useState<boolean>(false);

  React.useEffect(() => {
    function isEmptyValues(obj: any) {
      for (let key in obj) {
        if (obj[key] !== '' && obj[key].length !== 0) {
          return false;
        }
      }
      return true;
    }
    setIsEmpty(isEmptyValues(MyLink));
  }, [MyLink]);

  const selectedBgOption = MyLink
    ? BACKGROUND_OPTIONS.find((option) => option.code === MyLink.bg)
    : null;

  const selectedBgComponent = selectedBgOption
    ? selectedBgOption.component
    : null;

  return (
    <div className="fixed inset-x-0 bottom-0 p-4 z-10 flex justify-center items-center backdrop-blur-sm ">
      <Drawer.Root>
        <DrawerTrigger asChild>
          <Button className="rounded-full max-w-[350px] w-full tracking-wide overflow-y-auto">
            Preview page
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[75%] pb-2">
          {isEmpty ? (
            <div className="w-full text-sm text-muted-foreground h-[90%] flex justify-center items-center">
              Nothing to show...
            </div>
          ) : (
            <>
              {!isEmpty && selectedBgComponent}
              <div className="h-full pt-10 px-2">
                <DisplayData myData={MyLink} />
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer.Root>
    </div>
  );
};

export default PreviewButton;
