'use client';

import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import { encodeData } from '@/lib/utils';

import { Check, Copy, Send, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { useData } from '@/lib/Context';

interface PublishProps {}

const Publish: FC<PublishProps> = ({}) => {
  const { MyLink } = useData();

  const isEmpty = isEmptyValues(MyLink);
  const [inputLink, setInputLink] = React.useState<string>('');
  const [hasCopied, setHasCopied] = React.useState<boolean>(false);

  function isEmptyValues(obj: any) {
    for (let key in obj) {
      if (obj[key] !== '' && obj[key].length !== 0) {
        return false;
      }
    }
    return true;
  }

  const copyToClipboard = React.useCallback(() => {
    const url = `${window.location.origin}/1?data=${encodeData(MyLink)}`;
    navigator.clipboard.writeText(url);
    return url;
  }, [MyLink]);

  React.useEffect(() => {
    setHasCopied(false);
  }, [MyLink]);

  function publish() {
    if (!isEmpty) {
      const getUrl = copyToClipboard();
      setInputLink(getUrl);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={publish}>
          <Send className="mr-2 h-4 w-4" />
          Publish
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Share your page
          </DialogTitle>
          <DialogDescription className="text-left">
            You can share your page with others and make it accessible from
            anywhere.
          </DialogDescription>
        </DialogHeader>
        {!isEmpty ? (
          <>
            <Input value={inputLink} readOnly />
            <DialogFooter>
              <div className="flex gap-3 w-full justify-between items-center">
                <Button
                  className="w-full"
                  onClick={() => {
                    navigator.share({
                      title: `${MyLink.n} - itZmyLink`,
                      text: `Find all of ${MyLink.n}'s links in one place.`,
                      url: `${inputLink}`,
                    });
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    copyToClipboard();
                    setHasCopied(true);
                  }}
                >
                  {hasCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <DialogClose>
            <Button className="w-full">
              Can&#39;t publish with empty fields!
            </Button>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Publish;
