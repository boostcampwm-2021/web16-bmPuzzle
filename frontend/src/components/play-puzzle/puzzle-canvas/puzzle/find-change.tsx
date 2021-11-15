const findXUp = (_nowShape: any, _preShape: any) => {
  const nL = _nowShape.leftTab;
  const nR = _nowShape.rightTab;
  const pL = _preShape.leftTab;
  const pR = _preShape.rightTab;

  let xUp = 0;

  if (nL === pL && nR === pR) xUp = 0;
  else if (nL === nR && pL === pR) xUp = 0;
  else {
    if (nR === 0 || (nR === 1 && pR === 1)) xUp = 5 * nL * -1;
    else if (nR === 1 && pR === -1) xUp = nL === pL ? 5 : 10;
    else if (nR === -1 && pR === 1) xUp = nL === pL ? -5 : -10;
    else xUp = 5 * nL * -1;
  }
  return xUp;
};

const findYUp = (_nowShape: any, _preShape: any) => {
  const sum =
    _nowShape.topTab +
    _nowShape.bottomTab +
    _preShape.topTab +
    _preShape.bottomTab;

  let yUp = 0;

  if (sum === 1 || sum === -2) yUp = -5;
  else if (sum === 2) yUp = 5;
  else if (sum === -1) yUp = -10;

  return yUp;
};

const findYChange = (_nowShape: any, _preShape: any) => {
  const nT = _nowShape.topTab;
  const nB = _nowShape.bottomTab;
  const pT = _preShape.topTab;
  const pB = _preShape.bottomTab;

  const sum = nT + nB + pT + pB;
  let yChange = 0;

  if (nT === pT && nB === pB) yChange = 0;
  else if (nT === nB && pT === pB) yChange = 0;
  else {
    if (nT === 0) yChange = 5 * nB;
    else if (nB === 0) yChange = 5 * pT;
    else if (pT === nB) yChange = 5 * pT;
    else yChange = sum * -5;
  }
  return yChange;
};

const findXChange = (_nowShape: any, _preShape: any) => {
  const sum =
    _nowShape.leftTab +
    _nowShape.rightTab +
    _preShape.leftTab +
    _preShape.rightTab;

  let xChange = -5;

  if (sum === -1) xChange = -10;
  else if (sum === -2) xChange = -7;
  else if (sum === 0) xChange = 0;
  else if (sum === 2) xChange = 5;

  return xChange;
};

const FindChange = { findXUp, findYUp, findXChange, findYChange };
export default FindChange;
