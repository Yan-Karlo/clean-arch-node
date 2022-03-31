const { user } = require('../../../src/useCases');
const Chance = require('chance');
const chance = new Chance();
const {
  addUserUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase
} = user;

const {
  User,
  constants: {
    userConstants: {
      genders
    }
  }
} = require('../../../src/entities');

let addedUser = {}
const { v4: uuidv4 } = require('uuid');

// create a user data
const testUser = new User({
  name: chance.name(),
  lastName: chance.last(),
  gender: genders.FEMALE,
  meta: {
    hair: {
      color: 'black'
    }
  }
})


describe('User use cases', () => {
  const mockUserRepository = {
    add: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
  const dependencies = { usersRepository: mockUserRepository }

  describe('Add user use case', () => {
    test('User should be added', async () => {
      // add a user using the use case
      mockUserRepository.add.mockReturnValue({ ...testUser, id: uuidv4() });
      addedUser = await addUserUseCase(dependencies).execute(testUser);

      // check the received data
      expect(addedUser).toBeDefined();
      expect(addedUser.id).toBeDefined();
      expect(addedUser.name).toBe(testUser.name);
      expect(addedUser.lastName).toBe(testUser.lastName);
      expect(addedUser.gender).toBe(testUser.gender);
      expect(addedUser.meta).toEqual(testUser.meta);

      // check that dependencies called as expected
      const call = mockUserRepository.add.mock.calls[0][0];


    });
    test('User should be got by id', async () => {
      // locates a user using the use case
      mockUserRepository.getById.mockReturnValue({ ...addedUser});
      const locatedUser = await getUserByIdUseCase(dependencies).execute(addedUser.id);

      // check the received data
      expect(locatedUser).toBeDefined()
      expect(locatedUser.id).toBeDefined()
      expect(locatedUser.name).toBe(addedUser.name)
      expect(locatedUser.lastName).toBe(addedUser.lastName)
      expect(locatedUser.gender).toBe(addedUser.gender)
      expect(locatedUser.meta).toEqual(addedUser.meta)
    });
  });
  test('User should be updated', async () => {
    addedUser.meta = {
      hair: {
        color: 'blue'
      }
    }
    mockUserRepository.delete.mockReturnValue(addedUser)
    mockUserRepository.update.mockReturnValue(addedUser);
    // updates a user using the use case
    const updatedUser = await updateUserUseCase(dependencies).execute(addedUser);

    // check the received data
    expect(updatedUser).toBeDefined()
    expect(updatedUser).toEqual(addedUser)
  });

  test('User should be deleted', async () => {
    tempUser = {...testUser, id: uuidv4()}
    mockUserRepository.delete.mockReturnValue(tempUser)
    // deletes a user using the use case
    const deletedUser = await deleteUserUseCase(dependencies).execute(tempUser);

    // check the received data
    expect(deletedUser).toBeDefined()
    expect(deletedUser).toEqual(tempUser)
  });

});