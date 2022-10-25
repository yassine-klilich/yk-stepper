"use strict";

if(window.Stepper == undefined) {
  window.Stepper = (function() {
    const _defaultConfig = Object.freeze({
      stepperEl: null
    })
    
    function Stepper(config = _defaultConfig) {
      let _config = _buildConfigObject(config)
      if(_config.stepperEl == null || (_config.stepperEl instanceof HTMLElement) == false) {
        throw new Error("ERROR[Stepper.registerStep] :: Stepper element is not instance of HTMLElement")
      }
      let _stepperEl = _config.stepperEl
      let _steps = []
      
      Object.defineProperty(this, "config", {
        value: _config
      })
      Object.defineProperty(this, "steps", {
        get: () => _steps
      })
      Object.defineProperty(this, "stepperEl", {
        get: () => _stepperEl
      })
    }

    Stepper.prototype.registerStep = function(config) {
      const _stepperEl = this.config.stepperEl
      if((_stepperEl instanceof HTMLElement) == false) {
        throw new Error("ERROR[Stepper.registerStep] :: Stepper element is not instance of HTMLElement")
      }
      const step = new Step(this, config)
      this.steps.push(step)
    }

    Stepper.prototype.goToStep = function() {
      
    }

    Stepper.prototype.nextStep = function() {
      
    }

    Stepper.prototype.previousStep = function() {
      
    }

    function _buildConfigObject(config) {
      const _config = {};
      const keys = Object.keys(_defaultConfig);
      const length = keys.length;
      for (let index = 0; index < length; index++) {
        const key = keys[index];
        if(config.hasOwnProperty(key) == true) {
          _config[key] = config[key];
        }
        else {
          _config[key] = _defaultConfig[key];
        }
      }
      return _config;
    }

    return Stepper
  })()
}

if(window.Step == undefined) {
  window.Step = (function() {
    const _defaultConfig = Object.freeze({
      name: null,
      inputs: [],
    })

    function Step(stepper, config = _defaultConfig) {
      let _config = _buildConfigObject(config)
      if((stepper instanceof Stepper) == false) {
        throw new Error("ERROR[Step] :: stepper is not instance of Stepper")
      }
      if((_config.inputs instanceof Array) == false) {
        throw new Error("ERROR[Step] :: inputs is not instance of Array")
      }
      let _inputs = _config.inputs
      let _stepper = stepper

      Object.defineProperty(this, "config", {
        get: () => _config
      })
      Object.defineProperty(this, "inputs", {
        get: () => _inputs
      })
      Object.defineProperty(this, "stepper", {
        get: () => _stepper
      })

      _registerStep.call(this)
    }

    Step.prototype.addDefaultInput = function(inputId) {
      
      const inputElement = this.stepper.stepperEl.querySelector(`#${inputId}`)
      if(inputElement == null) {
        throw new Error(`ERROR[Step.addDefaultInput] :: No element with id '${inputId}' is found`)
      }
      if(_isInputElement(inputElement) == false) {
        throw new Error(`ERROR[Step.addDefaultInput] :: '${inputId}' is not an input element`)
      }
      this.inputs[inputId] = new StepInput({
        type: StepInput.Type.DEFAULT,
        inputEl: inputElement,
      })
    }

    Step.prototype.addRawInput = function(config, inputElement) {
      this.inputs[config.id] = new StepInput({
        type: StepInput.Type.RAW,
        inputEl: inputElement,
      })
    }

    function _registerStep() {
      const inputs = this.inputs
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        if(input == null) {
          throw new Error("ERROR[Step.registerStep] :: Can not register a null input")
        }
        if(typeof input == "string" || input instanceof String) {
          this.addDefaultInput(input)
        }
        else {
          const inputElement = this.stepper.stepperEl.querySelector(`#${input.id}`)
          if(inputElement == null) {
            throw new Error(`ERROR[Step.registerStep] :: No element with id '${input}' is found`)
          }
          if(_isInputElement(inputElement) == false) {
            throw new Error(`ERROR[Step.registerStep] :: '${input}' is not an input element`)
          }
          this.addRawInput(input, inputElement)
        }
      }
    }

    function _buildConfigObject(config) {
      const _config = {};
      const keys = Object.keys(_defaultConfig);
      const length = keys.length;
      for (let index = 0; index < length; index++) {
        const key = keys[index];
        if(config.hasOwnProperty(key) == true) {
          _config[key] = config[key];
        }
        else {
          _config[key] = _defaultConfig[key];
        }
      }
      return _config;
    }

    function _isInputElement(element) {
      return (element instanceof HTMLInputElement) || (element instanceof HTMLSelectElement) || (element instanceof HTMLTextAreaElement)
    }

    return Step
  })()
}

if(window.StepInput == undefined) {
  window.StepInput = (function() {
    const _defaultConfig = Object.freeze({
      type: null,
      inputEl: null,
      getValue: _getValue,
    })
    
    function StepInput(config = _defaultConfig) {
      let _config = _buildConfigObject(config)
      let _isValid = null
      let _validators = null
      Object.defineProperty(this, "config", {
        get: () => _config
      })
    }

    StepInput.prototype.getValue = function() {
      return this.config.getValue()
    }

    function _getValue() {
      return this.inputEl.value
    }
    
    function _buildConfigObject(config) {
      const _config = {}
      const keys = Object.keys(_defaultConfig)
      const length = keys.length
      for (let index = 0; index < length; index++) {
        const key = keys[index]
        if(config.hasOwnProperty(key) == true) {
          _config[key] = config[key]
        }
        else {
          _config[key] = _defaultConfig[key]
        }
      }
      return _config
    }

    StepInput.Type = Object.freeze({
      DEFAULT: "default",
      RAW: "raw",
      CUSTOM: "custom",
    })

    return StepInput
  })()
}

if(window.Validator == undefined) {
  window.Validator = (function() {
    const _validator = {}

    _validator.required = function() {
      
    }

    _validator.maxLength = function() {
      
    }

    return _validator
  })()
}
