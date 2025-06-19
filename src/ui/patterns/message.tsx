// nextjs
import Image from 'next/image';

// utils
import {l10n} from '@/utils/l10n';

// lib
import {getSession} from '@/lib/session';

export default async function Message({ messageCode }: { messageCode: string }) {
  const session = await getSession();
  const lang = session?.lang ?? 'zh-HK';

  if (messageCode) {
    const message = l10n('message', messageCode.toLowerCase(), lang);

    switch(messageCode.charAt(0)) {
      case 'M':
        return (
          <section className="messageErrorIcon bg-primary-300 px-5 py-10 border border-neutral-000 mb-4 text-neutral-000 border-4 rounded-2xl">
            <div className="flex flex-row content-center">
              <Image src="/assets/i/icons/error.svg" alt={message} width="25" height="25" />
              <p className="pl-4">{message}</p>
            </div>
          </section>
        );
      case 'E':
        return (
          <section className="messageError bg-primary-300 px-5 py-10 border border-neutral-000 mb-4 text-neutral-000 border-4 rounded-2xl">
            <p>{message}</p>
          </section>
        );
      case 'I':
        return (
          <section className="messageInfo bg-primary-300 px-5 py-10 border border-neutral-000 mb-4 text-neutral-000 border-4 rounded-2xl">
            <p>{message}</p>
          </section>
        );
      case 'S':
        return (
          <section className="messageSuccess bg-primary-300 px-5 py-10 border border-neutral-000 mb-4 text-neutral-000 border-4 rounded-2xl">
            <p>{message}</p>
          </section>
        );
    }
  }
}
