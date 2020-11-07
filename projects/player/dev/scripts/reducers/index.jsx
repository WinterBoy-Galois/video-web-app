var _ = require('underscore'),
	update = require('react-addons-update');

var reducers = {
	playerState: require('./playerState'),
	videoRevision: require('./videoRevision'),
	environment: require('./environment'),
	engineCommands: require('./engineCommands'),
	theme: require('./theme')
};

/*
 * deep freeze helper
 */
function deepFreeze (o) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  
  return o;
};

/*
 *	Main reducer function, apply changesets
 */
function reducer(state, action) {

	if (!state) {
		state = _.mapObject(reducers, function(r){return r.default();} );
	}

	var changes = _.reduce(reducers, function(changes, reducer, key){
		if ( action.type in reducer ) {
			var result = reducer[action.type](state[key], action, state);
			if (result) {
				changes[key] = result;
			}
		}
		return changes;
	}, {});

	var newState = update(state, changes);

	// when testing / developing, deep-freeze the state
	// so code will through exceptions if state is mutated
	if ("production" !== process.env.NODE_ENV) {
		deepFreeze(newState);
	}

	return newState;
};

module.exports = reducer;

