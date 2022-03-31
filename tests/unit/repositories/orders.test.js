const Chance = require('chance');
const chance = new Chance();
const { ordersRepository } = require('../../../src/frameworks/repositories/inMemory')
const { v4: uuidv4 } = require('uuid');
const {
  Order,
} = require('../../../src/entities');

const testOrder1 = new Order({
  userId : uuidv4(),
  productIds : [uuidv4(),uuidv4(),uuidv4()],
  date : new Date(),
  isPayed : true,
  meta : { creditCardNumber : '9712-0099-1234-5678'}
})
const testOrder2 = new Order({
  userId : uuidv4(),
  productIds : [uuidv4(),uuidv4()],
  date : new Date(),
  isPayed : false,
  meta : { creditCardNumber : ''}
})



//#region orders Repository
describe('orders Repository', () => {
  test('New order should be added and returned', async () => {

    const addedorder = await ordersRepository.add(testOrder1)

    expect(addedorder).toBeDefined();
    expect(addedorder.id).toBeDefined();
    expect(addedorder.name).toBe(testOrder1.name);
    expect(addedorder.description).toBe(testOrder1.description);
    expect(addedorder.price).toBe(testOrder1.price);
    expect(addedorder.color).toBe(testOrder1.color);

    const returnedorder = await ordersRepository.getById(addedorder.id);
    expect(returnedorder).toEqual(addedorder);
  })
  test('New order should be deleted and returned', async () => {
    // add 2 orders
    const addedorder1 = await ordersRepository.add(testOrder1);
    const addedorder2 = await ordersRepository.add(testOrder2);

    // delete 1 order
    const deletedorder = await ordersRepository.delete(addedorder1);
    // try to get the deleted order
    const getDeletedorder = await ordersRepository.getById(deletedorder.id);
    // check the 2nd order defined (not deleted)
    const checkedorder = await ordersRepository.getById(addedorder2.id);

    // console.log('getting the deleted order ................')
    // console.log(getDeletedorder)
    // console.log(typeof getDeletedorder);

    expect(addedorder1).toStrictEqual(testOrder1);
    expect(addedorder2).toStrictEqual(testOrder2);
    expect(deletedorder).toStrictEqual(addedorder1);
    expect(typeof getDeletedorder).toBe('undefined');
    expect(checkedorder.id).toBe(addedorder2.id);
    expect(checkedorder.name).toBe(addedorder2.name);
    expect(checkedorder.description).toBe(addedorder2.description);

   })

  test('New order should be updated and returned', async () => {
    // add a order
    var addedorder = await ordersRepository.add(testOrder1);

    // data alteration
    addedorder.name = 'Mobile';
    addedorder.description = 'Iphone 13';

    // upodate a order
    const updatedorder = await ordersRepository.update(addedorder);

    expect(updatedorder.name).toBe('Mobile');
    expect(updatedorder.description).toBe('Iphone 13');
   })

});
//#endregion