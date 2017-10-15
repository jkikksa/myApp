const FileModel = require('./file-model');
const fs = require('fs');
const sinon = require('sinon');

const list = {
  'id': 1,
  'cardNumber': '546925000000000',
  'balance': '28'
};


const writeFileStub = sinon.stub(fs, 'writeFile');

const readFileStub = sinon.stub(fs, 'readFile');

describe('File-Model. Read.', () => {

  beforeEach(() => {
    readFileStub.reset();
  });

  test('OK', async () => {
    const model = new FileModel('hello world');
    readFileStub.callsArgWithAsync(1, null, JSON.stringify(list));

    expect.assertions(1);
    const data = await model.readFile();
    expect(data.cardNumber).toBe('546925000000000');
  });

  test('JSON ParseError', async () => {
    const model = new FileModel('hello world');
    readFileStub.callsArgWithAsync(1, null, list);

    expect.assertions(1);
    try {
      await model.readFile();
    } catch (e) {
      expect(e.message).toEqual('Unexpected token o in JSON at position 1');
    }
  });

  test('Error', async () => {
    const model = new FileModel('hello world');
    readFileStub.callsArgWithAsync(1, 'error', JSON.stringify(list));

    expect.assertions(1);
    try {
      await model.readFile();
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});

// describe('File-Model. Write.', () => {

//   test('OK', async () => {
//     const model = new FileModel('sord.json');
//     writeFileStub.withArgs('sord.json', list, (err) => {
//       console.log(err);
//     });
//     // writeFileStub.callsArgWithAsync(1, null, JSON.stringify(list));

//     expect.assertions(0);
//     await model.writeFile(list);
//     // expect(data.cardNumber).toBe('546925000000000');
//   });

// });

describe('File-Model. GetAll.', () => {

  test('OK', async () => {
    readFileStub.callsArgWithAsync(1, null, JSON.stringify(list));
    const model = new FileModel('hello world');

    expect.assertions(1);
    await model.readFile();
    const data = await model.getAll();
    expect(data).toEqual({
      'id': 1,
      'cardNumber': '546925000000000',
      'balance': '28'
    });
  });
});
