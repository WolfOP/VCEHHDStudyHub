import KeySkill1 from "./keyskillscomponents/KeySkill1.js";
import KeySkill2 from "./keyskillscomponents/KeySkill2.js";
import KeySkill3 from "./keyskillscomponents/KeySkill3.js";
import KeySkill4 from "./keyskillscomponents/KeySkill4.js";
import KeySkill5 from "./keyskillscomponents/KeySkill5.js";
import KeySkill6 from "./keyskillscomponents/KeySkill6.js";
import KeySkill7 from "./keyskillscomponents/KeySkill7.js";
import KeySkill8 from "./keyskillscomponents/KeySkill8.js";
import KeySkill9 from "./keyskillscomponents/KeySkill9.js";
import KeySkill10 from "./keyskillscomponents/KeySkill10.js";

export default function KeySkillsHub() {
  return `
    <section class="p-8 text-white">
      <h1 class="text-3xl font-bold mb-6 text-purple-400">Unit 3 SAC 2 – Key Skills Hub</h1>
      <p class="text-slate-300 mb-4">Interactive Key Skills activities:</p>

      ${KeySkill1()}
      ${KeySkill2()}
      ${KeySkill3()}
      ${KeySkill4()}
      ${KeySkill5()}
      ${KeySkill6()}
      ${KeySkill7()}
      ${KeySkill8()}
      ${KeySkill9()}
      ${KeySkill10()}
    </section>
  `;
}
