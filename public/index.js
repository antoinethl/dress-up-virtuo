/* global VIRTUO*/
'use strict';

(() => {
  const render = (actors) => {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    const template = actors.map(actor => {

      // I change the color of the text (red if have to pay and green if receive)
      var color = "red"
      var text = "will pay"

      if (actor.type == "credit") {
        text = "will receive"
        color = "green"
      }
      return `
        <div class="actor">
          <span style="font-weight: bold; color:${color}">${actor.who}</span>
          <span style="font-weight: bold; color:${color}">${text}</span>
          <span style="font-weight: bold; color:${color}">${actor.amount} euros</span>
        </div>
      `;
    }).join('');

    div.innerHTML = template;
    fragment.appendChild(div);
    document.querySelector('#actors').innerHTML = '';
    document.querySelector('#actors').appendChild(fragment);
  };

  const button = document.querySelector('#compute');

  button.addEventListener('click', function onClick () {
    const car = VIRTUO.getCar();
    const begin = document.querySelector('#rental .js-begin').value;
    const end = document.querySelector('#rental .js-end').value;
    const distance = document.querySelector('#rental .js-distance').value;
    const option = document.querySelector('#rental .js-option').checked;

    // I check if all the fields are filled

    if(car =="" || begin == "" || end == "" || distance == "") {
      alert("Fill all fields please !")
    }

    // Then I check if the date is correct

    else if (end < begin){
      alert("Wrong date !")
    }

    // And now I can compute and print the result
    else {
      const actors = VIRTUO.payActors(car, begin, end, distance, option);
      render(actors);
    }

    return;
  });
})();


