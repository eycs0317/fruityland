// metadata
export const metadata = {
  title: 'House Rules',
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
          <div className="m-4 bg-neutral-000 border border-neutral-000 mb-4 text-neutral-999 border-4 rounded-2xl">
            <section className="w-full p-8 text-center">
              <Heading level={1} content="House Rules" className="text-4xl pt-8 pb-4" />
            </section>
            <section className="w-full p-8 pt-0">
              <Heading level={2} content="Admission Instructions" className="text-2xl pb-8" />
              <ol className="list-decimal ml-4 text-sm">
                <li>Participation will be available through online reservations and a walk-in pass. Participants must redeem various entry tickets using MTR Mall points to enter the venue. Inflatable Paradises will be allocated on a first-come, first-served basis, with a limited quota per session.</li>
                <li>For safety reasons, participants must be aged between 3 and 12 years, and children must be taller than 80 cm. Measuring tools will be provided on-site, and the staff will make the final decision.</li>
                <li>A child must be accompanied by an adult (18 years old or above). The operator only provides venue facilities services and does not take care of children.</li>
                <li>For hygiene and safety reasons, all participants must wear socks and comfortable clothing when entering and playing in the inflatable playground. We strongly recommend that children wear non-slip socks to prevent tripping and ensure a safer play experience. Participants may bring their own non-slip socks. A limited quantity of non-slip socks is available on-site and can be redeemed for 100 MTR points. (While supplies last.) Parents/Guardians should ensure that their children avoid wearing clothing that may easily come off or become too revealing while playing on the Inflatable Paradise, as well as clothing that may pose a choking hazard.</li>
                <li>Parents/Guardians must be responsible for the safety of their children or the children they bring with them to the Inflatable Paradise and bear full responsibility for taking care of accompanying children.</li>
                <li>Parents/Guardians need to guide and supervise their accompanying children and do not run, push, fight, bully, litter or defecate in the field and shall ensure that their children follow the instructions of staff, otherwise, they may be asked to refrain from playing on the Inflatable Paradise.</li>
                <li>The venue has a pram parking area. Strollers, pushchairs, shopping carts, storage bins with wheels, luggage, or any bulky items are not allowed inside the Inflatable Paradise.</li>
                <li>Before entering the venue, all shoes, badges, and jewelry (such as large earrings and necklaces) any sharp objects must be removed from all participating children to prevent damaging the venue and any related equipment as well as to avoid the risk of injuring the child to whom such items belong and of other participating children.</li>
              </ol>
              <Heading level={2} content="Health and Safety" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>The venue must be kept clean, eating and drinking is strictly prohibited, and no food (including chewing gum) or drinks are allowed into the venue.</li>
                <li>Littering, spitting, or any other unhygienic behavior is strictly prohibited.</li>
                <li>For hygiene and safety reasons, all participants must wear socks and comfortable clothing when entering and playing in the inflatable playground. We strongly recommend that children wear non-slip socks to prevent tripping and ensure a safer play experience. Participants may bring their own non-slip socks. A limited quantity of non-slip socks is available on-site and can be redeemed for 100 MTR points. (While supplies last.) The use of obscene language or conduct deemed indecent, offensive, disturbing, or inappropriate is prohibited on the premises.</li>
                <li>The organizer reserves the right to refuse entry or expel any person who may transmit diseases, exhibit aggression, or engage in violent behavior towards others.</li>
                <li>Please do not obstruct or interfere with the staff while they are performing their duties or enforcing venue rules.</li>
                <li>If participants are feeling unwell, please notify venue staff immediately.</li>
                <li>The organizer does not assume any responsibility for injuries caused by improper use of facilities by participants.</li>
                <li>A first aid kit is available on-site for emergencies. If necessary, please contact the staff.</li>
                <li>To ensure the safety of all participants, please follow the instructions of the on-site staff. The venue is equipped with a closed-circuit television surveillance system for 24-hour monitoring.</li>
                <li>To maintain the cleanliness of the venue, staff will clean and disinfect the premises periodically throughout the day.</li>
              </ol>
              <Heading level={2} content="Personal belongings" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>When entering the venue to play, participants should take care of their personal belongings and avoid bringing any valuables into the venue. The organizer is not responsible for any loss or damage.</li>
                <li>The organizer reserves the right to dispose of any unclaimed property without prior notice.</li>
              </ol>
              <Heading level={2} content="Facilities" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>Quotas apply to all Inflatable Paradises in the venue. Inflatable Paradises will be allocated on a first-come, first-served basis, with a limited quota per session.</li>
                <li>Each play session at the inflatable playground lasts 20 minutes. Participants with online reservations must arrive 10 minutes before their scheduled session to complete check-in procedures.<br/>
                    Participants with on-site tickets must arrive 5 minutes before the time stated on their ticket to allow sufficient time for registration. Late arrivals will not be granted extra playtime or refunded.</li>
                <li>The organizer will regularly assign personnel to inspect and maintain the facilities. If participants notice any damage to any facilities in the venue, please notify the venue staff immediately.</li>
                <li>If a participant damages the facilities in the Inflatable Paradise during their admission to the amusement facilities, the organizer reserves the right to seek reasonable compensation from the participant. The amount of compensation will be determined by the organizer.</li>
              </ol>
              <Heading level={2} content="Arrangements under Bad Weather Conditions" className="text-2xl pt-8 pb-4" />
              <p className="text-sm">The activities will be cancelled in the situation where Black Rainstorm Signal or T8 and above typhoon signal. Related MTR Points will return to the participants’ account within 10 working days. Please refer to the table below for information on arrangements under bad weather conditions.</p>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Weather Conditions</th>
                    <th className="py-3 px-4 text-left">Arrangements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>Amber or Red Rainstorm Signals, or</li>
                        <li>Tropical Cyclone Warning Signal 1 or 3</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">Activities will be held as scheduled</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left italic align-top" colSpan={2}>Black Rainstorm Signal, or Tropical Cyclone Warning Signal 8 or above</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>Issued before 8AM</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">All activities of the day will be cancelled</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>Issued between 8AM and 3PM and remained valid past 3PM</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">All activities of the day will be cancelled</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>Between 8AP and 3PM, the signal is changed to Amber or Red Rainstorm Signals, or Tropical Cyclone Warning Signal 1 or 3</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">Activities will be held as scheduled after 5PM</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left italic align-top" colSpan={2}>Issued during the activities (i.e. at 12NN or after)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>Black Rainstorm Signal</li>
                        <li>Tropical Cyclone Warning Signal 8 or above, or</li>
                        <li>If an upcoming Tropical Cyclone Warning Signal 8 or above is announced during the activities</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left font-bold align-top">Activities will be held as scheduled<br/>
                      All activities of the day will be cancelled, participants must follow the instructions of on-site staff to exit the venue safety.</td>
                  </tr>
                </tbody>
              </table>
              <Heading level={2} content="Precautions" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>Young children should not play alone, especially when climbing and landing, as they may require adult supervision.</li>
                <li>Parents/Guardians with children who are suffering from any injuries, skin diseases, illness, fever, heart condition, neck or spinal problems MUST refrain from letting their children play on the event and shall be solely responsible for the safety and well-being of their children if they fail to heed to this warning. Organizer reserves the right to refuse the entry of any children to play in/on the event on the grounds of safety for the child concerned and/or for the safety of other participating children if the organizer becomes aware of any of the aforesaid conditions affecting any of the participating children.</li>
                <li>Before using the slide, make sure to remove items from your pockets that may easily be dropped.</li>
                <li>Do not slide down the edge of the slide or attempt to climb up the slide in the wrong direction.</li>
                <li>Do not swing, run, or make dangerous movements such as jumping on the slide.</li>
                <li>All participants are requested to follow the instructions of the on-site staff. If there are repeated failures to comply, the staff reserves the right to refuse entry or expel participants from the inflatable playground.</li>
                <li>You acknowledge and accept that the organizer is at liberty to make any changes or adjustments to the rules and format of this event from time to time without giving prior notice. In the event of any disputes arising out of this event. The organizer shall have the full and final say on all matters concerning this Event. In case of any discrepancy between the English and Chinese versions of these terms and conditions, the Chinese version shall prevail.</li>
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
            <section className="w-full p-8 text-center">
              <Heading level={1} content="樂園守則" className="text-4xl pt-8 pb-4" />
            </section>
            <section className="w-full p-8 pt-0">
              <Heading level={2} content="進場須知" className="text-2xl pb-8" />
              <ol className="list-decimal ml-4 text-sm">
                <li>每日將會分別以網上預約及現場派籌形式參加，參加者必須透過mtr分換領各款入場券，每日每節時段之名額有限，換完即止。</li>
                <li>基於安全考慮，參加者年齡必須介乎於3歲至12歲，身高必須高於80cm以上的兒童，現場會提供量度工具以在場工作人員之最終決定為準。</li>
                <li>每位小童必須由一位18歲或以上成人陪同進場，並須全程看守及照顧該名參加者。主辦單位不會提供任何托管服務。</li>
                <li>基於衛生和安全理由，在進入吹氣樂園遊玩時，所有參加者必須穿著襪子`和舒適的衣服。另外，本處強烈呼籲入場小童穿著防滑襪，以防絆倒。參加者可自備防滑襪入場，大會現場有提供少量防滑襪以100MTR分換領，（數量有限，換完即止）。家長/監護人應確保他們的兒童避免穿著任何在吹氣樂園時，可能容易脫落或變得過於暴露或可能造成窒息危險的衣服。</li>
                <li>家長/監護人必須負責其子女或其帶來之兒童在吹氣樂園内的安全，並須承擔有關照顧同行兒童之全部責任。</li>
                <li>家長/監護人必須指導及看管隨行之兒童，切勿在場內奔跑、推撞、打架、欺凌、亂拋物品或隨地便溺，並確保隨行之兒童遵循現場工作人員的指示，否則他們可能被要求停止在吹氣樂園內玩耍。</li>
                <li>禁止攜帶嬰兒車、手推車、購物車，以及附有車輪的儲物箱，行李或任何大型物品入場內。</li>
                <li>進入吹氣樂園前，所有參加者必須把鞋子、徽章和配飾（如大耳環和項鍊）以及任何尖銳物品取下，以防損壞吹氣樂園和任何相關設備，以及避免對這些物品所屬的兒童和其他參與兒童造成傷害。</li>
              </ol>
              <Heading level={2} content="衛生及安全" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>必須保持場地清潔，場内嚴禁飲食，不可攜帶食物（包括口香糖）和/或飲料進場。</li>
                <li>禁止亂拋垃圾、吐痰或作出任何有欠衛生的行為。</li>
                <li>基於衛生和安全理由，在進入吹氣樂園遊玩時，所有參加者必須穿著襪子`和舒適的衣服。另外，本處強烈呼籲入場小童穿著防滑襪，以防絆倒。參加者可自備防滑襪入場，大會現場有提供少量防滑襪以100MTR分換領，（數量有限，換完即止）。 防滑襪子是否合格以在場工作人員之最終決定為準。</li>
                <li>場内禁止使用猥褻語言，或做出視為不雅、冒犯、攻擊性、令人不安或不當的行為。</li>
                <li>現場工作人員保留權利拒絕或驅逐任何有可能對其他人構成疾病傳播、攻擊性或暴力之人士進入吹氣樂園。</li>
                <li>切勿阻礙或影響工作人員履行職務或執行任何場地守則。</li>
                <li>參加者如發現有任何身體不適，請即通知場内工作人員。</li>
                <li>參加者如因不當使用設施而導致受傷，營運商及主辦單位概不承擔任何責任。</li>
                <li>場内備有急救藥箱，以便不時之需。如有需要請與工作人員聯絡。</li>
                <li>為保障參加者之安全，請遵循現場工作人員之指示，場内亦設有閉路電視監察系統進行 24小時監察。為確保場内清潔，工作人員在場内會定時清潔及消毒。</li>
              </ol>
              <Heading level={2} content="個人財物" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>進場遊玩時，參加者應小心看管個人財物，避免攜帶任何貴重物品進場。
如有遺失或損毁，主辦單位概不負責。</li>
                <li>主辦單位營運商保留處理所有無人認領財物的權利而不作另行通知。</li>
              </ol>
              <Heading level={2} content="設施" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>名額適用於場內的所有吹氣樂園，吹氣樂園將以先到先得的方式換領，每日每節名額有限，換完即止。</li>
                <li>每節吹氣樂園的遊戲時間為二十分鐘。凡經網上預約所列的時間的參加者必須提早10分鐘前到場辦理入場手續。手持現場派籌之參加者請於門票所例的時間提早5分鐘前到達，以便預留足夠時間登記，遲到將不獲補時。主辦單位將定期安排人員檢查及維修各項設施，若參加者發現場內任何設施損壞，請即通知場內工作人員。</li>
                <li>若參加者於進入吹氣樂園期間損壞了吹氣樂園內的設施，主辦單位有權向參加者索取合理賠償，金額由主辦單位決定。</li>
              </ol>
              <Heading level={2} content="惡劣天氣安排" className="text-2xl pt-8 pb-4" />
              <p className="text-sm">因颱風或其他惡劣天氣而被取消之此，恕不另行通告，有關的MTR分將會於10個工作天內退回參加者戶口。有關惡劣天氣情況下的安排信息，請參閱下表。</p>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">天氣情況</th>
                    <th className="py-3 px-4 text-left">安排</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>黃、紅色暴雨警告信號或</li>
                        <li>熱帶氣旋警告信號1或3</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">活動將如期舉行</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left italic align-top" colSpan={2}>黑色暴雨警告信號或熱帶氣旋警告信號8或以上</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>在上午8時前發出</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">當天所有活動取消</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>在上午8時至下午3時期間發出並維持有效</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">當天所有活動取消</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>在上午8時至下午3時期間發出，但信號改為黃、紅色暴雨警告信號或熱帶氣旋警告信號1或3</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">下午5時後的活動將如期舉行</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left italic align-top" colSpan={2}>在活動期間發出（即下午12時或之後）</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>黑色暴雨警告信號</li>
                        <li>熱帶氣旋警告信號8或以上或</li>
                        <li>在活動期間宣布即將發出熱帶氣旋警告信號8或以上</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left font-bold align-top">活動將如期舉行<br/>當天所有活動取消，參加者必須在在安全情況下遵從現場工作人員指示儘快離開場地。</td>
                  </tr>
                </tbody>
              </table>
              <Heading level={2} content="注意事項" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>幼小兒童不宜單獨遊玩，尤其在攀登及着地時需要成人保護。</li>
                <li>家長/監護人必須避免讓任何受傷、患有皮膚疾病、疾病、發燒、心臟病、頸部或脊椎問題的兒童參與吹氣樂園活動，若他們不聽從此警告，他們將獨自負責其子女的安全和健康。主辦單位若發現任何參加兒童受到上述任何條件的影響，可能會危及參加兒童的安全，主辦單位有權拒絕任何兒童進入/參加吹氣樂園活動。</li>
                <li>使用滑梯前，請確保將口袋中容易掉落之物品移除。</li>
                <li>請勿沿滑梯邊緣滑下或逆行爬上滑梯。</li>
                <li>請勿在滑梯上搖擺，跑動或作出跳躍等危險動作。</li>
                <li>請所有參加者遵循現場工作人員的指示，如多次勸喻無效，現場工作人員保留權利拒絕或驅逐參加者進入吹氣樂園。</li>
                <li>您承認並接受主辦單位有權隨時對活動的規則及相關條款做出任何變更或調整，而不需要事先通知。如因此次活動而產生任何爭議，主辦單位擁有對此活動有關事宜的最终決定權利。如條款及細則的英文版本與中文版本有任何不一致，均以中文版本為準。</li>
              </ol>
            </section>
          </div>
          <div className="m-4 bg-neutral-000 border border-neutral-000 mb-4 text-neutral-999 border-4 rounded-2xl">
            <section className="w-full p-8 text-center">
              <Heading level={1} content="House Rules" className="text-4xl pt-8 pb-4" />
            </section>
            <section className="w-full p-8 pt-0">
              <Heading level={2} content="Admission Instructions" className="text-2xl pb-8" />
              <ol className="list-decimal ml-4 text-sm">
                <li>Participation will be available through online reservations and a walk-in pass. Participants must redeem various entry tickets using MTR Mall points to enter the venue. Inflatable Paradises will be allocated on a first-come, first-served basis, with a limited quota per session.</li>
                <li>For safety reasons, participants must be aged between 3 and 12 years, and children must be taller than 80 cm. Measuring tools will be provided on-site, and the staff will make the final decision.</li>
                <li>A child must be accompanied by an adult (18 years old or above). The operator only provides venue facilities services and does not take care of children.</li>
                <li>For hygiene and safety reasons, all participants must wear socks and comfortable clothing when entering and playing in the inflatable playground. We strongly recommend that children wear non-slip socks to prevent tripping and ensure a safer play experience. Participants may bring their own non-slip socks. A limited quantity of non-slip socks is available on-site and can be redeemed for 100 MTR points. (While supplies last.) Parents/Guardians should ensure that their children avoid wearing clothing that may easily come off or become too revealing while playing on the Inflatable Paradise, as well as clothing that may pose a choking hazard.</li>
                <li>Parents/Guardians must be responsible for the safety of their children or the children they bring with them to the Inflatable Paradise and bear full responsibility for taking care of accompanying children.</li>
                <li>Parents/Guardians need to guide and supervise their accompanying children and do not run, push, fight, bully, litter or defecate in the field and shall ensure that their children follow the instructions of staff, otherwise, they may be asked to refrain from playing on the Inflatable Paradise.</li>
                <li>The venue has a pram parking area. Strollers, pushchairs, shopping carts, storage bins with wheels, luggage, or any bulky items are not allowed inside the Inflatable Paradise.</li>
                <li>Before entering the venue, all shoes, badges, and jewelry (such as large earrings and necklaces) any sharp objects must be removed from all participating children to prevent damaging the venue and any related equipment as well as to avoid the risk of injuring the child to whom such items belong and of other participating children.</li>
              </ol>
              <Heading level={2} content="Health and Safety" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>The venue must be kept clean, eating and drinking is strictly prohibited, and no food (including chewing gum) or drinks are allowed into the venue.</li>
                <li>Littering, spitting, or any other unhygienic behavior is strictly prohibited.</li>
                <li>For hygiene and safety reasons, all participants must wear socks and comfortable clothing when entering and playing in the inflatable playground. We strongly recommend that children wear non-slip socks to prevent tripping and ensure a safer play experience. Participants may bring their own non-slip socks. A limited quantity of non-slip socks is available on-site and can be redeemed for 100 MTR points. (While supplies last.) The use of obscene language or conduct deemed indecent, offensive, disturbing, or inappropriate is prohibited on the premises.</li>
                <li>The organizer reserves the right to refuse entry or expel any person who may transmit diseases, exhibit aggression, or engage in violent behavior towards others.</li>
                <li>Please do not obstruct or interfere with the staff while they are performing their duties or enforcing venue rules.</li>
                <li>If participants are feeling unwell, please notify venue staff immediately.</li>
                <li>The organizer does not assume any responsibility for injuries caused by improper use of facilities by participants.</li>
                <li>A first aid kit is available on-site for emergencies. If necessary, please contact the staff.</li>
                <li>To ensure the safety of all participants, please follow the instructions of the on-site staff. The venue is equipped with a closed-circuit television surveillance system for 24-hour monitoring.</li>
                <li>To maintain the cleanliness of the venue, staff will clean and disinfect the premises periodically throughout the day.</li>
              </ol>
              <Heading level={2} content="Personal belongings" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>When entering the venue to play, participants should take care of their personal belongings and avoid bringing any valuables into the venue. The organizer is not responsible for any loss or damage.</li>
                <li>The organizer reserves the right to dispose of any unclaimed property without prior notice.</li>
              </ol>
              <Heading level={2} content="Facilities" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>Quotas apply to all Inflatable Paradises in the venue. Inflatable Paradises will be allocated on a first-come, first-served basis, with a limited quota per session.</li>
                <li>Each play session at the inflatable playground lasts 20 minutes. Participants with online reservations must arrive 10 minutes before their scheduled session to complete check-in procedures.<br/>
                    Participants with on-site tickets must arrive 5 minutes before the time stated on their ticket to allow sufficient time for registration. Late arrivals will not be granted extra playtime or refunded.</li>
                <li>The organizer will regularly assign personnel to inspect and maintain the facilities. If participants notice any damage to any facilities in the venue, please notify the venue staff immediately.</li>
                <li>If a participant damages the facilities in the Inflatable Paradise during their admission to the amusement facilities, the organizer reserves the right to seek reasonable compensation from the participant. The amount of compensation will be determined by the organizer.</li>
              </ol>
              <Heading level={2} content="Arrangements under Bad Weather Conditions" className="text-2xl pt-8 pb-4" />
              <p className="text-sm">The activities will be cancelled in the situation where Black Rainstorm Signal or T8 and above typhoon signal. Related MTR Points will return to the participants’ account within 10 working days. Please refer to the table below for information on arrangements under bad weather conditions.</p>
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Weather Conditions</th>
                    <th className="py-3 px-4 text-left">Arrangements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>Amber or Red Rainstorm Signals, or</li>
                        <li>Tropical Cyclone Warning Signal 1 or 3</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">Activities will be held as scheduled</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left italic align-top" colSpan={2}>Black Rainstorm Signal, or Tropical Cyclone Warning Signal 8 or above</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>Issued before 8AM</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">All activities of the day will be cancelled</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>Issued between 8AM and 3PM and remained valid past 3PM</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">All activities of the day will be cancelled</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>Between 8AP and 3PM, the signal is changed to Amber or Red Rainstorm Signals, or Tropical Cyclone Warning Signal 1 or 3</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left align-top">Activities will be held as scheduled after 5PM</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left italic align-top" colSpan={2}>Issued during the activities (i.e. at 12NN or after)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-left align-top">
                      <ul className="list-disc ml-4">
                        <li>Black Rainstorm Signal</li>
                        <li>Tropical Cyclone Warning Signal 8 or above, or</li>
                        <li>If an upcoming Tropical Cyclone Warning Signal 8 or above is announced during the activities</li>
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-left font-bold align-top">Activities will be held as scheduled<br/>
                      All activities of the day will be cancelled, participants must follow the instructions of on-site staff to exit the venue safety.</td>
                  </tr>
                </tbody>
              </table>
              <Heading level={2} content="Precautions" className="text-2xl pt-8 pb-4" />
              <ol className="list-decimal ml-4 text-sm">
                <li>Young children should not play alone, especially when climbing and landing, as they may require adult supervision.</li>
                <li>Parents/Guardians with children who are suffering from any injuries, skin diseases, illness, fever, heart condition, neck or spinal problems MUST refrain from letting their children play on the event and shall be solely responsible for the safety and well-being of their children if they fail to heed to this warning. Organizer reserves the right to refuse the entry of any children to play in/on the event on the grounds of safety for the child concerned and/or for the safety of other participating children if the organizer becomes aware of any of the aforesaid conditions affecting any of the participating children.</li>
                <li>Before using the slide, make sure to remove items from your pockets that may easily be dropped.</li>
                <li>Do not slide down the edge of the slide or attempt to climb up the slide in the wrong direction.</li>
                <li>Do not swing, run, or make dangerous movements such as jumping on the slide.</li>
                <li>All participants are requested to follow the instructions of the on-site staff. If there are repeated failures to comply, the staff reserves the right to refuse entry or expel participants from the inflatable playground.</li>
                <li>You acknowledge and accept that the organizer is at liberty to make any changes or adjustments to the rules and format of this event from time to time without giving prior notice. In the event of any disputes arising out of this event. The organizer shall have the full and final say on all matters concerning this Event. In case of any discrepancy between the English and Chinese versions of these terms and conditions, the Chinese version shall prevail.</li>
              </ol>
            </section>
          </div>
        </main>
      );
  }
}
