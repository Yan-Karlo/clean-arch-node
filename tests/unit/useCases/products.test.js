const { product } = require('../../../src/useCases');
const Chance = require('chance');
const chance = new Chance();
const  {
  addProductUseCase,
  deleteProductUseCase,
  getProductByIdUseCase,
  updateProductUseCase
} = product;

const {
  Product,
} = require('../../../src/entities');

let addedProduct = {}
const { v4: uuidv4 } = require('uuid');

// create a Products data
const testProduct = new Product({
  name : 'IPhone 13',
  description : 'Newest Apple mobile communication device',
  image : 'www.google.com/apple',
  price : 1200,
  color : 'Silver',
  meta: {
    model : 'Plus'
  }
})


describe('Products use cases', () => {
  const mockProductsRepository = {
    add: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
  const dependencies = { productsRepository: mockProductsRepository }

  describe('Add Products use case', () => {
    test('Products should be added', async () => {
      // add a Products using the use case
      mockProductsRepository.add.mockReturnValue({ ...testProduct, id: uuidv4() });
      addedProduct = await addProductUseCase(dependencies).execute(testProduct);

      // check the received data
      expect(addedProduct).toBeDefined();
      expect(addedProduct.id).toBeDefined();
      expect(addedProduct.name).toBe(testProduct.name);
      expect(addedProduct.lastName).toBe(testProduct.lastName);
      expect(addedProduct.gender).toBe(testProduct.gender);
      expect(addedProduct.meta).toEqual(testProduct.meta);

      // check that dependencies called as expected
      const call = mockProductsRepository.add.mock.calls[0][0];


    });
    test('Products should be got by id', async () => {
      // locates a Products using the use case
      mockProductsRepository.getById.mockReturnValue({ ...testProduct, id : uuidv4()});
      const locatedProduct = await getProductByIdUseCase(dependencies).execute(addedProduct.id);

      // check the received data
      expect(locatedProduct).toBeDefined()
      expect(locatedProduct.id).toBeDefined()
      expect(locatedProduct.name).toBe(testProduct.name)
      expect(locatedProduct.lastName).toBe(testProduct.lastName)
      expect(locatedProduct.gender).toBe(testProduct.gender)
      expect(locatedProduct.meta).toEqual(testProduct.meta)
    });
  });
  test('Products should be updated', async () => {
    addedProduct.meta = {
      model: 'Plus+Plus'
    }
    mockProductsRepository.delete.mockReturnValue(addedProduct)
    mockProductsRepository.update.mockReturnValue(addedProduct);
    // updates a Products using the use case
    const updatedProducts = await updateProductUseCase(dependencies).execute(addedProduct);

    // check the received data
    expect(updatedProducts).toBeDefined()
    expect(updatedProducts).toEqual(addedProduct)
  });

  test('Products should be deleted', async () => {
    tempProduct = {...testProduct, id: uuidv4()}
    mockProductsRepository.delete.mockReturnValue(tempProduct)
    // deletes a Products using the use case
    const deletedProduct = await deleteProductUseCase(dependencies).execute(tempProduct);

    // check the received data
    expect(deletedProduct).toBeDefined()
    expect(deletedProduct).toEqual(tempProduct)
  });

});