//测试一下Stack有没有问题
var data = new Stack();

var expect = chai.expect;

describe('Stack', function () {

  before(function () {

    data.push(1);
    data.push(2);
    data.push(4);
    data.push(5);
    data.push(6);
  });

  describe('#top()', function () {
    it('should return the value on the top of the stack', function () {
      expect(data.top).to.be.equal(5);
    });
  });

  describe('#pop()', function () {

    it('should return the top element', function () {
      expect(data.pop()).to.be.equal(6);
    });

    it('should return the top element', function () {
            expect(data.pop()).to.be.equal(5);
    });
    it('should return the value on the top of the stack', function () {
          expect(data.top).to.be.equal(3);
    });
    it('should return the top element', function () {
        expect(data.pop()).to.be.equal(4);
    });
    it('should return the top element', function () {
          expect(data.pop()).to.be.equal(2);
    });
    it('should return the top element', function () {
          expect(data.pop()).to.be.equal(1);
    });
    it('should return Ending when stack is empty', function () {
          expect(data.pop()).to.be.equal('It\' Ending !');
      })
  });

});