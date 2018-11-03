const uuid = require('uuid')
const moment = require('moment')
const knex = require('./database')

const createSchema = async () => {
  console.log('Creating schema...')

  console.log('Dropping tables')
  await knex.schema.dropTableIfExists('habits')
  await knex.schema.dropTableIfExists('completions')

  console.log('Creating habits table')
  await knex.schema.createTable('habits', table => {
    table
      .uuid('id')
      .unique()
      .primary()
      .notNullable()
    table.string('name')
    table.string('color')
    table.integer('goal')
    table.string('frequency')
  })

  console.log('Creating completions table')
  await knex.schema.createTable('completions', table => {
    table
      .uuid('id')
      .unique()
      .primary()
      .notNullable()
    table.uuid('habit_id')
    table.string('timestamp')
    table.string('date')
  })

  console.log('Schema created')
}

const seedData = async () => {
  const gymHabit = await knex('habits')
    .returning('id')
    .insert({
      id: uuid(),
      name: 'Go to the Gym',
      color: '#FF0000',
      goal: '3',
      frequency: 'WEEKLY',
    })

  const medHabit = await knex('habits')
    .returning('id')
    .insert({
      id: uuid(),
      name: 'Meditate',
      color: '#00FF00',
      goal: '1',
      frequency: 'DAILY',
    })

  await knex('completions').insert({
    id: uuid(),
    timestamp: moment().format(),
    date: moment().format('YYYY-MM-DD'),
    habit_id: gymHabit[0],
  })

  await knex('completions').insert({
    id: uuid(),
    timestamp: moment().format(),
    date: moment().format('YYYY-MM-DD'),
    habit_id: gymHabit[0],
  })

  await knex('completions').insert({
    id: uuid(),
    timestamp: moment().format(),
    date: moment().format('YYYY-MM-DD'),
    habit_id: gymHabit[0],
  })

  await knex('completions').insert({
    id: uuid(),
    timestamp: moment().format(),
    date: moment().format('YYYY-MM-DD'),
    habit_id: medHabit[0],
  })

  console.log('Habits data initialized')
}

const setupData = async () => {
  await createSchema()
  await seedData()
}

const sum = (a, b) => {
  return a + b
}

module.exports = { setupData, sum }
