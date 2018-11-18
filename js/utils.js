export const makeDomNodeFromText = (text) => {
  const node = document.createElement(`div`);
  node.innerHTML = text;
  return node;
};

export const isInRange = (value, min, max) => {
  return value >= min && value < max;
};
