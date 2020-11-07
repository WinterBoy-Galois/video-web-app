/*
 * Base Modal className for composing new modals
 */

var // _ = require('underscore'),

	constants = require('components').constants,
    utils = require('mixins/utils').utils,

	React = require('react'),
	Button = require('components/button'),
	Forms = require('components/forms'),
	Icon = require('components/icon');


function mapTitle(val) {
	return utils.trimstring(val, 45);
}


function r() {

	var video = this.props.video,

		date = utils.timeago(video.created),
	 	additionalClass = (!!video.current_revision) ? "published" : "unpublished",

		title = mapTitle(video.revision_info.title),
	 	mobileEnabled = (!!video.source.sprite_support) ?
			<div className="mobile_enabled vp_ico vp_ico_iphone"></div>
			: "",

		duration = utils.secToMinSecString(video.source.duration),

	 	className = "video " + additionalClass,

		// file state
		statusClass = "",
		statusText = "",
		status = 0,
		thumbStyle;

	if(this.state.contextMenuOpen) {
		className += ' ' + 'menu_open';
	}

    // if we have a video file
    // set the right state on the view
    if (video.source && video.source.service === 'videopath') {
        status = video.source.status;
        if (status === 'processing') {
            statusClass = "processing";
            statusText = "Processing";
        } else if (status === 'error') {
            statusClass = "error";
            statusText = "Error processing file";
        } else if (status === 'awaiting_upload') {
            statusClass = "waiting";
            statusText = "Click to add video";
        }
    }

    // if there is no source at all
    else if (!video.source) {
        statusClass = "waiting";
        statusText = "Waiting for video";
    }

	className += ' ' + statusClass;

    // set thumbnail ( if available )
    if (video.source && video.source.status == 'ok') {
        thumbStyle = {
			backgroundImage: "url('" + video.thumbnails.normal + "')"
		};
    }

	const createContextMenuButton = (action, iconType, label, extraClass) => {
		let className = "button";
		if (extraClass) {
			className += " " + extraClass;
		}
		return (
			<div className={className} onClick={this.createButtonAction(action)}>
				<Icon type={iconType}/> {label}
			</div>
		);
	};

	const ContextMenu = (
		<div className="video_context_menu"
			onMouseLeave={this.closeContextMenu}>
			{createContextMenuButton("duplicate", "copy", "Duplicate")}<br />
			{createContextMenuButton("change_source", "source", "Change Source")}<br />
			{createContextMenuButton("revisions", "time", "History")}<br />
			{/*createContextMenuButton("change_owner", "permissions", "Permissions")*/}
			{createContextMenuButton("delete", "delete", "Delete Video", "red")}
		</div>
	);

	const contextMenu = this.state.contextMenuOpen ? ContextMenu : null;

	return (
		<div className={className} onMouseLeave={this.closeContextMenu}>
			<div className="video_inner">
			    <div className="img_container"
					style={thumbStyle}
					title="Edit Video">
			        <div className="unpublished"></div>
			        <div className="full working">
			            <div className="coq_small">
			            </div>
			            <div className="coq_big">
			            </div>
			            <div className="working_title">
							{statusText}
			            </div>
			        </div>
			    </div>
			    <div className="title_top"
					onClick={this.createButtonAction("edit")}>
			        <div className="title">
						{title}
			        </div>
			    </div>
			    <div className="info_container">
			        <h1 className="title">{title}</h1>
			    </div>
			    <span className="date">added {date}</span>
				{mobileEnabled}
			    <div className="stats_container">
			        <div className="item views">
			            <div className="icon">
			            </div>
			            <div className="value">
							{video.total_plays}
			            </div>
			        </div>
			        <div className="item markers">
			            <div className="icon">
			            </div>
			            <div className="value">
							{video.revision_info.marker_count}
			            </div>
			        </div>
			        <div className="item duration">
			            <div className="icon">
			            </div>
			            <div className="value">
							{duration}
			            </div>
			        </div>
			    </div>
			    <div className="button menu" onClick={this.openContextMenu}>
			        <Icon type="video_info" />
			    </div>
			    <div className="button_container">
			        <div className="view button"
						onClick={this.createButtonAction("view")}>
			            <div className="icon">
			            </div>
			            <div className="title">
			                View
			            </div>
			        </div>
			        <div className="edit button"
						onClick={this.createButtonAction("edit")}>
			            <div className="icon">
			            </div>
			            <div className="title">
			                Edit
			            </div>
			        </div>
			        <div className="share button"
						onClick={this.createButtonAction("share")}>
			            <div className="icon">
			            </div>
			            <div className="title">
			                Share
			            </div>
			        </div>
			        <div className="analytics button"
						onClick={this.createButtonAction("analytics")}>
			            <div className="icon">
			            </div>
			            <div className="title">
			                Analytics
			            </div>
			        </div>
			    </div>
			</div>

			{contextMenu}

		</div>
	);
}


module.exports = React.createClass({
	render: r,

	getInitialState: function() {
		return {
			contextMenuOpen: false
		};
	},

	closeContextMenu: function() {
		if (this.state.contextMenuOpen) {
			this.setState({contextMenuOpen: false});
		}
	},

	openContextMenu: function() {
		if (!this.state.contextMenuOpen) {
			this.setState({contextMenuOpen: true});
		}
	},

	onButtonClicked: function(action) {
		// TODO: Delegate the click event properly.
		console.log(action, this.props.video.id, "clicked");
	},

	createButtonAction: function(action) {
		return () => this.onButtonClicked(action);
	}
});
