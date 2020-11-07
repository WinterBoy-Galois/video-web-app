var _ = require('underscore'),
    $ = require('jquery'),
    Marionette = require('marionette'),
    VideoView = require('./video'),
    ProjectView = require('./project'),
    template = require('./dashboard.html');


var view = Marionette.CompositeView.extend({

    className: "dashboard page",

    childView: null, //VideoView,

    childViewContainer: "", //".videos",

    childViewEventPrefix: "",//"video",

    template: template,

    behaviors: {
        LoadingIndicator: {}
    },

    initialize: function(options){
        if (!!options.view_type){
            if (options.view_type == 'videos'){
                this.childView = VideoView;
                this.childViewContainer = ".videos";
                this.childViewEventPrefix = "video";
            } else {
                this.childView = ProjectView;
                this.childViewContainer = ".projects";
                this.childViewEventPrefix = "project";
            }

            this.view_type = options.view_type;
        }
    },

    childViewOptions: function() {
        return {
            project_name: this.project_name,
            view_type: this.view_type,
        };
    },

    ui: {
        'paginator': '.paginator',
        'teams': '.vp_team_selector select',
        'teams_section': '.vp_team_selector'
    },

    events: {
        'click .upload': function() {
            this.trigger("start_video_clicked");
        },
        'keyup .vp_search input': function(e) {
            this.trigger('video_search_field_changed', $(e.currentTarget).val());
        },
        'keyup .vp_project_search input': function(e) {
            this.trigger('project_search_field_changed', $(e.currentTarget).val());
        },
        'click .paginator .button': function(e) {
            this.trigger('paginator_clicked', $(e.currentTarget).index() + 1);
        },
        'click .teampaginator .button': function(e) {
            this.trigger('teampaginator_clicked', $(e.currentTarget).index() + 1);
        },
        'change .vp_team_selector select': function(e) {
            this.trigger('team_selected', $(e.currentTarget).val());
        },
        'click .vp_history_back_button': function(e) {
            this.trigger('back_button_clicked', $(e.currentTarget).val());
        },
        'click #manage_projects': function(e) {
            this.trigger('manage_projects');
        },
        'click .viewmode': function(e) {
            if (!this.islistview) {
                this.islistview = true;
                $('.viewmode').removeClass('viewmode_thumbnail');
                $('.viewmode').addClass('viewmode_list');
                $('.listview_header').show();

                $('.video_thumbnail').hide();
                $('.videos').attr('style', 'width: 100%; margin:0 5px; box-shadow: none;');
                $('.video').attr('style', 'width: 100%; height: inherit; margin: 0; background-color: inherit; box-shadow: none;');
                $('.video_inner').attr('style', 'position: unset; margin: 0;');
                $('.video_list').show();
            } else {
                this.islistview = false;
                $('.viewmode').removeClass('viewmode_list');
                $('.viewmode').addClass('viewmode_thumbnail');
                $('.listview_header').hide();

                $('.video_list').hide();
                $('.videos').attr('style', '');
                $('.video').attr('style', '');
                $('.video_inner').attr('style', '');
                $('.video_thumbnail').show();                
            }
        },
        'click .listheader_projectname': function() {
            this.clickSort('.listheader_projectname', 'project');      
        },
        'click .listheader_title': function() {
            this.clickSort('.listheader_title', 'title');
        },
        'click .listheader_creation': function() {
            this.clickSort('.listheader_creation', 'creation');
        },
        'click .listheader_delete': function() {
            this.trigger('delete_checked');
        }
    },

    clickSort: function(fieldClass, fieldName) {
        $('.listheader_sorticon').removeClass('sort_down');
        $('.listheader_sorticon').removeClass('sort_up');

        if (this.sortField != fieldClass) {
            this.sortField = fieldClass;
            this.sortUp = true;
        }
        
        this.sortUp = !this.sortUp;

        if (!this.sortUp) {
            $(fieldClass + ' .listheader_sorticon').addClass('sort_up');
        } else {
            $(fieldClass + ' .listheader_sorticon').addClass('sort_down');
        }

        this.trigger('sort_clicked', fieldName, this.sortUp);
    },

    setTeamPaginator: function(page, num_pages) {
        var p = this.$el.find('.teampaginator');
        p.html('');
        if (num_pages <= 1) {
            return;
        }
        while (num_pages) {
            var current = page == num_pages ? ' current ' : '';
            var b = '<div class = "button teampaginator ' + current + '">' + num_pages + '</div> ';
            p.prepend(b);
            num_pages--;
        }
    },

    setPaginator: function(page, num_pages) {
        var p = this.$el.find('.paginator');
        p.html('');
        if (num_pages <= 1) {
            return;
        }
        while (num_pages) {
            var current = page == num_pages ? ' current ' : '';
            var b = '<div class = "button paginator ' + current + '">' + num_pages + '</div> ';
            p.prepend(b);
            num_pages--;
        }
    },

    setProjectTitle: function(title) {
        this.$el.find('.vp_title').html(title);
    }
});
module.exports = view;
