var React = require('react'),
	s = require('strings')('teams.teams'),
	$ = require("jquery"),

	ReactDOM = require('react-dom'),

	// mixins
	BackboneMixin = require('mixins/backbone'),
	UtilsMixin = require('mixins/utils'),

	Button = require('components/button'),
    Forms = require('components/forms'),
    Tables = require('components/tables'),

	AppPage = require('components/app_page'),

	// operations
	routeOp = require('app/operations/route');

	require('tooltipster');


module.exports = React.createClass({
	mixins: [BackboneMixin, UtilsMixin],
	render: function(){
		console.log("theme", this.props.team);
		return (
			<AppPage 
				title='Edit Theme'
				hasBackButton
				hasLoadingIndicator
				className = 'vp_teams team_theme'
			>
				<Forms.Form ref = 'form'>
					<div className="vp_form_group">
						<div className="theme_color_wrapper">
							<label>Main Color</label>
							<input className="vp_color_main vp_color_selector" type="hidden" />
							<input className="vp_color_main_input team_theme_input" type="text" maxlength="7" placeholder="Main color" onChange={this.onColorMainInputChange}/>
							<span className="info_bubble" title="Main color of your player controls (<a target = '_blank' href = 'https://videopath.com/tutorial/edit-theme/'>Learn more</a>)"></span>
						</div>
					</div>
					<div className="vp_form_group">
						<div className="theme_color_wrapper">
							<input className="vp_color_active vp_color_selector" type="hidden" />
							<input className="vp_color_active_input team_theme_input" type="text" maxlength="7" placeholder="Highlight color " onChange={this.onColorActiveInputChange}/>
							<span className="info_bubble" title="Color of a selected marker (<a target = '_blank' href = 'https://videopath.com/tutorial/edit-theme/'>Learn more</a>)"></span>
						</div>
					</div>
					<div className = "vp_form_group">
						<div className="theme_color_wrapper">
							<br />
							<input type="file" className="upload_field" style={{display: 'none'}} onChange={this.onUploadFieldChanged} />
							<label>Player icon</label>
							<div className="vp_form_group">
								<div className = "vp_icon_background" onClick={this.onUploadIconClicked}>
									<div className = "vp_icon_preview">
									</div>
								</div>
								<a href = "#" className = "vp_upload_icon_link" onClick={this.onUploadIconClicked}>Upload custom icon</a> <span className="info_bubble" title="Please select a square, transparent png icon of the size 52px x 52px (<a target = '_blank' href = 'https://videopath.com/tutorial/edit-theme/'>Learn more</a>)"></span>
							</div>
							<div className="vp_form_group">
								<label for="custom_icon_link">Icon link</label>
								<div className="vp_input_group">
									<input className="custom_icon_link" type="text" name="custom_icon_link" placeholder="https://videopath.com"/>
								</div>
							</div>
						</div>
					</div>
										
					<div className = "button green done" onClick={this.onSubmit}>
						Done
					</div>
				</Forms.Form>
			</AppPage>
		);
	},

	onColorMainInputChange: function(e) {
		var $el = $(ReactDOM.findDOMNode(this));
		$el.find('.vp_color_main').spectrum('set', e.target.value);
        //this.saveUIColors();
	},

	onColorActiveInputChange: function(e) {
		var $el = $(ReactDOM.findDOMNode(this));
        $el.find('.vp_color_active').spectrum('set', e.target.value);
        //this.saveUIColors();
    },
	
	onColorMainSelectorChange: function(e, color) {
		var $el = $(ReactDOM.findDOMNode(this));
        var c = color.toHexString();
		$el.find('.vp_color_main').val(c);
		$el.find('.vp_color_main_input').val(c);
        //this.saveUIColors();
	},
	
	onColorActiveSelectorChange: function(e, color) {
		var $el = $(ReactDOM.findDOMNode(this));
		var c = color.toHexString();

		$el.find('.vp_color_active').val(c);
		$el.find('.vp_color_active_input').val(c);

        //this.saveUIColors();
	},

	onUploadIconClicked: function(e) {
		var $el = $(ReactDOM.findDOMNode(this));
        e.preventDefault();
        $el.find('.upload_field').click();
	},
	
	onUploadFieldChanged: function() {
		var $el = $(ReactDOM.findDOMNode(this));
        var file = $el.find('.upload_field').prop("files")[0];
        //this.revision.uploadIcon(file);
    },

	onSubmit: function() {
		var $el = $(ReactDOM.findDOMNode(this));
		var main = $el.find('.vp_color_main_input').val(),
			active = $el.find('.vp_color_active_input').val();
			icon_link = $el.find('.custom_icon_link').val();
			
        console.log({
            ui_color_1: main,
			ui_color_2: active,
			ui_icon_link_target: icon_link,
		});
		
		// TODO
	},
	
	setupSpectrum: function() {
		var $el = $(ReactDOM.findDOMNode(this));
		// set el height and width etc.
		console.log($el);

		var color1 = "#273a45", //this.revision.get("ui_color_1"),
            color2 = "#ffffff"; //this.revision.get("ui_color_2");

        $el.find('.vp_color_main')
            .spectrum({
                showButtons: false,
                clickoutFiresChange: true,
                preferredFormat: 'hex',
                color: color1
			});
		$el.find('.vp_color_main').on("dragstart.spectrum", this.onColorMainSelectorChange);
		$el.find('.vp_color_main').on("move.spectrum", this.onColorMainSelectorChange);
			
		$el.find('.vp_color_active')
            .spectrum({
                showButtons: false,
                clickoutFiresChange: true,
                preferredFormat: 'hex',
                color: color2
			});
		$el.find('.vp_color_active').on("dragstart.spectrum", this.onColorActiveSelectorChange);
		$el.find('.vp_color_active').on("move.spectrum", this.onColorActiveSelectorChange);

        // set colors from revision
        $el.find('.vp_color_main_input').val(color1);
		$el.find('.vp_color_active_input').val(color2);
		
		// setup tooltips
        var conf = {
            animation: "fade",
            position: "top",
            maxWidth: 250,
            delay: 500,
            interactive: true,
            contentAsHTML: true
        };

        // setup all tooltips for top
		$el.find('.info_bubble').tooltipster(conf);
		
		$el.find('.custom_icon_link').val('https://videopath.com');

		var img_css = "background-image: url(\'//vp-images-dev.s3-us-west-1.amazonaws.com/icon/default.png\');";
        $el.find('.vp_icon_preview').attr('style', img_css);
	},

	componentDidMount: function(){
		// setup spectrum
        this.setupSpectrum();
	},
	backboneProps: ['team'],
	propTypes: {
	    teams: BackboneMixin.PropTypes.Collection.isRequired,
	},
});
