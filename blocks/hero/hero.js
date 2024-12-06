import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [heroWrapper] = block.children;
  const blockquote = document.createElement('hero-banner');
  blockquote.textContent = heroWrapper.textContent.trim();
  heroWrapper.replaceChildren(blockquote);
}
