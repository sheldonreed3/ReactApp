import {ucWords} from "../utils/formUtils";

export const getCategoryOptions = (cats) => {
  let update = [];

  update = update.concat(Object.keys(cats).map((cat) => {
    return {
      value: cat,
      label: ucWords(cat)
    }
  }));

  return update;
};

export const getInterestOptions = (interests, programs, category) => {
  let update = [];
  update = update.concat(Object.keys(interests).sort().map(function (index, label) {
    if (category && typeof programs[category][index] === 'undefined') { return false; }
    return {
      value: index,
      label: label
    }
  }));
  update = update.filter(function(element) {
    return element;
  });
  return update;
};

export const getProgramOptions = (degreeList, category = null, interest = null) => {
  let list = buildProgramList(degreeList.Programs, category, interest);

  if (typeof list.category === 'undefined' && typeof list.certificates === 'undefined') {
    return [{'_none': 'No Program Found', value: '_none', label: 'No Program Found'}];
  }
  let listArray = [];

  list = Object.keys(list).sort(
    function (a, b) {
      return b - a;
    }
  ).map(function (key, index) {
    let arr = Object.keys(list[key]).sort().map(function (course, i) {
      let id = list[key][course].toLowerCase();
      return {
        value: id,
        label: course
      };
    });
    return listArray = listArray.concat(arr);
  });

  return listArray;
};

/**
 * Build out the programs list dependent on optional selectors
 *
 * @param {*} list
 * @param {*} category
 * @param {*} interest
 *
 * @returns Object { index { name: code } } updated programs list
 */
export const buildProgramList = (list, category, interest) => {
  let update = {};
  let catList = null;

  // Grab the initial category results
  if (category) {
    catList = Object.assign({}, update, list[category]);
  }
  // We have an interest and no category, so let's grab and return all
  // relevant programs.
  else if (interest) {

    for (let cat in list) {
      update = Object.assign({}, update, list[cat][interest]);
    }
    // Return programs object
    return {category: update};
  }

  if (category && interest) {
    // By category and interest so just return the object we already have.
    return {category: catList[interest]};
  }

  // This was just a category, so let's grab all the program info out of the
  // interest objects
  if (catList) {
    for (let int in catList) {
      update = Object.assign({}, update, catList[int]);
    }

    return {category: update};
  }

  /**
   * No selectors for this list so lets get all the program information grouped
   * by category and sorted by name.
   */
  for (let c in list) {
    let cList = {};
    for (let i in list[c]) {
      cList = Object.assign({}, cList, list[c][i]);
    }

    update[c] = cList;
  }

  return update;
};