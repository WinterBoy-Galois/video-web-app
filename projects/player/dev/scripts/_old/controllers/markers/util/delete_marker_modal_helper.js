function confirmMarkerDelete(options, marker_id) {
    var marker = options.video.markers.get(marker_id);
    options.api.command('delete_marker', marker);
}

module.exports = {
    confirmMarkerDelete: confirmMarkerDelete
};