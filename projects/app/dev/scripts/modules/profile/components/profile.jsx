var React = require('react'),
	// strings
	s = require('strings')('settings.profile'),
    $ = require('jquery'),

	BackboneMixin = require('mixins/backbone'),

	// components
	AppPage = require('components/app_page'),
    PageSection = require('components/pageSection'),
    Avatar = require("react-avatar"),
    LoadingIndicator = require('components/loadingIndicator'),
    TagsInput = require('react-tagsinput'),
    changeProfileOp = require('app/operations/changeProfile');

require('react-tagsinput/react-tagsinput.css');

function r() {
	return (
		<AppPage 
            size="large"
			//hasBackButton
			//title={s('title')}
			//compAboveSheet = {s('txt_top')}
			>
            <div style={{display:'table'}}>
                <LoadingIndicator
                    visible={this.state.loading}
                expanded />

                <div style={{width:'90px', display: 'table-cell', textAlign: 'center'}}>
                    <Avatar
                        name={this.props.profile.get('first_name') + " " + this.props.profile.get('last_name')}
                        color="#41c3ac"
                        src={this.state.avatar_url}
                        style={{fontSize:'14px'}}
                        className="avatar-container"
                        size={80} round={true} />
                    {this.props.profile.get('ref') == this.props.user.get('profile').ref && <div><a style={{cursor:'pointer'}}  onClick={this.onUploadOwnClick} className=".upload_avatar">Upload</a><input type="file" onChange={this.onFileSelected} style={{display:'none'}} className="upload_field"/></div>}
                </div>
                <div style={{width:'100%', display: 'table-cell', paddingLeft:'40px'}}>
                    <h2>{this.props.profile.get('first_name')} {this.props.profile.get('last_name')}</h2>
                    <TagsInput
                        value={this.state.tags}
                        onChange={this.onTagsChange}
                    />
                </div>
            </div>
		</AppPage>
		);
}



module.exports = React.createClass({

	mixins: [BackboneMixin],

    getInitialState: function () {
        return {
            'loading': false,
            'avatar_url': this.props.profile.get('avatar').regular,
            'tags': (this.props.profile.get('tags') || '').length > 0 ? this.props.profile.get('tags').split(',') : [],
        }
    },

    setAvatar: function(url) {
        //$(".custom_thumb").css("background-image", "url(" + url + ")");
        this.setState({'avatar_url':url})
    },

    onUploadOwnClick: function() {
        $(".upload_field")[0].click();
    },

    onTagsChange: function(tags) {
        this.setState({tags});
        var data = {
            ...this.props.profile.attributes,
            tags: tags.join(',')
        }
        changeProfileOp(data);
    },

    onFileSelected: function() {
        this.setState({'loading': true});
        var files = $(".upload_field")[0].files;
        var _this = this;
        if (files.length > 0) {
            this.props.profile.uploadAvatar(files[0]).
            then(function() {
                var localURL = URL.createObjectURL(files[0]);
                _this.setAvatar(localURL);
                _this.props.user.setAvatar(localURL);
                _this.setState({'loading': false});
            });

        } else {
            this.setState({'loading': false});
        }
    },

	render: r,

	backboneProps: ['user', 'profile'],

	propTypes: {
	    user: BackboneMixin.PropTypes.Model.isRequired,
	    profile: BackboneMixin.PropTypes.Model.isRequired
	}
	
});
