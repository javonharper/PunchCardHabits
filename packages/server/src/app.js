const Koa = require('koa')
const Router = require('koa-router')
const uuid = require('uuid')
const mount = require('koa-mount')
const { camelizeKeys } = require('humps')
const graphqlHTTP = require('koa-graphql')
const { graphql, buildSchema } = require('graphql')

const setupData = require('./data').setupData

const app = new Koa()
const router = new Router()

const knex = require('./database')

router.get('/', async (ctx, next) => {
  ctx.body = 'OK'
})

router.get('/data.reset', async (ctx, next) => {
  await setupData()

  const habits = await knex('habits')
  const completions = await knex('completions')

  ctx.body = {
    habits,
    completions,
  }
})

const habits = {
  list: null,
  get: null,
  create: null,
}

const completions = {
  list: null,
  get: null,
}

habits.list = async () => {
  const habits = await knex('habits')

  const habitsWithCompletions = await Promise.all(
    habits.map(async habit => {
      const completions = await knex('completions').where({
        habit_id: habit.id,
      })
      return { ...habit, completions: completions }
    }),
  )

  return camelizeKeys(habitsWithCompletions)
}

habits.get = async id => {
  const habit = await knex('habits')
    .where({ id })
    .first()

  const completions = await knex('completions').where({ habit_id: id })

  return camelizeKeys({ ...habit, completions: completions })
}

habits.create = async ({ name, color, frequency, goal }) => {
  const habit = await knex('habits')
    .insert({
      id: uuid(),
      name,
      color,
      frequency,
      goal,
    })
    .returning('*')

  return camelizeKeys(habit[0])
}

completions.list = async () => {
  const completions = await knex('completions')

  return camelizeKeys(completions)
}

completions.get = async id => {
  const completion = await knex('completions')
    .where({ id })
    .first()

  return camelizeKeys(completion)
}

completions.log = async ({ habitId, date, timestamp }) => {
  const completion = await knex('completions')
    .insert({
      id: uuid(),
      habit_id: habitId,
      date,
      timestamp,
    })

    .returning('*')

  return camelizeKeys(completion[0])
}

const schema = buildSchema(`
  enum HabitFrequency {
    WEEKLY
    DAILY
  }

  type Habit {
    id: ID!
    name: String!
    color: String!
    goal: Int!
    frequency: HabitFrequency!
    completions: [Completion]!
  }

  type Completion {
    id: ID!
    habitId: ID
    timestamp: String
    date: String
  }

  type Query { 
    habits: [Habit]
    habit(id: ID!): Habit
    completions: [Completion]
    completion(id: ID!): Completion
  }

  type Mutation {
    createHabit(name: String!, color: String!, goal: Int!, frequency: String!): Habit
    logCompletion(habitId: ID!, date: String!, timestamp: String!): Completion
  }
`)

var root = {
  habits: async () => await habits.list(),
  habit: async ({ id }) => await habits.get(id),
  completions: async () => await completions.list(),
  completion: async ({ id }) => await completions.get(id),
  createHabit: async ({ name, color, goal, frequency }) =>
    await habits.create({ name, color, goal, frequency }),
  logCompletion: async ({ habitId, date, timestamp }) =>
    await completions.log({ habitId, date, timestamp }),
}

router.all(
  '/api',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
)

app.use(router.routes())
app.use(router.allowedMethods())


module.exports = app
