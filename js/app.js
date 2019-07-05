'use strict';

const allAnimals = [];
//event handler


const Animal = function (title, image_url, description, keyword, horns) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  allAnimals.push(this);
};

Animal.getAnimalsFromFile = function () {
  const filePath = './data/page-1.json';
  const fileType = 'json';
  $.get(filePath, fileType).then(initialize);
}

const initialize = (myAnimals) => {
  myAnimals.forEach((el) => {
    new Animal(el.title, el.image_url, el.description, el.keyword, el.horns);
  })
  renderUniqueKeywords(allAnimals);
  animalRender(allAnimals);
  $('select').on('change', function () {
    let selected = $(this).val();
    if (selected === 'All') {
      $('#photo-template').siblings().remove();
      animalRender(allAnimals);
    } else {
      $('main > section').hide();
      $(`main > section > img[alt=${selected}`).parent().show();
    }
  });

};
const animalRender = (arrayOfImages) => {

  arrayOfImages.forEach((el) => {
    const $newImage = $('<section></section>');

    const imageContent = $('#photo-template').html();
    $newImage.html(imageContent);
    $newImage.find('h2').text(el.title);
    $newImage.find('img').attr({ src: el.image_url, alt: el.keyword });
    $newImage.find('p').text(el.description);

    $('main').append($newImage);

  });
  $('#photo-template').hide();
}

const renderKeywordScroll = (arrayOfImages) => {
  const $keyworddropdown = $('select');
  $keyworddropdown.append($('<option />').val('All').text('All'));
  arrayOfImages.forEach((el) => {
    $keyworddropdown.append($('<option />').val(el).text(el));

  });
  //$('header').append($keyworddropdown);

}

const renderUniqueKeywords = (arrayOfImages) => {
  const keyWords = [];

  arrayOfImages.forEach((el) => {

    if (!keyWords.includes(el.keyword)) {
      keyWords.push(el.keyword);
    }
  });
  renderKeywordScroll(keyWords);
}

$(document).ready(function () {
  Animal.getAnimalsFromFile();
})

