const FileModel = require('./file-model');
const fs = require('fs');
const sinon = require('sinon');

const list = {
  'id': 1,
  'cardNumber': '546925000000000',
  'balance': '28'
};

const stub = sinon.stub(fs, 'readFile');

beforeEach(() => {
  stub.reset();
});

describe('File-Model. Read.', () => {

  test('OK', async () => {
    const model = new FileModel('hello world');
    stub.callsArgWithAsync(1, null, JSON.stringify(list));

    expect.assertions(1);
    const data = await model.readFile();
    expect(data.cardNumber).toBe('546925000000000');
  });

  test('JSON ParseError', async () => {
    const model = new FileModel('hello world');
    stub.callsArgWithAsync(1, null, list);

    expect.assertions(1);
    try {
      await model.readFile();
    } catch (e) {
      expect(e.message).toEqual('Unexpected token o in JSON at position 1');
    }
  });

  test('Error', async () => {
    const model = new FileModel('hello world');
    stub.callsArgWithAsync(1, 'error', JSON.stringify(list));

    expect.assertions(1);
    try {
      await model.readFile();
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});
