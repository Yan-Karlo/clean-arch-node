const { User } = require('../../entities');

module.exports = dependencies => {
  const { usersRepository } = dependencies;
  if (!usersRepository) {
    throw new Error('The users repository should exist in dependencies');
  }

  const execute = async ({
    name,
    lastName,
    gender,
    meta,
  }) => {
    const user = new User({
      name,
      lastName,
      gender,
      meta,
    });

    return await usersRepository.add(user);
  }

  return {execute}
}
