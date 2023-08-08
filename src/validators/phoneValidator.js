const phoneValidator = value => /^[0-9().\-\s]+( x\d+)?$/.test(value);
export default phoneValidator