const types = {
   ONLINE: 1,
   GIFT: 2,
   CASH: 3,
   WALLET: 4
};
const typesInNames = {
   online: types.ONLINE,
   gift: types.GIFT,
   cash: types.CASH,
   wallet: types.WALLET
};
exports.getTypeByName = name => {
   return typesInNames[name];
};
exports.types = types;
