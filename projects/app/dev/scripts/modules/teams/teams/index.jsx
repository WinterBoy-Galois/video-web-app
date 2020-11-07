var React = require('react'),
	s = require('strings')('teams.teams'),
	
	// mixins
	BackboneMixin = require('mixins/backbone'),
	UtilsMixin = require('mixins/utils'),

	Button = require('components/button'),
    Forms = require('components/forms'),
    Tables = require('components/tables'),

	AppPage = require('components/app_page'),

	// operations
	createTeamOp = require('app/operations/createTeam'),
	routeOp = require('app/operations/route');


function rEntry(team) {

	var key = team.cid;

	function teamSettings() {
		routeOp({route:'project/' + team.get('id')});
	};

	function teamVideos() {
		routeOp({route:'project/' + team.get('id') + '/videos'});
	};

	var editButton = <Button  onClick = {teamSettings} title = {s('edit_team')} color='lightblue' icon='view' />;
	/*if (!team.userCanEdit()) {
		editButton = <Button  onClick = {teamSettings} title = {s('view_team')} color='lightblue' icon='edit' />;
	}*/

	var description = 'Owned by ' + team.get('owner').email + ', created ' + this.utils.timeago(team.get('created'));
	if (team.get('is_default_team') ) {
		description = 'This is the default project for your personal videos.';
	}

    return (
		<Tables.Body key = {key} >
	    	<tr>
	    		<td>{team.get('name')}</td> 
	    		<td>{team.get('role')}</td> 
	    		<td><a onClick={teamVideos}>{team.get('stats').number_of_videos + ' Videos'}</a></td> 
	    		<td><a onClick={teamSettings}>{team.get('stats').number_of_members + ' Members'}</a></td> 
	    		<td rowSpan ='2'>{editButton}</td>
	    	</tr>
	    	<tr>
	    		<td colSpan='4' className = 'vp_detail'>{description}</td>
	    	</tr>
		</Tables.Body>
	);
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
				{/*<Button title ='Add new Project' icon='circle_plus' onClick={createTeamOp} className = 'vp_add_button' />*/}
				<Tables.Table>
					<Tables.Header>{['Project', 'Your Role']}</Tables.Header>
						{this.props.teams.map(rEntry.bind(this))}
				</Tables.Table>
			</AppPage>
		);
	},
	componentDidMount: function(){
		// refresh teams 
		this.props.teams.fetch();
	},
	backboneProps: ['teams'],
	propTypes: {
	    teams: BackboneMixin.PropTypes.Collection.isRequired,
	},
});
