// components/KeySkillsHubFull.js
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KeySkill1 from './KeySkill1';
import KeySkill2 from './KeySkill2';
import KeySkill3 from './KeySkill3';
import KeySkill4 from './KeySkill4';
import KeySkill5 from './KeySkill5';
import KeySkill6 from './KeySkill6';
import KeySkill7 from './KeySkill7';
import KeySkill8 from './KeySkill8';
import KeySkill9 from './KeySkill9';
import KeySkill10 from './KeySkill10';

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
