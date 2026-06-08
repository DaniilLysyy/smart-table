import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
  Object.keys(indexes)
    .forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName])
          .map(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            return option;
          })
      );
    });

  return (data, state, action) => {
    if (action?.name === 'clear') {
      const button = elements.clear;
      const parent = button.closest('.filter__field');
      const input = parent.querySelector('input');
      const field = button.getAttribute('data-field');
      
      if (input && field) {
        input.value = '';
        state[field] = '';
      }
    }

    const compare = createComparison(defaultRules);

    return data.filter(row => compare(row, state));
  };
}