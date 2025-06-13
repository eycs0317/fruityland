import {getLayout} from '@/data/layoutData';
import {getMessage} from '@/data/messageData';
import {getHome} from '@/data/homeData';
import {getRSVP} from '@/data/rsvpData';

export function l10n(contentGroup: string, contentKey: string, lang: string): string {
  let content: Record<string, Record<string, string>> = {};
  switch (contentGroup) {
    case 'layout': content = getLayout().layout; break;
    case 'home': content = getHome().home; break;
    case 'message': content = getMessage().message; break;
    case 'rsvp': content = getRSVP().rsvp; break;
  }

  return content[contentKey]?.[lang] ?? `[${contentKey}]`;
}
