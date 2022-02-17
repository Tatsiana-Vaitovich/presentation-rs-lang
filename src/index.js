import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import 'reveal.js/dist/reveal';
import RevealNotes from 'reveal.js/plugin/notes/notes.js';
// import RevealSearch from 'reveal.js/plugin/search/search.js'
// import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/solarized.css';
import 'reveal.js/plugin/highlight/monokai.css';


let deck = new Reveal({
  hash: true,
  touch: true,
  slideNumber: true,
  plugins: [ Markdown, RevealNotes ],
  controls: true,
  progress: true,
  center: true,
  // Learn about plugins: https://revealjs.com/plugins/
  // plugins: [ Markdown, RevealZoom, RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight ]
});

deck.initialize();