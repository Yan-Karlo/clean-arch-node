const Chance = require('chance');
const chance = new Chance();
const { productsRepository } = require('../../../src/frameworks/repositories/inMemory')

const {
  Product,
} = require('../../../src/entities');

const testProduct1 = new Product({
    name : 'Radio',
    description : 'AM/FM Radio + MP3 player',
    image : [],
    price : 100,
    color : 'Silver',
    meta : {power : 0.5}
})
const testProduct2 = new Product({
  name : 'LED TV',
  description : 'Samsung QLED',
  image : [],
  price : 750,
  color : 'Piano black',
  meta : {power : 1.65}
})



//#region Products Repository
describe('Products Repository', () => {
  test('New Product should be added and returned', async () => {

    const addedProduct = await productsRepository.add(testProduct1)

    expect(addedProduct).toBeDefined();
    expect(addedProduct.id).toBeDefined();
    expect(addedProduct.name).toBe(testProduct1.name);
    expect(addedProduct.description).toBe(testProduct1.description);
    expect(addedProduct.price).toBe(testProduct1.price);
    expect(addedProduct.color).toBe(testProduct1.color);

    const returnedProduct = await productsRepository.getById(addedProduct.id);
    expect(returnedProduct).toEqual(addedProduct);
  })
  test('New Product should be deleted and returned', async () => {
    // add 2 Products
    const addedProduct1 = await productsRepository.add(testProduct1);
    const addedProduct2 = await productsRepository.add(testProduct2);

    // delete 1 Product
    const deletedProduct = await productsRepository.delete(addedProduct1);
    // try to get the deleted Product
    const getDeletedProduct = await productsRepository.getById(deletedProduct.id);
    // check the 2nd Product defined (not deleted)
    const checkedProduct = await productsRepository.getById(addedProduct2.id);

    // console.log('getting the deleted Product ................')
    // console.log(getDeletedProduct)
    // console.log(typeof getDeletedProduct);

    expect(addedProduct1).toStrictEqual(testProduct1);
    expect(addedProduct2).toStrictEqual(testProduct2);
    expect(deletedProduct).toStrictEqual(addedProduct1);
    expect(typeof getDeletedProduct).toBe('undefined');
    expect(checkedProduct.id).toBe(addedProduct2.id);
    expect(checkedProduct.name).toBe(addedProduct2.name);
    expect(checkedProduct.description).toBe(addedProduct2.description);

   })

  test('New Product should be updated and returned', async () => {
    // add a Product
    var addedProduct = await productsRepository.add(testProduct1);

    // data alteration
    addedProduct.name = 'Mobile';
    addedProduct.description = 'Iphone 13';

    // upodate a Product
    const updatedProduct = await productsRepository.update(addedProduct);

    expect(updatedProduct.name).toBe('Mobile');
    expect(updatedProduct.description).toBe('Iphone 13');
   })

});
//#endregion