// metadata
export const metadata = {
  title: 'Precaution',
};

// react
import React from 'react';

// next
import Image from 'next/image';

// ui
import Heading from '@/ui/foundations/heading';
import Message from '@/ui/patterns/message';

// utils
import {l10n} from '@/utils/l10n';

// lib
import {getSession} from '@/lib/session';

export default async function MainPage() {
  const session = await getSession();
  const lang = session?.lang ?? 'zh-HK';

  switch (session.lang) {
    case 'en-US':
      return (
        <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
          <div className="m-4 bg-neutral-000 border border-neutral-000 mb-4 text-neutral-999 border-4 rounded-2xl">
            <section className="w-full p-8 text-center">
              <Heading level={1} content="Precaution" className="text-4xl pt-8 pb-4" />
            </section>
            <section className="w-full p-8 pt-0">
              <ol className="list-decimal ml-4 text-sm">
                <li>There may be numerous risks and dangers associated with the rides, and any participant, regardless of their use or misuse of the rides, may pose significant risks to themselves and others. Please carefully read the House Rules before entering and using the Inflatable Paradise, expressly assuming and accepting all risks that may arise from its use.</li>
                <li>Please comply with the restrictions on the use of the Inflatable Paradise, which include but are not limited to limitations on the number of users, age restrictions, admission instructions, and health and safety guidelines. Any violation of the rules and instructions provided by the staff on-site will increase the risk of accidents and may result in injury.</li>
                <li>The supplier, venue owner, or operator of the Inflatable Paradise shall not be held liable for any loss, injury, or accident arising from the use of the ride. Please take full responsibility for any potential consequences.</li>
                <li>Participants (adults and children) entering the inflatable playground agree to waive any liability for personal injury or death that may occur as a result of participating in the activities. This includes injuries or property damage caused by the negligence of the operators or the actions of other participants.</li>
                <li>If any loss occurs due to negligence or other actions during the inflatable playground activities, you agree to indemnify and protect the operators from any legal claims or costs, including reasonable legal fees.</li>
                <li>By joining the Inflatable Paradises, participants are deemed to have read and agreed to the House Rules and are bound by them.</li>
              </ol>
            </section>
          </div>
        </main>
      );
    case 'zh-CN':
      return (
        <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
          <section className="w-full p-8 text-center">
            <Heading level={1} content="Placeholder" className="text-4xl pt-8 pb-4" />
          </section>
        </main>
      );
    default:
      return (
        <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
          <div className="m-4 bg-neutral-000 border border-neutral-000 mb-4 text-neutral-999 border-4 rounded-2xl">
            <Message messageCode="I0004" />
            <section className="w-full p-8 pt-0 text-center">
              <Heading level={1} content="注意事項" className="text-4xl pt-8 pb-4" />
            </section>
            <section className="w-full p-8 pt-0">
              <ol className="list-decimal ml-4 text-sm">
                <li>充氣樂園可能存在許多風險和危險，任何參與者不論使用或濫用充氣樂園均有機會為參與者帶來重大風險。請必須仔細閱讀樂園規則後進入使用充氣樂園並明確承擔及接受使用充氣樂園衍生的所有相關風險。</li>
                <li>請遵守充氣樂園的使用限制，包括但不限於使用人數限制、年齡限制、進場須知或衛生安全等。任何違反充氣樂園守則和在場工作人員指示的行為將會增加事故發生的風險，並有可能導致傷害。</li>
                <li>充氣樂園的供應商、場地擁有者或營運者對於使用充氣樂園所造成的任何損失、傷害或意外事件概不負責。請自行承擔使用充氣樂園的一切風險和責任。</li>
                <li>參加者(大人和小孩)進入充氣樂園時，已代表同意放棄對任何因參與活動而可能出現的人身傷害或死亡的責任。這包括因為營運者的疏忽或其他參與者的行為而造成的傷害或財產損失。</li>
                <li>參加者(大人和小孩)在充氣樂園活動中發生疏忽或其他行為而導致任何損失，您將同意賠償並保護運營者不受任何法律索賠或費用的影響，包括合理的法律費用。</li>
                <li>參加活動即表示參加者(大人和小孩)已閱讀並同意上述所有條款及指引，並承諾遵守這些規則。</li>
              </ol>
            </section>
          </div>
          <div className="m-4 bg-neutral-000 border border-neutral-000 mb-4 text-neutral-999 border-4 rounded-2xl">
            <section className="w-full p-8 text-center">
              <Heading level={1} content="Precaution" className="text-4xl pt-8 pb-4" />
            </section>
            <section className="w-full p-8 pt-0">
              <ol className="list-decimal ml-4 text-sm">
                <li>There may be numerous risks and dangers associated with the rides, and any participant, regardless of their use or misuse of the rides, may pose significant risks to themselves and others. Please carefully read the House Rules before entering and using the Inflatable Paradise, expressly assuming and accepting all risks that may arise from its use.</li>
                <li>Please comply with the restrictions on the use of the Inflatable Paradise, which include but are not limited to limitations on the number of users, age restrictions, admission instructions, and health and safety guidelines. Any violation of the rules and instructions provided by the staff on-site will increase the risk of accidents and may result in injury.</li>
                <li>The supplier, venue owner, or operator of the Inflatable Paradise shall not be held liable for any loss, injury, or accident arising from the use of the ride. Please take full responsibility for any potential consequences.</li>
                <li>Participants (adults and children) entering the inflatable playground agree to waive any liability for personal injury or death that may occur as a result of participating in the activities. This includes injuries or property damage caused by the negligence of the operators or the actions of other participants.</li>
                <li>If any loss occurs due to negligence or other actions during the inflatable playground activities, you agree to indemnify and protect the operators from any legal claims or costs, including reasonable legal fees.</li>
                <li>By joining the Inflatable Paradises, participants are deemed to have read and agreed to the House Rules and are bound by them.</li>
              </ol>
            </section>
          </div>
          <footer className="grid justify-items-center relative w-full pt-4">
            <Image src="/assets/i/brand/logo-cy-bw.png" alt={l10n('layout', 'mall', lang)} width="100" height="100" />
          </footer>
        </main>
      );
  }
}
