const Chance = require('chance');
const chance = new Chance();
const { usersRepository } = require('../../../src/frameworks/repositories/inMemory')

const {
  User,
  constants: {
    userConstants: {
      genders
    }
  }
} = require('../../../src/entities');

const testUser1 = new User({
  name: chance.name(),
  lastName: chance.last(),
  gender: genders.FEMALE,
  meta: {
    hair: {
      color: 'black'
    }
  }
})
const testUser2 = new User({
  name: chance.name(),
  lastName: chance.last(),
  gender: genders.MALE,
  meta: {
    hair: {
      color: 'Blond'
    }
  }
})



//#region Users Repository
describe('Users Repository', () => {
  test('New user should be added and returned', async () => {

    const addedUser = await usersRepository.add(testUser1)

    expect(addedUser).toBeDefined();
    expect(addedUser.id).toBeDefined();
    expect(addedUser.name).toBe(testUser1.name);
    expect(addedUser.lastName).toBe(testUser1.lastName);
    expect(addedUser.gender).toBe(testUser1.gender);

    const returnedUser = await usersRepository.getById(addedUser.id);
    expect(returnedUser).toEqual(addedUser);
  })
  test('New user should be deleted and returned', async () => {
    // add 2 users
    const addedUser1 = await usersRepository.add(testUser1);
    const addedUser2 = await usersRepository.add(testUser2);

    // delete 1 user
    const deletedUser = await usersRepository.delete(addedUser1);
    // try to get the deleted user
    const getDeletedUser = await usersRepository.getById(deletedUser.id);
    // check the 2nd user defined (not deleted)
    const checkedUser = await usersRepository.getById(addedUser2.id);

    // console.log('getting the deleted user ................')
    // console.log(getDeletedUser)
    // console.log(typeof getDeletedUser);

    expect(addedUser1).toStrictEqual(testUser1);
    expect(addedUser2).toStrictEqual(testUser2);
    expect(deletedUser).toStrictEqual(addedUser1);
    expect(typeof getDeletedUser).toBe('undefined');
    expect(checkedUser.id).toBe(addedUser2.id);
    expect(checkedUser.name).toBe(addedUser2.name);
    expect(checkedUser.lastName).toBe(addedUser2.lastName);

   })

  test('New user should be updated and returned', async () => {
    // add a user
    var addedUser = await usersRepository.add(testUser1);

    // data alteration
    addedUser.name = 'Yan';
    addedUser.lastName = 'Teixeira';

    // upodate a user
    const updatedUser = await usersRepository.update(addedUser);

    expect(updatedUser.name).toBe('Yan');
    expect(updatedUser.lastName).toBe('Teixeira');
   })

});
//#endregion