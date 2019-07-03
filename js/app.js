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
  $.get(filePath, fileType).then(myAnimals => {

    myAnimals.forEach((el) => {
      new Animal(el.title, el.image_url, el.description, el.keyword, el.horns);
    })
    renderUniqueKeywords(allAnimals);
    animalRender(allAnimals);

  });
}

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

}

const renderKeywordScroll = (arrayOfImages) => {
  const $keyworddropdown = $('<select></select>');
  //const keyworddropdown = $('#keyword-dropdown').html();
  //let $keyworddropdown;
  //$keyworddropdown.html(keyworddropdown);
  //console.log($keyworddropdown);
  arrayOfImages.forEach((el) => {
    $keyworddropdown.append($('<option />').val(el).text(el));

  });
  $('header').append($keyworddropdown);

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
  console.log($('select'));
  $('select').on('change', function () {
    console.log('in selection');
    // let $selected = $(this).val();
    // $('main > section').hide();
    // $(`main > section > img[alt=${$selected}`).show();
  });
})

