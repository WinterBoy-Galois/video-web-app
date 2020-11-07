var React = require('react'),
	s = require('strings')('teams.team'),

	Button = require('components/button'),
	Tables = require('components/tables'),
	InlineSelect = require('components/inlineSelect'),

	// mixins
	BackboneMixin = require('mixins/backbone'),
	UtilsMixin = require('mixins/utils'),

	AddMemberOp = require('app/operations/addTeamMember'),
	RemoveMemberOp = require('app/operations/removeTeamMember');


var roles = {
	'admin': "Admin",
	'editor': "Editor"
};


function onAddMember(team) {
	AddMemberOp({team:team});
}

function onRemoveMember(member) {
	RemoveMemberOp({teamMember:member,team:this.props.team});
}

function onChangeRole(member, role) {
	member.set({role:role});
	member.save();
}

function goBack() {
	window.history.back();
}

function rMember(member) {
	var key = member.cid,
		role = <InlineSelect
			options={roles}
			defaultValue={member.get('role')}
			disabled={!this.props.editable}
			onChange={onChangeRole.bind(this, member)}/>;


	var deleteButton = <Button disabled = {!this.props.editable} title='Remove' color='orange' icon='delete' style = 'outlined' onClick={onRemoveMember.bind(this, member)}/>;

	return (
		<Tables.Body key = {key} >
	    	<tr>
	    		<td>{member.get('email')}</td>
	    		<td rowSpan='2'> {role}</td>
	    		<td rowSpan='2'>{deleteButton}</td>
	    	</tr>
	    	<tr>
	    		<td className = 'vp_detail'>{'joined ' + this.utils.timeago(member.get('created'))}</td>
	    	</tr>
		</Tables.Body>);
};

function r() {
	var addButton = false;
	var doneButton = false;
	if (this.props.editable) {
		addButton = <Button
			title ='Invite New Member'
			icon='circle_plus'
			className = 'vp_add_button'
			onClick={onAddMember.bind(this, this.props.team)}/>;
	}

	if (this.props.memberonly) {
		doneButton = <Button class = "button green done"
			title ='Done'
			className = 'vp_done_button'
			onClick={goBack}/>;
	}

	return (
		<div>
			<h2>Members</h2>
			<Tables.Table>
					{this.props.team.members.map(rMember.bind(this))}
			</Tables.Table>
			<br />
			{addButton}
			{doneButton}
		</div>
	);
};


module.exports = React.createClass({
	mixins: [BackboneMixin, UtilsMixin],
	render: r,
	backboneProps: ['team', 'members'],
	propTypes: {
		editable: React.PropTypes.bool,
		members: BackboneMixin.PropTypes.Collection.isRequired,
	    team: BackboneMixin.PropTypes.Model.isRequired,
	},
});
