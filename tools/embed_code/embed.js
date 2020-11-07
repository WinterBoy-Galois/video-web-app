
                    $(document).ready(function () {

                        // prevent multiple restarts
                        if ( document.vp_init ) { return; }
                        document.vp_init = true;

                        var outer_template = '<div class="vp_lightbox vp_lightbox_close" style="display:none;position:fixed;background-color:rgba(0,0,0,0.5);width:100vw;height:100vh;top:0px;left:0px;"><div class="frame_wrapper" style="box-sizing:content-box;-webkit-box-sizing:content-box;position:absolute;left:5%;top:5%;right:5%;bottom:5%;border:2px solid white;background-color:black;overflow:none;"></div></div>';

                        var inner_template = '<div class = "cover" style = "background-color:black;position:absolute;top:0px;left:0px;bottom:0px;right:0px;"></div><iframe allowTransparency="true" style = "background-color:black;" width="100%" height="100%" frameborder="0" allowfullscreen src="http://192.168.232.209:8888/pathplayer/dist/cooking"></iframe>';

                        var show = function(video_id) {
                            if ( document.vp_showing ) return;
                            document.vp_showing = true;

                            $inner_template = $(inner_template.replace("{{video_id}}", video_id));
                            $outer_template = $(outer_template);

                            $("body").append($outer_template);
                            $outer_template.fadeIn(100, function(){
                                $outer_template.find(".frame_wrapper").html($inner_template);
                                $outer_template.find("iframe").load(function(){
                                    $outer_template.find(".cover").fadeOut();
                                });
                            });

                            $(".vp_lightbox_close").click(function(){
                                frame_wrapper = $('.frame_wrapper');
                                frame_wrapper.html( frame_wrapper.html(autoplay=0) );
                                $(this).fadeOut(300, function(){
                                    document.vp_showing = false;
                                    $(this).remove();
                                });
                            });
                        };

                        $(".videopath").click(function(e){
                            var id = $(this).attr("videopath-id");
                            if ( id ) { show(id); }
                        });

                    });

