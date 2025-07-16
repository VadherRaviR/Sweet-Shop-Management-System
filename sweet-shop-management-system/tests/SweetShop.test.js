const SweetShop = require('../src/SweetShop');

describe('Sweet Shop Management System', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

  // 1. Initialization
  describe('Initialization', () => {
    it('starts with an empty inventory', () => {
      expect(shop.viewSweets()).toEqual([]);
    });
  });

});