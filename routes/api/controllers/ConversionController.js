exports.handle_conversion = (req, res, next) => {
  let initNumber = +req.number;
  let initUnit = req.unit;
  let initStringifiedUnit;
  let returnNumber;
  let returnUnit
  let returnStringifiedUnit;
  let string;

  switch (initUnit) {
    case 'gal':
      returnNumber = initNumber * 3.78541;
      returnUnit = 'l';
      initNumber === 1 ? initStringifiedUnit = 'gallon' : initStringifiedUnit = 'gallons';
      returnStringifiedUnit = 'liter(s)';
      break;
    case 'lbs':
      returnNumber = initNumber * 0.453592;
      returnUnit = 'kg';
      initNumber === 1 ? initStringifiedUnit = 'pound' : initStringifiedUnit = 'pounds';
      returnStringifiedUnit = 'kilogram(s)';
      break;
    case 'mi':
      returnNumber = initNumber * 1.60934;
      returnUnit = 'km';
      initNumber === 1 ? initStringifiedUnit = 'mile' : initStringifiedUnit = 'miles';
      returnStringifiedUnit = 'kilometer(s)';
      break
    case 'l':
      returnNumber = initNumber / 3.78541;
      returnUnit = 'gal';
      initNumber === 1 ? initStringifiedUnit = 'liter' : initStringifiedUnit = 'liters';
      returnStringifiedUnit = 'gallon(s)';
      break
    case 'kg':
      returnNumber = initNumber / 0.453592;
      returnUnit = 'lbs';
      initNumber === 1 ? initStringifiedUnit = 'kilogram' : initStringifiedUnit = 'kilograms';
      returnStringifiedUnit = 'pound(s)';
      break
    case 'km':
      returnNumber = initNumber / 1.60934;
      returnUnit = 'mi';
      initNumber === 1 ? initStringifiedUnit = 'kilometer' : initStringifiedUnit = 'kilometers';
      returnStringifiedUnit = 'mile(s)';
      break;
  }
  returnNumber = parseFloat(returnNumber.toFixed(5));
  string = `${initNumber} ${initStringifiedUnit} ${initNumber === 1 ? 'is' : 'are'} equivalent to ${returnNumber} ${returnStringifiedUnit}`;
  res.json({ initNumber, initUnit, returnNumber, returnUnit, string });
}