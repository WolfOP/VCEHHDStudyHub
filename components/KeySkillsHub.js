// components/KeySkillsHubFull.js
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KeySkill1 from '../keyskillscomponets/KeySkill1.js';
import KeySkill2 from '../keyskillscomponets/KeySkill2.js';
import KeySkill3 from '../keyskillscomponets/KeySkill3.js';
import KeySkill4 from '../keyskillscomponets/KeySkill4.js';
import KeySkill5 from '../keyskillscomponets/KeySkill5.js';
import KeySkill6 from '../keyskillscomponets/KeySkill6.js';
import KeySkill7 from '../keyskillscomponets/KeySkill7.js';
import KeySkill8 from '../keyskillscomponets/KeySkill8.js';
import KeySkill9 from '../keyskillscomponets/KeySkill9.js';
import KeySkill10 from '../keyskillscomponets/KeySkill10.js';

export default function KeySkillsHubFull() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-purple-400">Unit 3 SAC 2 – Key Skills Hub</h1>
        <KeySkill1 />
        <KeySkill2 />
        <KeySkill3 />
        <KeySkill4 />
        <KeySkill5 />
        <KeySkill6 />
        <KeySkill7 />
        <KeySkill8 />
        <KeySkill9 />
        <KeySkill10 />
      </div>
    </DndProvider>
  );
}
