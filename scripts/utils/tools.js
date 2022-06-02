import Tag from "../templates/Tag.js";

/**
 * This will accept a string to capitalize
 * @param {string} string string to capitalize
 * @returns {string} The string wich has been capitalize
 */
export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

export function checkTagAndDisabled(elements) {
  if (Tag.allInstances) {
    elements.forEach((element) => {
      Tag.allInstances.forEach((tag) => {
        if (element.innerHTML == tag.element) {
          element.classList.add("element--disabled");
        }
      });
    });
  }
}

export function normalize(input) {
  input = input.toUpperCase();
  return input;
}
