// pages/key-skills-hub.js
import React from 'react';
import Head from 'next/head';

export default function KeySkillsHub() {
  const keySkills = [
    {
      title: '📈 Analyse Data',
      desc: 'Interpret graphs and data to explain improvements in health over time.',
    },
    {
      title: '🧱 Old Public Health & Ottawa Charter',
      desc: 'Match initiatives to Ottawa Charter action areas and explain outcomes.',
    },
    {
      title: '⚖️ Biomedical vs Social Model',
      desc: 'Compare strengths and limitations of the two models of health.',
    },
    {
      title: '🧠 Evaluate Indigenous Health Programs',
      desc: 'Analyse effectiveness and justice outcomes of programs like Learn Earn Legend.',
    },
    {
      title: '🍽️ Healthy Eating Campaigns',
      desc: 'Evaluate the impact of dietary guidelines, AGHE, and non-gov campaigns.',
    },
    {
      title: '📉 Why Change is Hard',
      desc: 'Draw conclusions about sociocultural, environmental, and commercial barriers.',
    },
    {
      title: '🏥 Medicare, PBS, NDIS',
      desc: 'Analyse how Australia’s healthcare system promotes health across populations.',
    },
  ];

  return (
    <>
      <Head>
        <title>Key Skills Hub – Unit 3 SAC 2</title>
      </Head>
      <main className="bg-gray-900 text-white min-h-screen p-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-400 mb-6">🧠 Key Skills Hub – Unit 3 SAC 2</h1>
          <p className="mb-6 text-gray-300">
            Practise the 9 key skills assessed in your upcoming SAC with focused tools and activities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keySkills.map((skill, i) => (
              <div
                key={i}
                className="p-5 bg-gray-800 hover:bg-purple-700 rounded-xl transition duration-200"
              >
                <h2 className="text-xl font-semibold text-purple-300">{skill.title}</h2>
                <p className="text-sm text-gray-300 mt-2">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

