// metadata
export const metadata = {
  title: 'Waiver',
};

// react
import React from 'react';

// ui
import Heading from '@/ui/foundations/heading';

// lib
import {getSession} from '@/lib/session';

export default async function MainPage() {
  const session = await getSession();

  switch (session.lang) {
    case 'en-US':
      return (
        <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
          <section className="w-full p-8 text-center">
            <Heading level={1} content="Waiver" className="text-4xl pt-8 pb-4" />
          </section>
          <section className="w-full p-8">
            <p>The purpose of this disclaimer (hereinafter referred to as &quot;this Statement&quot;) is to clearly inform users (hereinafter referred to as &quot;I&quot;) about the use of Inflatable Paradise, and the associated equipment.</p>
            <ol className="list-decimal ml-4 text-sm">
              <li>I agree and understand that there may be numerous risks and dangers associated with the rides, and that any participant, regardless of their use or misuse of the rides, may pose significant risks to themselves and others. After carefully reading the Terms and Conditions of the Inflatable Paradise and this Statement, I agree to enter and use the Inflatable Paradise, expressly assuming and accepting all risks that may arise from its use.</li>
              <li>I agree to comply with the restrictions on the use of the Inflatable Paradise, which include but are not limited to limitations on the number of users, age restrictions, admission instructions, and health and safety guidelines. Any violation of the rules and instructions provided by the staff on-site will increase the risk of accidents and may result in injury.</li>
              <li>The supplier, venue owner, or operator of the Inflatable Paradise shall not be held liable for any loss, injury, or accident arising from the use of the ride. I acknowledge that I use the Inflatable Paradise at my own risk and take full responsibility for any potential consequences.</li>
              <li>I confirm that I am at least 18 years of age, and I accept and agree to this Statement. Furthermore, on behalf of the participants listed below who are under the age of 18 (hereinafter referred to as &quot;Minors&quot;), I agree to the contents of this Statement as their parent or legal guardian.</li>
              <li>In the case of minors, if applicable, I declare that I have the eligibility or represent the eligibility of the minor&apos;s parent or legal guardian to accept the terms of this statement on their behalf.</li>
              <li>To the fullest extent permitted by law, I hereby waive any liability for personal injury or death, whether directly or indirectly caused by the negligence of the Operator, arising from or in connection with the access or use of the Attraction by any participant, including myself and minors. I also waive any liability for property damage or other losses, including but not limited to negligence, negligence in supervision, negligent instructions, defective equipment, or activities of other participants.</li>
              <li>To the fullest extent permitted by law, I agree to indemnify and hold the Operator harmless from all losses, claims, actions, damages, liabilities (whether connected or multiple), costs, and expenses (including reasonable legal fees) arising from my or any minor&apos;s participation in any activity, negligence, omission, act, or conduct in the use of the Ride.</li>
              <li>By joining the Inflatable Paradises, you are deemed to have read and agreed to the terms and conditions of this disclaimer and are bound by them.</li>
            </ol>
          </section>
        </main>
      );
    case 'zh-CN':
      return (
        <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
          <section className="w-full p-8 text-center">
            <Heading level={1} content="免责声明" className="text-4xl pt-8 pb-4" />
          </section>
          <section className="w-full p-8">
            <p>本免责声明（以下简称“本声明”）旨在明确告知使用充气乐园的用户（以下简称「本人」）有关使用充气乐园的风险和责任。</p>
            <ol className="list-decimal ml-4 text-sm">
              <li>本人同意并理解，充气乐园可能存在许多风险和危险，任何参与者无论是否正确使用充气乐园，均可能面临重大风险。本人在仔细阅读充气乐园守则及本声明后，同意进入并使用充气乐园，并明确承担和接受所有相关风险。</li>
              <li>本人承诺遵守充气乐园的使用规定，包括但不限于人数限制、年龄限制、入场须知或卫生与安全等要求。任何违反守则或工作人员指示的行为都可能增加事故发生的风险，甚至造成伤害。</li>
              <li>充气乐园的供应商、场地拥有者或运营方对使用充气乐园所造成的任何损失、伤害或意外事件概不负责。本人将自行承担使用充气乐园的一切风险与责任。</li>
              <li>本人确认本人已年满18岁，并接受且同意本声明内容，同时作为下文所列未满18岁的参与者（以下简称“未成年人”）的父母或法定监护人，代表其同意本声明内容。</li>
              <li>就未成年人（如有）而言，本人声明本人具备或代表其父母或法定监护人，有资格代表他们接受本声明的条款。</li>
              <li>在法律允许的最大范围内，本人特此放弃因本人或任何参与者（包括本人及未成年人）进入或使用充气乐园而引起的或相关的任何人身伤害或死亡责任，无论是否由运营方的疏忽直接或间接造成；以及任何财产损失或其他损害，包括但不限于疏忽管理、疏忽指导、有缺陷的设备或其他参与者的行为所造成的损失。</li>
              <li>在法律允许的最大范围内，无论是否因本人或任何未成年人在使用充气乐园时的疏忽、疏漏、行为、不当操作或其他行为所引起的任何损失、索赔、诉讼、损害赔偿、责任（包括连带或多方责任）、费用与开支（包括合理的法律费用），本人同意对运营方作出赔偿并保障其不受影响。</li>
              <li>参与本活动即表示您已阅读并同意本免责声明条款，并愿意受其约束。</li>
            </ol>
          </section>
        </main>
      );
    default:
      return (
        <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
          <div className="m-4 bg-neutral-000 border border-neutral-000 mb-4 text-neutral-999 border-4 rounded-2xl">
            <section className="w-full p-8 text-center">
              <Heading level={1} content="免責聲明" className="text-4xl pt-8 pb-4" />
            </section>
            <section className="w-full p-8 pt-0">
              <p>本免責聲明(以下稱為「本聲明」)旨在明確告知使用充氣樂園的使用者（以下稱為「本人」）有關使用充氣樂園的風險和責任。</p>
              <ol className="list-decimal ml-4 text-sm">
                <li>本人同意並理解，充氣樂園可能存在許多風險和危險，任何參與者不論使用或濫用充氣樂園均有機會為參與者帶來重大風險。本人在仔細閱讀充氣樂園守則及本聲明後同意進入使用充氣樂園並明確承擔及接受使用充氣樂園衍生的所有相關風險。</li>
                <li>本人承諾遵守充氣樂園的使用限制，包括但不限於使用人數限制、年齡限制、進場須知或衛生安全等。任何違反充氣樂園守則和在場工作人員指示的行為將會增加事故發生的風險，並有可能導致傷害。</li>
                <li>充氣樂園的供應商、場地擁有者或營運者對於使用充氣樂園所造成的任何損失、傷害或意外事件概不負責。本人將自行承擔使用充氣樂園的一切風險和責任。</li>
                <li>本人確認本人已年滿18歲，並接受及同意本聲明，及代表以下列出的未滿18歲的參與者（以下稱為「未成年人」）作為其父母或法定監護人同意本聲明之內容。</li>
                <li>就未成年人(如有)而言，本人聲明本人擁有或代表未成年人的父母或法定監護人代表他們接受本聲明條款的資格。</li>
                <li>在法律允許的最大範圍內，本人特此放棄因任何參與者(包括本人及未成人)進入或使用充氣樂園而引起或與相關的任何人身傷害或死亡的任何責任，無論是否由營運者的疏忽直接或間接造成的；以及任何財產損失或其他損失，包括但不限於任何疏忽，疏忽監督和/或疏忽指示，有缺陷的設備或其他參與者的活動。</li>
                <li>在法律允許的最大範圍內，不論是否由於本人或任何未成年人參與任何活動，使用充氣樂園時的疏忽、遺漏、舉動、操守或行為，我同意賠償並保障運營者免受所有和任何損失、索償、訴訟、損害賠償、責任(無論是聯繫或多項)成本和費用 (包括合理的法律費用)。</li>
                <li>參與活動即視為您已閱讀並同意本免責聲明條款及細則，並同意受其約束。</li>
              </ol>
            </section>
          </div>
        </main>
      );
  }
}
