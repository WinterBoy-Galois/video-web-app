var React = require('react'),
	s = require('strings')('videos.history'),
	
	// mixins
	BackboneMixin = require('mixins/backbone'),
	UtilsMixin = require('mixins/utils'),

	Button = require('components/button'),
    Forms = require('components/forms'),
    Tables = require('components/tables'),

	AppPage = require('components/app_page'),

	// operations
	revertOp = require('app/operations/revertVideoRevision'),
    previewOp = require('app/operations/previewVideo'),
    createOp = require('app/operations/createVideoFromRevision');

function revert(revision) {
	revertOp({
        video: this.props.video,
        revision: revision
    }, {
        accessScope: this.props.team,
        successRoute: 'dashboard'
    });
}

function view(revision) {
	previewOp({
        revision: revision
    });
}

function add(revision) {
	createOp({
        revision: revision
    }, {
        accessScope: this.props.team,
        successRoute: 'dashboard'
    });
}

function rEntry(revision) {

	var publishedDate = revision.get('revision_type') == 'draft' ? 
						'-current draft-' : 
						this.utils.timeago(revision.get('created'));

    return (
		<Tables.Body key = {revision.cid} >
	    	<tr>
	    		<td>{publishedDate}</td> 
	    		<td rowSpan = '2' style={ {width:'330px'} }>
	    			<Button 
	    				onClick = { view.bind(this, revision) }
	    				icon = 'view' 
	    				title = 'View' 
	    				color = 'lightblue' />
	    			<Button 
	    				onClick = { revert.bind(this, revision) }
	    				icon = 'replay' 
	    				title = 'Revert' 
	    				color = 'orange'/>
	    			<Button 
	    				onClick = { add.bind(this, revision) }
	    				icon = 'circle_plus' 
	    				title = 'New' 
	    				color = 'green' />
	    		</td> 
	    	</tr>
	    	<tr>
	    		<td className = 'vp_detail'>
	    			{revision.get('title')}
	    		</td>
	    	</tr>
		</Tables.Body>);
}

module.exports = React.createClass({
	mixins: [BackboneMixin, UtilsMixin],
	render: function(){
		return (
			<AppPage 
				title={s('title')}
				compAboveSheet={s('description')}
				hasBackButton
				hasLoadingIndicator
				className = 'vp_teams'>
				<Tables.Table>
					<Tables.Header>{['Published']}</Tables.Header>
						{this.props.revisions.map(rEntry.bind(this))}
				</Tables.Table>
			</AppPage>
		);
	},
	componentDidMount: function(){
		// refresh teams 
		this.props.revisions.fetch();
	},
	backboneProps: ['video', 'revisions'],
	propTypes: {
		team: BackboneMixin.PropTypes.Model.isRequired,
		video: BackboneMixin.PropTypes.Model.isRequired,
	    revisions: BackboneMixin.PropTypes.Collection.isRequired,
	},
});

