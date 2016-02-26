import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import stylelint from 'stylelint'
import standardConfig from 'stylelint-config-standard'
import { cssStandard } from '../src/index'

describe('cssStandard()', () => {
  it('should be able to check required options', () => {
    expect(() => { cssStandard({}) }).to.throw(Error, 'Please pass a `files` glob or a `code` string, but not both.')
  })

  describe('format passed options', () => {
    beforeEach(() => { sinon.spy(stylelint, 'lint') })
    afterEach(() => { stylelint.lint.restore() })

    it('should remove blacklisted options and set default config', () => {
      cssStandard({ files: 'file.css', config: '{}', configFile: '.configrc' })

      expect(stylelint.lint.calledOnce).to.be.true
      expect(stylelint.lint.getCall(0).args[0]).to.eql({ files: 'file.css', config: standardConfig })
    })
  })
})
