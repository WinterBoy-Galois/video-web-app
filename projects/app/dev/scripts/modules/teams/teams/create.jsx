var React = require('react'),
	Marionette = require('marionette'),
    $ = require('jquery'),
	
	// strings
	s = require('strings')('teams.create'),

	EnvMixin = require('mixins/environment'),

    // components
	AppPage = require('components/app_page'),
	Forms = require('components/forms'),
    Button = require('components/button'),
    TagsInput = require('react-tagsinput'),

    config = require('sdk/config'),
    s3_uploader = require('sdk/util/s3_uploader'),

	// operations
	createProjectOp = require('app/operations/create_project'),
	askImportOp = require('app/operations/askImportModal'),
	routeOp = require('app/operations/route');

function r() {
	return (
		<AppPage 
			size='medium'
        	title={s('title')}
			compAboveSheet = {s('txt_top')}
		>
			<Forms.Form
				submitButtonTitle = {s('btn_submit')}
				onSubmit = {this.onSubmit}
				ref = 'form'
			>
                <div className="vp_form">
                    <div className="vp_form_group">
                        <label for="title">{s('lbl_name')} <span className="info_bubble" title={s('tooltip_name')}></span></label>
                        <Forms.Input 
                            id='name'
                            error={this.state.error_name}
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
                            />
                        </div>
                        <div className="vp_form_group">
                            <label for="tags">{s('lbl_tags')} <span className="info_bubble" title={s('tooltip_tags')}></span></label>
                            <TagsInput
                                value={this.state.tags}
                                onChange={this.onTagsChange}
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
			</Forms.Form>
		</AppPage>
		);
}


module.exports = React.createClass({

	mixins: [EnvMixin],

	render: r,

    //used for patching nested form fields, forms should be improved in future instead 
    getInitialState: function() {
        return {
            error_description: null,
            error_name: null,
            project_thumb_url: "//app.videopath.com/style/img/vp_project_default.png",
            tags: [],
        }
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
        var form = this.refs.form
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
                form.setState({'loading': false});
            });

        } else {
            form.setState({'loading': false});
        }
    },


	onSubmit: function(values) {
		var nextRoute = this.getQueryVariable('next') || 'dashboard',
			form = this.refs.form;

        // deeply nested refs due design
        values['description'] = document.getElementById("description").value;
        values['name'] = document.getElementById("name").value;
        values['cover'] = document.getElementById("cover").value;
        values['tags'] = this.state.tags.join(',');

		form.setState({errors: false});

        /* example to custom submission prevention 
		if ( !values.tos ) {
			form.setState({
				errors: {
					tos:"Please select our terms and conditions"
				}
			});
			return;
		}
        */

		form.setState({loading:true});
        var that=this;
		createProjectOp(values)
			.then(function(result){
                var project_id = result.get('id');
                askImportOp({project_id:project_id, team: result});
			})
			.fail(function(resp){
                var vals = resp.responseJSON;
   				form.setState({loading:false});
				form.setState({errors:vals});
                if ('name' in vals) {
                    that.setState({error_name: vals.name[0]});
                } else {
                    that.setState({error_name: null});
                }
                if ('description' in vals) {
                    that.setState({error_description: vals.description[0]});
                } else {
                    that.setState({error_description: null});
                }
			})
			.always(function(){
   				//form.setState({loading:false});
   			});
    },
    
    onTagsChange: function(tags) {
        this.setState({ tags });
    }
	
});

