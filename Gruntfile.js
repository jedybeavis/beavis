module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

       

        concat: {
            // 2. Настройка для объединения файлов находится тут
		    dist: {
		        src: [
		            'source/js/*.js', // Все JS в папке libs
		        ],
		        dest: 'js/main.js',
		    }
        },
        stylus: {
		  compile: {
		    options: {
		      'include css': false,
		      'linenos':false,
		      'paths': ['css/', 'source/css']
		    },
		    files: {
		      'css/main.css': 'source/css/*.styl',
		    }
		  }
		},
	    sprite:{
	      all: {
	        src: 'images/sprite/*.png',
	        dest: 'images/spritesheet.png',
			destCss: 'source/css/common/sprites.styl',
			imgPath: '../images/spritesheet.png',
		    // cssOpts: {
		    //   cssClass: function (item) {
		    //     var prefix = short ? short + '-' : '';
		    //     return '.' + prefix + item.name + ':before';
		    //   }
		    // },
		  }
		},

		jade: {
		  compile: {
            options: {
                client: false,
                pretty: true
            },
            files: [ {
              cwd: "source/",
              src: "*.jade",
              dest: "",
              expand: true,
              ext: ".html"
			} ]
			}
		},
		 watch: {
			css: {
			    files: ['source/css/*.styl', 'source/css/blocks/*.styl'],
			    tasks: ['stylus'],
			    options: {
			        spawn: false,
			    }
			},
			html: {
			    files: ['source/*.jade', 'source/include_tpl/*.jade'],
			    tasks: ['jade'],
			    options: {
			        spawn: false,
			    }
			},
			js: {
			    files: ['source/js/*.js', 'source/include_tpl/js/*.js'],
			    tasks: ['concat'],
			    options: {
			        spawn: false,
			    }
			}
		}



    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'stylus', 'sprite', 'jade', 'watch']);

};





