ainur
=====

Micro toolset/library for SPA development, (being) built with existing small libraries.


Current features:
- Promises (https://github.com/cburgmer/ayepromise)
- Class Inheritance (http://ejohn.org/blog/simple-javascript-inheritance)
- DOM Manipulation and Ajax (http://zeptojs.com)
- Two-way data-binding (http://rivetsjs.com)
- Events (https://github.com/scottcorgan/tiny-emitter)
- Route Handling (http://projects.jga.me/routie/)
- UI/Route State Handling (myself)
- Application Lifecyle (myself)

### I'm looking for help to develop and document this!

## Docs

### Library Methods
- ainur.define(name, module) // Define a module
- ainur.require(name) // Require a module
- ainur.class(definition) // Helper to define a class, especifying a $name (to be used as the module name) and $parent (optional) while extending
- ainur.state(definition) // Helper to define a state
- ainur.config(func) // Functions to be queued and executed when aniur.bootstrap is called (before run step), functions added to the queue after bootstrap will be executed immediately
- ainur.run(func) // Functions to be queued and executed when aniur.bootstrap is called (after config step), functions added to the queue after bootstrap will be executed immediately
- ainur.bootstrap() // Bootstrap app

### Library Predefined Tools
- aStateManager.define(stateDefinition)
- aDefer()
	- aDefer().promise
	- aDefer().resolve(result)
	- aDefer().reject(reason)
	- aDefer.resolved(result)
	- aDefer.rejected(reason)
- aAjax(url, method, data) // returns promise
- aView // Base view to be extended
	- Properties:
		- view // Class or defined Class name
		- template
		- templateUrl
		- attributes
	- Methods:
		- setup
		- destroy
		- appendTo
- aRouter(route)
- aClass // Base class to be extended
