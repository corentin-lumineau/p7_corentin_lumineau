import Tag from "../templates/Tag.js";
/*
import {
  createBlocSelectedElement,
  cleanRecipesContainer,
} from "../utils/display.js";
import { blocElementSearch } from "./search.js";
import { display } from "../pages/homepage.js";

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
