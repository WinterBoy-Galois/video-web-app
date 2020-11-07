

var attrs = {

	"plays_all": {
		type:'incremental',
		defaultValue:0,
        format:'0.[00]a',
        name:'Viewers',
        graph:true
	},

    "plays_unique": {
    	type:'incremental',
    	defaultValue:0,
        format:'0.[00]a'
    },

    "overlays_opened_all": {
    	type:'incremental',
    	defaultValue:0,
        format:'0.[00]a',
        name:'Total clicks on markers',
        graph:true
    },	

    "overlays_opened_unique": {
    	type:'incremental',
    	defaultValue:0,
        format:'0.[00]a',
        name: 'Viewers interacting with content',
        graph:true
    },

    "video_completed": {
    	type:'incremental',
    	defaultValue:0,
        format:'0.[00]a',
        name:'Viewers completed watching',
        graph:true
    },	

    "percent_interacting": {
    	type:'averaging',
    	defaultValue:0,
        format:'0.0',
        formatSuffix: '%',
        name:'Viewers interacting (%)',
        graph:true
    },

     "percent_completing": {
        type:'averaging',
        defaultValue:0,
        format:'0.0',
        formatSuffix: '%',
        name:'Viewers completing (%)',
        graph:true
    },

    "clicks_per_user": {
    	type:'averaging',
    	defaultValue:0,
        format:'0.00',
        name:'Average clicks per view',
        graph:true
    },

    "avg_session_time": {
    	type:'averaging',
    	defaultValue:0,
        format:'00:00:00',
        name:'Average view duration',
        graph:true
    },

    "popular_markers": {
        defaultValue: false
    },

    "video":{},
    "date":{}

};

/*
 *   Grouping settings
 */
var groups = {
     day: {
        name:'Days',
        sort:'YYYY MM DD',
        dateFormattedShort:'MMM Do',
        dateFormattedLong:'dddd MMM Do YYYY'
    },

    week: {
        name:'Weeks',
        sort:'gggg ww',
        dateFormattedShort:'ww gggg',
        dateFormattedLong:'wo [week] gggg, [from] MMM Do'
    },

    month: {
        name:'Months',
        sort:'YYYY MMM',
        dateFormattedShort:'MMM YYYY',
        dateFormattedLong:'MMMM YYYY'
    },

    year: {
        name:'Years',
        sort:'YYYY',
        dateFormattedShort:'YYYY',
        dateFormattedLong:'YYYY'
    }
};

/*
 * Selectable metrics
 */
var metrics = {

    plays_interaction: ["plays_all", "overlays_opened_unique"],
    plays_completing: ["plays_all", "video_completed"],

    interacting_completing: ["percent_interacting", "percent_completing"],

    clicks_per_user: ["clicks_per_user"],

    avg_session_time: ["avg_session_time"],

    markers_clicked_all: ["overlays_opened_all"]


};

module.exports = {
    attrs:attrs,
    groups:groups,
    metrics:metrics
};