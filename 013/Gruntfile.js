module.exports = function(grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        jshint : {
            options : {
                jshintrc : 'jshint-options.js'
            },
            uses_defaults : [
                'js/utils/*.js',
                'js/collections/*.js',
                'js/models/*.js',
                'js/views/*.js',
                'js/app.js',
                'js/bootstrap.js',
            ]
        },

        complexity : {
            generic : {
                src : [
                    'js/utils/*.js',
                    'js/collections/*.js',
                    'js/models/*.js',
                    'js/views/*.js',
                    'js/*.js'
                ],
                options : {
                    cyclomatic      : 3,
                    halstead        : 8,
                    maintainability : 100
                }
            }
        },

        jasmine : {
            src : [
                'js/third-party/underscore.js',
                'js/third-party/jQuery.js',
                'js/third-party/Backbone.js',
                'js/third-party/require.js',
                'jasmine-override.js',

                'js/core/Config.js',
                'js/i18n/Bundle.js',
                'js/utils/String.js',
                'js/utils/Debug.js',
                'js/utils/Dom.js',
                'js/views/PageView.js',
                'js/views/ToDoCollectionView.js',
                'js/models/ToDoModel.js',
                'js/collections/ToDoCollection.js'
            ],
            options : {
                specs : 'tests/**/*.js',
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'bin/coverage/coverage.json',
                    report: 'bin/coverage',
                }
            }
        }
    });

//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-complexity');
    grunt.registerTask('default', ['jasmine']);
};
