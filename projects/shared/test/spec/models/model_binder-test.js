define(
    ['backbone', 'shared/models/model_binder'],
    function(Backbone, model_binder) {


        describe("Models: ModelBinder: Single", function() {

            it("exists", function() {
                expect(model_binder).to.exist
            });

            it("will instantly bind value", function() {
                var src = new Backbone.Model();
                src.set({
                    src: "value"
                });
                var target = model_binder.bind({
                    'target': 'src'
                }, src);
                expect(target.get("target")).to.equal('value');
            });

            it("can bind single value", function() {

                var src = new Backbone.Model();
                var target = model_binder.bind({
                    'target': 'src'
                }, src);
                src.set({
                    src: "value"
                });
                expect(target.get("target")).to.equal('value');
                src.set({
                    src: "value2"
                });
                expect(target.get("target")).to.equal('value2');

            });

            it("can map value", function() {
                var src = new Backbone.Model();
                var target = model_binder.bind({
                    'target': {
                        observe: 'src',
                        map: function(src) {
                            return src + src + "hallo";
                        }
                    }
                }, src);
                src.set({
                    src: "value"
                });
                expect(target.get("target")).to.equal('valuevaluehallo');
            });

            it("can observe multiple values", function() {
                var src = new Backbone.Model();
                var target = model_binder.bind({
                    'target': {
                        observe: ['src', 'src2'],
                    }
                }, src);
                src.set({
                    src: "value",
                    src2: "other"
                });
                expect(target.get("target")).to.equal('value');
            });

            it("can do custom update", function() {
                var src = new Backbone.Model();
                var target = model_binder.bind({
                    'target': {
                        observe: ['src', 'src2'],
                        update: function(model, value) {
                            model.set({
                                'hallo': value[0] + value[1]
                            });
                        }
                    }
                }, src);
                src.set({
                    src: "value",
                    src2: "other"
                });
                expect(target.get("hallo")).to.equal('valueother');
            });


        });

        describe("Models: ModelBinder: Multi", function() {

            it("can map scoped value", function() {

                var src = new Backbone.Model();
                var src2 = new Backbone.Model();
                var target = model_binder.multiBind({
                    _models: {
                        src: src,
                        src2: src2
                    },
                    "value": "src.value",
                    "value2": "src2.value",
                    "value3": {
                        observe: ["src.value", "src2.value"],
                        map: function(val1, val2) {
                            return val1 + " " + val2;
                        }
                    }
                });

                src.set({
                    value: "some value"
                });
                src2.set({
                    value: "some other value"
                });

                expect(target.attributes.value).to.equal("some value");
                expect(target.attributes.value2).to.equal("some other value");
                expect(target.attributes.value3).to.equal("some value some other value");
            });
        });

    });