var {expect} = require('chai');
var {Shop, AgedBrie} = require('../src/gilded_rose.js');
describe("Aged Brie", function() {

  it("should go up in quality over time", function() {
    const gildedRose = new Shop([ new AgedBrie({sellIn: 3, quality: 0}) ]);

    // Day 1
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(2)
    expect(items[0].quality).to.equal(1)

    // Day 2
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1)
    expect(items[0].quality).to.equal(2)
  });

  it("Quality should degrades twice as fast after the sell day", function() {
    const gildedRose = new Shop([ new AgedBrie({sellIn: 1, quality: 30}) ]);

    // Day 1
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(0)
    expect(items[0].quality).to.equal(31)

    // Day 2
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1)
    expect(items[0].quality).to.equal(33)
  });


  it("should not go above 50", function() {
    const gildedRose = new Shop([ new AgedBrie({sellIn: 3, quality: 49}) ]);

    // Day 1
    let items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(2)
    expect(items[0].quality).to.equal(50)

    // Day 2
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1)
    expect(items[0].quality).to.equal(50)
  });
});
