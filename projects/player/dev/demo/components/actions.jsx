var actions = require('./const').actions;

function syncState(state) {
	return {
		type: actions.SYNC_STATE,
		state: state,
	};
}

function changePath(path, queryVars) {
	return {
	    type: actions.CHANGE_PATH,
	    path: path,
	    queryVars: queryVars
  };
}

function changeContainerProp(key, value) {
	return {
	    type: actions.CHANGE_CONTAINER_PROP,
	   	key:key,
	   	value:value
  };
}

function changeEnvironmentProp(key, value) {
	return {
	    type: actions.CHANGE_ENVIRONMENT_PROP,
	   	key:key,
	   	value:value
  	};
}

function changePlayerStateProp(key, value) {
	return {
	    type: actions.CHANGE_PLAYERSTATE_PROP,
	   	key:key,
	   	value:value
  };
}

module.exports = {
	syncState: syncState,
	changePath: changePath,
	changeContainerProp:changeContainerProp,
	changePlayerStateProp: changePlayerStateProp,
	changeEnvironmentProp: changeEnvironmentProp
};