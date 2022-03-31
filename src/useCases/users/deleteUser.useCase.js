const { User } = require('../../entities');

module.exports = dependencies => {
  const { usersRepository } = dependencies;

  if (!usersRepository) {
    throw new Error('The users repository should exist in dependencies');
  }

  const execute = async (user) => {
    return await usersRepository.delete(user);
  }

  return {execute}
}
