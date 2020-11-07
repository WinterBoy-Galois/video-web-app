function confirmMarkerCreate(options, time) {
    options.api.command('add_marker', time);
}


module.exports = {
    confirmMarkerCreate: confirmMarkerCreate
};