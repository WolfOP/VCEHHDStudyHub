// components/KeySkillsHubFull.js
// Previously this module exported a React component written in JSX. Since
// the project does not include a build step to transform JSX, importing that
// component caused a syntax error in the browser. To avoid runtime errors we
// now export a simple function that returns HTML as a string.  Interactive
// versions of the Key Skills activities can be reinstated once a build
// process is added.

export default function KeySkillsHub() {
  return `
    <section class="p-8 text-white">
      <h1 class="text-3xl font-bold mb-6 text-purple-400">Unit 3 SAC 2 – Key Skills Hub</h1>
      <p class="text-slate-300">Interactive Key Skills activities will be available soon.</p>
    </section>
  `;
}
