const validateInput = (req, res, next) => {
  const inputValue = req.query.input;
  const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
  const indexOfFirstLetter = inputValue.search(/[A-Za-z]/);
  let number;
  let unit;

  if (indexOfFirstLetter >= 0) {
    [number, unit] = [inputValue.slice(0, indexOfFirstLetter), inputValue.slice(indexOfFirstLetter)];
  } else {
    number = inputValue;
  }

  // Number validation
  if ((!number || number === '-') && unit) {
    req.number = 1;
  } else if (/[/]/.test(number)) {
    const parts = number.split('/');
    if (!isNaN(parts[0]) && !isNaN(parts[1]) && parts.length <= 2) {
      const [numerator, denominator] = [+parts[0], +parts[1]];
      const result = numerator / denominator;
      if (!isNaN(result) && result !== Infinity && result !== -Infinity) {
        req.number = Math.abs(result);
      }
    }
  } else if (!isNaN(number)) {
    req.number = Math.abs(number);
  }

  // Unit validation
  if (unit && validUnits.includes(unit.toLowerCase())) {
    req.unit = unit;
  };

  // Handle responses
  if (!req.number && req.number !== 0 && req.unit) {
    res.status(400).json({ error: 'Invalid number' });
  } else if (req.number && !req.unit) {
    res.status(400).json({ error: 'Invalid unit' });
  } else if (!req.number && !req.unit) {
    res.status(400).json({ error: 'Invalid number and unit' });
  } else {
    next();
  }
}

module.exports = validateInput;