import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function applyNow(buttonElement) {
  const redirectPath = buttonElement.target.getAttribute('href');
  if (redirectPath) {
    window.open(redirectPath, '_self');
  }
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
    });
    ul.append(li);
  });

  ul.querySelectorAll('li').forEach((li) => {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'button-wrapper';
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply now';
    applyButton.className = 'btn-primary btn-bento-blue applyNow';
    applyButton.setAttribute('href', '/content/edsnewdemo/index/card-landing.html');
    buttonWrapper.appendChild(applyButton);
    const learnMoreButton = document.createElement('button');
    learnMoreButton.textContent = 'Learn more';
    learnMoreButton.className = 'btn-primary btn-bento-white learMore';
    buttonWrapper.appendChild(learnMoreButton);
    li.append(buttonWrapper);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
  document.querySelectorAll('.applyNow').forEach((button) => {
    button.addEventListener('click', applyNow);
  });
}
