var React = require('react'),
    ServiceComponent = require('./service'),
    CustomHostingComponent = require('./custom_hosting'),
    UploadComponent = require('./upload');

module.exports = [
    {
        key: "youtube",
        title: "YouTube",
        description: "Import from YouTube",
        hint: <p>YouTube videos are not always immediately available after upload. Please make sure your YouTube video is public. <a target='_blank' href = 'http://videopath.com/tutorial/importing-videos-from-youtube-5/'>Learn more</a>.</p>,
        permission: false,
        example_url: 'https://youtu.be/bRiUcR3zFdY',
        label: "Enter YouTube URL",
        Component: ServiceComponent,
        height:330,
        hidden: false // wether this item shows in the list if the user does not have access to it
    },
    {
        key: "vimeo",
        title: "Vimeo",
        hint: <p>Vimeo Plus and Pro only. Before importing, please disable all Vimeo controls. <a target='_blank' href = 'http://videopath.com/tutorial/importing-videos-from-vimeo-4/'>Learn more</a>.</p>,
        description: "Import from Vimeo",
        permission: "vimeo",
        example_url: 'https://vimeo.com/36579366',
        label: "Enter Vimeo URL",
        Component: ServiceComponent,
        hidden: false,
        height:310
    },
    {
        key: "wistia",
        title: "Wistia",
        hint: <p>Host your videos on Wistia.  <a target='_blank' href = 'http://videopath.com/tutorial/importing-videos-from-wistia/'>Learn more</a>.</p>,
        description: "Import from Wistia",
        permission: "wistia",
        example_url: "http://home.wistia.com/medias/1gaiqzxu03",
        label: "Enter Wistia URL",
        Component: ServiceComponent,
        hidden: false,
        height:310
    },
    {
        key: "brightcove",
        title: "Brightcove",
        hint: <p>Host your videos on Brightcove. <a target='_blank' href = 'http://videopath.com/tutorial/importing-videos-from-brightcove/'>Learn more</a>.</p>,
        description: "Import from Brightcove",
        permission: "brightcove",
        label: "Enter Brightcove Video Preview URL",
        example_url: "http://players.brightcove.net/4328472451001/default_default/index.html?videoId=433205970800",
        Component: ServiceComponent,
        hidden: true,
        height:310
    },
    {
        key: "movingimage",
        title: "MovingImage24",
        description: "Import from MovingImage24",
        hint: <p></p>,
        permission: 'movingimage',
        example_url: 'http://e.video-cdn.net/video?video-id=-BNPey-_eWpKCkw82-UCWt&player-id=9iwE5ZdDSWjjT-Qiese83d',
        label: "Enter MovingImage24 Player URL",
        Component: ServiceComponent,
        height:330,
        hidden: true // wether this item shows in the list if the user does not have access to it
    },
    {
        key: "upload",
        title: "File Upload",
        hint: <p>Max length: 10 min. Monthly bandwidth limit: 50 GB. We support many formats, <br />such as mp4, 3gp, avi, flv and mpeg-2.</p>,
        description: "Upload your own file",
        permission: "upload",
        Component: UploadComponent,
        hidden: true,
        height:310
    },
    {
        key: "custom_hosting",
        hint: <p>Host your videos on your own servers and provide us with the urls. <a target='_blank' href = 'https://videopath.com/tutorial/host-videofiles-yourself/'>Learn more</a>.</p>,
        title: "Custom hosting",
        description: "Host on your own server",
        permission: "custom_hosting",
        Component: CustomHostingComponent,
        hidden: true,
        height:445
    }
];