import React from 'react';
import CardItem2 from '../cards/CardItem2';


import skin from '../../images/Doctor1.jpeg';
import water from '../../images/Doctor1.jpeg';

function Leftbar(probs) {
  return (
    <div class='left-bar'>
      <div class="tile is-parent left-bar is-vertical">
        <div class="tile is-child ">
          <CardItem2
            image = {skin}
            alt='My Skin'
            title = 'A Guide to Taking Care of Your Skin'
            text = 'You may suspect you have dry, oily, or sensitive skin, but do you really know your skin type? ...'
            src = 'https://www.healthline.com/health/beauty-skin-care/skin-types-care'
          />
        </div>
      </div>
    </div>
  );
}

export default  Leftbar;