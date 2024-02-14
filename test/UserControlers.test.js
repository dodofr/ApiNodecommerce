const request = require("supertest");
const app = require("../app");
const { User } = require('../src/db/sequelize');

//test unitaire CreateUsers

const bcrypt = require('bcrypt');

describe('createUserControlers', () => {
  it('creates a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        name: 'Test',
        firstname: 'User',
        password: 'password',
        email: 'test@example.com'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', "L'utilisateur testuser a bien été crée.");
    expect(res.body).toHaveProperty('data');

    // Vérifie que l'utilisateur a été créé dans la base de données
    const user = await User.findOne({ where: { username: 'testuser' } });
    expect(user).toBeDefined();
    expect(bcrypt.compareSync('password', user.password)).toBe(true);
  });

  it('returns a 400 status code and an error message if a validation error occurs', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: '',  // Valeur non valide
        name: 'Test',
        firstname: 'User',
        password: 'password',
        email: 'test@example.com'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
  });

  it('returns a 400 status code and an error message if a unique constraint error occurs', async () => {
    // Création d'un utilisateur avec le même nom d'utilisateur
    await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        name: 'Test',
        firstname: 'User',
        password: 'password',
        email: 'test@example.com'
      });

    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',  // Nom d'utilisateur déjà utilisé
        name: 'Test',
        firstname: 'User',
        password: 'password',
        email: 'test@example.com'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('data');
  });
});

// test unitaire deletUserCrontrolers

describe('deleteUserControlers', () => {
  it('deletes an existing user', async () => {
    // Création d'un utilisateur de test
    const user = await User.create({
        username: 'testdelete1',
        name: 'Testdelete1',
        firstname: 'Userdelete1',
        password: 'password',
        email: 'testdelete1@example.com'
    });

    const res = await request(app)
      .delete(`/api/users/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', `${user.name} avec l'identifiant n°${user.id} a bien été supprimé.`);
    expect(res.body).toHaveProperty('data');

    // Vérifie que l'utilisateur a été supprimé de la base de données
    const deletedUser = await User.findByPk(user.id);
    expect(deletedUser).toBeNull();
  });

  it('returns a 404 status code and an error message if the user is not found', async () => {
    const res = await request(app)
      .delete('/api/users/999');  // ID d'utilisateur non existant
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', "le user est introuvable");
  });

  it('returns a 500 status code and an error message if an error occurs', async () => {
    // Création d'un utilisateur de test
    const user = await User.create({
        username: 'testdelete2',
        name: 'Testdelete2',
        firstname: 'Userdelete2',
        password: 'password',
        email: 'testdelete2@example.com'
    });

    // Modification de la fonction User.destroy pour qu'elle retourne une erreur
    User.destroy = jest.fn(() => { throw new Error('Test error'); });

    const res = await request(app)
      .delete(`/api/users/${user.id}`);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('message', "le user n'a pas pu étre supprimé");
    expect(res.body).toHaveProperty('data');

    // Réinitialisation de la fonction User.destroy
    User.destroy = jest.fn();
  });
});


//test unitaire pour FindoneuserControlers
describe("Test the FindOneUserControlers function", () => {
  it("should return a single user", async () => {
    const response = await request(app).get("/api/users/1");
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("data");
  });

  it("should return a 404 error if the user is not found", async () => {
    const response = await request(app).get("/api/users/999");
    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message", "l'utilisateur' est introuvable");
  });

//   it("should handle errors", async () => {
//     const response = await request(app).get("/error");
//     expect(response.status).toEqual(500);
//     expect(response.body).toHaveProperty("data");
//   });
});

//test unitaire pour findALLUsersControlers

describe("Test the findAllUsersControlers function", () => {
    it("should return a list of users", async () => {
      const response = await request(app).get("/api/users");
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toBeInstanceOf(Array);
    });
  
    // it("should handle errors", async () => {
    //   const response = await request(app).get("/api/error");
    //   expect(response.status).toEqual(500);
    //   expect(response.body).toHaveProperty("data");
    // });
  });