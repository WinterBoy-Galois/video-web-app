var _ = require('underscore'),
	config = require('config/analytics'),
	React = require('react'),
	s = require('strings')('videos.analytics'),

	calculations = require('./util/calculations'),
	export_csv = require('./util/export'),
	
	moment = require('moment'),

	// mixins
	BackboneMixin = require('mixins/backbone'),

    Forms = require('components/forms'),
    Button = require('components/button'),
    
	AppPage = require('components/app_page'),

	Graph = require('./graph'),
	Engagement = require('./engagement'),
	Overview = require('./overview'),

	checkAccessOp = require('app/operations/checkAccess');


	// metrics optoins
var metricOptions = _.mapObject(config.metrics, function(item){
	return _.map(item, function(i){ return config.attrs[i].name; }).join(' vs ');
});

/*
 * Helpers
 */
function checkAccess(props) {
	return checkAccessOp({}, {
        accessScope: props.team,
        requiresFeature: 'advanced_analytics',
        featureName: 'Advanced Analytics',
        featureDescription: 'Advanced Analytics allows you to export your analytics data, select different metrics or select a custom time interval.'
    });
};

/*
 * Events
 */
function onChangeMetric(metric) {
	var _this = this;
	checkAccess(this.props).then(function(){
		_this.setState({
			metric:_this.refs.metric.value()
		});
	});
};

function onChangeDate() {
	var _this = this;
	checkAccess(this.props).then(function(){
		_this.updateFromServer(_this.refs.range_start.value(), _this.refs.range_end.value());
	});
	
};

function onChangeGrouping(grouping) {
	var _this = this;
	checkAccess(this.props).then(function(){
		_this.setState({
			grouping:grouping,
			chart_data:calculations.calculateChartData(_this.state.results, _this.state.range_start, _this.state.range_end,grouping)
		});
	});
};

function onExport() {
	var _this = this;
	checkAccess(this.props).then(function(){
		export_csv(_this.state.chart_data, _this.props.video, _this.state.grouping);
	});
	
};

/*
 * Rendering
 */
function r() {

	return (
		<AppPage 
			title={s('title')}
			compAboveSheet={s('description', this.props.revision.get('title'))}
			hasBackButton
			size='xlarge'
			className = 'vp_analytics'>

			<Forms.Form>
				<Forms.Input 
					ref='metric'
					label='Metrics'
					type='select'
					options={metricOptions}
					defaultValue={this.state.metric}
					onChange={onChangeMetric.bind(this)}
					/>
				<Forms.Input 
					label='To'
					type='date'
					ref='range_end'
					defaultValue={this.state.range_end.clone()}
					onChange={onChangeDate.bind(this, 'range_end')}
					maxDate={moment().clone().subtract(1, 'days')}
					minDate={this.state.range_start.clone()}
					/>
				<Forms.Input 
					label='From'
					type='date'
					ref='range_start'
					defaultValue={this.state.range_start.clone()}
					onChange={onChangeDate.bind(this, 'range_start')}
					maxDate={this.state.range_end}
					/>
			</Forms.Form>
			<div className='clear' />

			<Graph 
				grouping={this.state.grouping}
				onChangeGrouping={onChangeGrouping.bind(this)}
				metric={this.state.metric}
				data={this.state.chart_data}
				loading={this.state.loading}/>

			<Overview 
				data={this.state.data}
				/>

			<Engagement 
				data={this.state.data}
				video={this.props.video}
				/>

			<div className='vp_export'>
				<Button 
					onClick={onExport.bind(this)}
					icon='analytics'
					color='blue' 
					title='Export data to .csv' />
			</div>

		</AppPage>
	);
};


var Analytics = React.createClass({
	
	mixins: [BackboneMixin],
	render: r,

	getInitialState: function(){
		return {
			metric:'plays_interaction',
			range_start: moment.utc().subtract(1, "months").startOf('day'),
            range_end:  moment.utc().subtract(1, "day").startOf('day'),
            data: calculations.defaultData,
            grouping:'day',
            chart_data:[],
            loading:false,
		};
	},

	updateFromServer: function(start, end){
		this.setState({
			loading:true,
			range_start:start,
			range_end:end
		});

		var _this = this;
		this.props.video.analyticsData.filterByRange(start.unix(), end.unix()).then(function(result) {
            _this.setState({
            	loading:false,
            	results:result.results,
            	data:calculations.calculateTotalData(result.results),
            	chart_data:calculations.calculateChartData(result.results, start, end, _this.state.grouping)
            });
        });
	},

	componentDidMount: function(){
		this.updateFromServer(this.state.range_start, this.state.range_end);
	},

	backboneProps: ['video'],
	propTypes: {
		video: BackboneMixin.PropTypes.Model.isRequired,
	},
});

module.exports = Analytics;
