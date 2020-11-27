const chai = require('chai');
const { MongoClient } = require('mongodb');
const { expect, assert } = chai;
const dsn = "mongodb://localhost:27017/veegil";

describe('The DSN', () => {
  it('should be configured for development', async () => {
    assert.typeOf(dsn, "string")
  });
});


describe('The database', () => {
  it('test should be reachable', async () => {
    const db = await MongoClient.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    expect(db).to.not.be.null;
    await db.close();
  });
});
