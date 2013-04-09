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
                'js/*.js'
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
                'js/third-party/require.js'
            ],
            options : {
                specs : 'spec/**/*.js'
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
