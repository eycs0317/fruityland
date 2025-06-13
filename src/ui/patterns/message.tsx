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
      case 'E':
        return (
          <section className="bg-alert-100 px-4 py-2 border border-alert-600 mb-4">
            <p>{message}</p>
          </section>
        );
      case 'I':
        return (
          <section className="bg-info-100 px-4 py-2 border border-info-600 mb-4">
            <p>{message}</p>
          </section>
        );
      case 'S':
        return (
          <section className="bg-success-100 px-4 py-2 border border-success-600 mb-4">
            <p>{message}</p>
          </section>
        );
    }
  }
}
