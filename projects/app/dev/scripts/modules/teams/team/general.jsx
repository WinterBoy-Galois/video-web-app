var React = require('react'),
    $ = require('jquery'),
    
    // strings
    s = require('strings')('teams.create'),
    	
	Button = require('components/button'),
    Icon = require('components/icon'),
    toasts = require('app/ui/toasts'),
    TagsInput = require('react-tagsinput'),
    
	// mixins
	BackboneMixin = require('mixins/backbone'),
	UtilsMixin = require('mixins/utils'),
	Forms = require('components/forms'),

    config = require('sdk/config'),
    s3_uploader = require('sdk/util/s3_uploader'),
    showStartVideoOp = require('app/operations/showStartVideoModal'),
	AddMemberOp = require('app/operations/addTeamMember');
        
    require('tooltipster');


function onAddMember(team) {
	AddMemberOp({
		team:team
	});
}

function onUploadVideo(team) {
    result = showStartVideoOp({
        team:team
    });
}

function onDone(team) {
    var form = this.refs.form;

    team.set({
        name: this.state.name,
        description: this.state.description,
        tags: this.state.tags.join(','),
        cover: this.state.cover,
    });
    
    form.setState({errors: false});
    form.setState({loading:true});
            
    team.save().then(function(){
        form.setState({loading:false});
        toasts.remove();
        toasts.success('Project settings saved.');
    }).fail(function(resp){
        form.setState({loading:false});
        console.log('fail', resp);
        toasts.remove();
        toasts.success('Your project settings could not be saved.');
    });
}

function onChangeName(evt) {
    this.setState({
        name: evt.target.value,
    });
}

function onChangeDescription(evt) {
    this.setState({
        description: evt.target.value,
    });
}

function onTagsChange(tags) {
    this.setState({ tags });
}

function r() {

    var team = this.props.team;
    
    var inviteButton = false;
    var addButton = false;
    var doneButton = false;
    inviteButton = <Button 
            title ='Invite New Member' 
            icon='circle_plus' 
            className = 'vp_invitemember_button' 
            onClick={onAddMember.bind(this, this.props.team)}/>;

    addButton = <div 
            title ='Upload a video' 
            className = 'vp_uploadvideo_button' 
            onClick={onUploadVideo.bind(this, this.props.team)}
            ><div style={{float: 'left'}}>Upload a video</div><div className="vp_img_addvideo"></div></div>;

    doneButton = <Button class = "button green done"
            title ='Done' 
            className = 'vp_done_button' 
            onClick={onDone.bind(this, this.props.team)}
            />;
    
	return (
		<Forms.Form
            ref = 'form'>
                <div className="vp_form">
                <div className="vp_form_group">
                    <label for="title">{s('lbl_name')} <span className="info_bubble" title={s('tooltip_name')}></span></label>
                    <Forms.Input 
                        id='name'
                        error={this.state.error_name}
                        defaultValue = {this.props.team.get('name')}
                        disabled={!team.userCanEdit()}
                        onChange={onChangeName.bind(this)}
                    />
                </div>
            </div>
            <div style={{display: 'table'}}>
                <div className="vp_form" style={{display: 'table-cell', width: '50%', paddingRight: '10px'}}>
                    <div className="vp_form_group">
                        <label for="description">{s('lbl_description')} <span className="info_bubble" title={s('tooltip_description')}></span></label>
                        <Forms.Input 
                            type="textarea"
                            id='description'
                            cols="40"
                            rows="5"
                            error={this.state.error_description}
                            defaultValue={this.props.team.get('description')}
                            onChange={onChangeDescription.bind(this)}
                        />
                    </div>
                    <div className="vp_form_group">
                        <label for="tags">{s('lbl_tags')} <span className="info_bubble" title={s('tooltip_tags')}></span></label>
                        <TagsInput
                            value={this.state.tags}
                            onChange={onTagsChange.bind(this)}
                        />
                    </div>
                </div>
            
                <div className="vp_form" style={{display: 'table-cell', width: '50%', paddingLeft: '10px'}}>
                    <div style={{ width:"100%", height: "165px", textAlign: "left", marginTop: "5px" }}>
                        <span><b>{s('lbl_thumbnail')}</b></span>
                        <Forms.Input 
                            id='cover'
                            style={{ display:"none" }}
                        />
                        <div style={{ border: "solid 1px #c6c6c6", textAlign: "center" }}>
                        <img src={this.state.project_thumb_url } style={{ width:"192px", height: "108px" }} />
                        <div style={{ textAlign: "right", width: "100%" }}>
                            <a
                                style={{cursor:'pointer'}} 
                                onClick={this.onUploadOwnClick} 
                                className=".upload_avatar"
                            >Upload Your Own
                            </a>
                            <input type="file" onChange={this.onFileSelected} style={{display:'none'}} className="upload_field"/></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {inviteButton}
                {addButton}
                {doneButton}
            </div>
		</Forms.Form>
	);
};


module.exports = React.createClass({
	mixins: [BackboneMixin, UtilsMixin],

    getInitialState: function() {
        var thumb =  "//app.videopath.com/style/img/vp_project_default.png";
        var project_cover = this.props.team.get('actual_cover');
        if (project_cover != null && project_cover.length > 0) {
            thumb = project_cover;
        }

        return {
            project_thumb_url: thumb,
            name:this.props.team.get('name'),
            description: this.props.team.get('description'),
            tags: this.props.team.get('tags'),
            cover: this.props.team.get('cover'),
            tags: (this.props.team.get('tags') || '').length > 0 ? this.props.team.get('tags').split(',') : [],
        };
    },

    onUploadOwnClick: function() {
        $(".upload_field")[0].click();
    },

    setProjectThumbnail: function(url) {
        this.setState({'project_thumb_url':url})
    },

    uploadProjectThumbnail: function(file) {
        return s3_uploader.uploadFile(
            file,
            config.urls.uploadImageTicketURL + 'project_cover/new/',
            config.urls.uploadImageCompleteURL
        );
    },

    onFileSelected: function() {
        var form = this.refs.form;
        form.setState({'loading': true});

        var files = $(".upload_field")[0].files;
        var _this = this;

        if (files.length > 0) {
            this.uploadProjectThumbnail(files[0]).
            then(function(data) {
                var localURL = URL.createObjectURL(files[0]);
                _this.setProjectThumbnail(localURL);
                var image_id = data.ticket_id;
                $("#cover").val(image_id);
                
                _this.setState({
                    cover: image_id
                });

                form.setState({'loading': false});
            });

        } else {
            form.setState({'loading': false});
        }
    },

	render: r,
	componentDidMount: function(){
    },
    
	backboneProps: ['team'],
	propTypes: {
	    team: BackboneMixin.PropTypes.Model.isRequired,
	},
});
