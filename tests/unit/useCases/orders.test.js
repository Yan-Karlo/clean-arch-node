const Chance = require('chance');
const chance = new Chance();
const {
  order : {
    addOrderUseCase,
    deleteOrderUseCase,
    getOrderByIdUseCase,
    updateOrderUseCase
  },
  user: {
    getUserByIdUseCase,
    addUserUseCase
  },
  product: {
    getProductByIdUseCase,
    addProductUseCase
  }
} = require('../../../src/useCases');;

const { usersRepository, productsRepository } = require('../../../src/frameworks/repositories/inMemory');

const {
  Order,
} = require('../../../src/entities');

let addedOrder = {}
const { v4: uuidv4 } = require('uuid');
const dependencies = require('../../../src/config/dependencies');

// create a Orders data
const testOrder = new Order({
  userId : uuidv4(),
  productIds : [uuidv4(), uuidv4(), uuidv4()],
  date : new Date(),
  isPayed : false,
  meta: {
    status : 'Stage'
  }
})


describe('Orders use cases', () => {
  const mockOrdersRepository = {
    add: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  const dependencies = {
    ordersRepository: mockOrdersRepository,
    usersRepository,
    productsRepository,
    useCases: {
      user: {
        getUserByIdUseCase : jest.fn(dependencies => getUserByIdUseCase(dependencies))
      },
      product: {
        getProductByIdUseCase : jest.fn(dependencies => getProductByIdUseCase(dependencies))
      }
    }
  }

  const mocks = {};

  beforeAll(async () => {
    const addProduct = addProductUseCase(dependencies).execute;
    const addUser = addUserUseCase(dependencies).execute;

    mocks.products = await Promise.all([1, 2, 3].map(() => {
      addProduct({
        name: chance.name(),
        description: chance.sentence(),
        images: [chance.url(), chance.url()],
        price: chance.natural(),
        color: chance.color(),
        meta: {
          review : chance.sentence()
        }
      })
    }))
    mocks.users = await Promise.all([1, 2, 3].map(() => {
      addUser({
        name: chance.name(),
        latName: chance.last(),
        gender: 2,
        meta: {
          HairColor: chance.color(),
        }
      })
    }))

  })

  describe('Add Orders use case', () => {
    test('Orders should be added', async () => {
      // add a Orders using the use case
      mockOrdersRepository.add.mockReturnValue({ ...testOrder, id: uuidv4() });
      addedOrder = await addOrderUseCase(dependencies).execute(testOrder);

      // check the received data
      expect(addedOrder).toBeDefined();
      expect(addedOrder.id).toBeDefined();
      expect(addedOrder.name).toBe(testOrder.name);
      expect(addedOrder.lastName).toBe(testOrder.lastName);
      expect(addedOrder.gender).toBe(testOrder.gender);
      expect(addedOrder.meta).toEqual(testOrder.meta);

      // check that dependencies called as expected
      const call = mockOrdersRepository.add.mock.calls[0][0];


    });
    test('Orders should be got by id', async () => {
      // locates a Orders using the use case
      mockOrdersRepository.getById.mockReturnValue({ ...testOrder, id : uuidv4()});
      const locatedOrder = await getOrderByIdUseCase(dependencies).execute(addedOrder.id);

      // check the received data
      expect(locatedOrder).toBeDefined()
      expect(locatedOrder.id).toBeDefined()
      expect(locatedOrder.name).toBe(testOrder.name)
      expect(locatedOrder.lastName).toBe(testOrder.lastName)
      expect(locatedOrder.gender).toBe(testOrder.gender)
      expect(locatedOrder.meta).toEqual(testOrder.meta)
    });
  });
  test('Orders should be updated', async () => {
    addedOrder.meta = {
      model: 'Plus+Plus'
    }
    mockOrdersRepository.delete.mockReturnValue(addedOrder)
    mockOrdersRepository.update.mockReturnValue(addedOrder);
    // updates a Orders using the use case
    const updatedOrders = await updateOrderUseCase(dependencies).execute(addedOrder);

    // check the received data
    expect(updatedOrders).toBeDefined()
    expect(updatedOrders).toEqual(addedOrder)
  });

  test('Orders should be deleted', async () => {
    tempOrder = {...testOrder, id: uuidv4()}
    mockOrdersRepository.delete.mockReturnValue(tempOrder)
    // deletes a Orders using the use case
    const deletedOrder = await deleteOrderUseCase(dependencies).execute(tempOrder);

    // check the received data
    expect(deletedOrder).toBeDefined()
    expect(deletedOrder).toEqual(tempOrder)
  });

});