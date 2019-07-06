'use strict';

let allAnimals = [];
let keyWords = [];
let tempAllAnimals = [];

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
  $.get(filePath, fileType).then (initialize);
};

const initialize = (myAnimals) => {

  myAnimals.forEach((el) => {
    new Animal(el.title, el.image_url, el.description, el.keyword, el.horns);
  });
  renderUniqueKeywords(allAnimals);
  animalRender($('#sort-dropdown').val());
  // debugger
  $('#keyword-dropdown').on('change', function () {
    let selected = $(this).val();
    if (selected === 'All') {
      $('#photo-template').siblings().remove();
      animalRender(allAnimals);
    } else {
      $('main > section').hide();
      $(`main > section > img[alt=${selected}`).parent().show();
    }
  });

  $('#sort-dropdown').on('change', function () {
    $('#photo-template').siblings().remove();
    let selected = $(this).val();
    // debugger
    console.log('selected value: ', selected);
    animalRender(selected);
  });

};
const animalRender = (selected) => {
  tempAllAnimals = [];
  fillTempAllAnimals(selected);
  const source = $('#animal-template').html();
  const template = Handlebars.compile(source);
  tempAllAnimals.forEach((el) => {
    const newHtml = template(el);
    $('main').append(newHtml);
  });
  $('#photo-template').hide();
};

const renderKeywordScroll = (arrayOfImages) => {
  const $keyworddropdown = $('#keyword-dropdown');
  $keyworddropdown.append($('<option />').val('All').text('All'));
  arrayOfImages.forEach((el) => {
    $keyworddropdown.append($('<option />').val(el).text(el));

  });
}

const renderUniqueKeywords = (arrayOfImages) => {
  // keyWords = [];
  arrayOfImages.forEach((el) => {

    if (!keyWords.includes(el.keyword)) {
      keyWords.push(el.keyword);
    }
  });
  renderKeywordScroll(keyWords);
}

$(document).ready(function () {
  Animal.getAnimalsFromFile();
  $('#page2').on('click', changeToPage);
})

const changeToPage = () => {
  console.log('we made it!')
  const filePath2 = './data/page-2.json';
  const filePath1= './data/page-1.json';
  const fileType = 'json';
  const buttonValue = $('button').val();
  $('#photo-template').siblings().remove();
  $('#keyword-dropdown').children().remove();
  allAnimals = [];
  keyWords = [];
  if (buttonValue === 'page2') {
    $('#page2').val('page1').text('Page One');
    $.get(filePath2, fileType).then(initialize);
  } else if (buttonValue === 'page1') {
    $('#page2').val('page2').text('Page Two');
    $.get(filePath1, fileType).then(initialize);
  }
};

const fillTempAllAnimals = (sortSelection) => {
  // debugger
  let aSelected = '';
  let bSelected = '';
  allAnimals.forEach(el => tempAllAnimals.push(el));
  tempAllAnimals.sort((a, b) => {
    if (sortSelection === 'title') {
      aSelected = a.title.toUpperCase();
      bSelected = b.title.toUpperCase();
    } else if (sortSelection === 'horns') {
      aSelected = a.horns;
      bSelected = b.horns;
    }

    if (aSelected < bSelected) {
      return -1;
    } else if (aSelected > bSelected) {
      return 1;
    } else return 0;
  });
  return tempAllAnimals;
};

