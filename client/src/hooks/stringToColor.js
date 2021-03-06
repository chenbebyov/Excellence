const stringToColor = (userName) => {
  return getHashCode(userName)
}

const getHashCode = (value) => {
  var hash = 0;
  if (value.length == 0) return hash;
  for (var i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
  }
  return intToHSL(hash);
};
const intToHSL = (value) => {
  var shortened = value % 360;
  return "hsl(" + shortened + ",100%,30%)";
};

export default stringToColor;