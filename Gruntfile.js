module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		// Compile JS
		concat: {
		// 2. Настройка для объединения файлов находится тут
			dist: {
				src: ['src/js/*.js',],
				dest: 'build/js/main.js',
			}
		},
		// Compile CSS
		stylus: {
			compile: {
				options: {
					'compress':false,
				},
				files: {
					'build/css/main.css': 'src/css/*.styl',
				}
			}
		},
		// cssmin: {
		// 	target: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: 'build/css',
		// 			src: ['main.css', '!*.min.css'],
		// 			dest: 'build/css',
		// 			ext: '.min.css'
		// 		}]
		// 	}
		// },
		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'build/css/*.css',
						'build/*.html'
					]
				},
				options: {
					watchTask: true,
					server: 'build/'
				}
			}
		},
		// Compile Image Sprites
		sprite:{
			main: {
				src: 'build/images/sprite/*.png',
				retinaSrcFilter: ['build/images/sprite/*@2x.png'],
				dest: 'build/images/spritesheet.png',
				retinaDest: 'build/images/spritesheet_retina.png',
				destCss: 'src/css/common/sprites.styl',
				imgPath: '/images/spritesheet.png',
				retinaImgPath: '/images/spritesheet_retina.png',
			},
		},
		// Compile Jade
		jade: {
			compile: {
				options: {
					client: false,
					pretty: true
				},
				files: [ {
					cwd: "src/",
					src: "*.jade",
					dest: "build/",
					expand: true,
					ext: ".html"
				} ]
			}
		},


		watch: {
			options: { livereload: true, },
			css: {
				files: ['src/css/*.styl', 'src/css/blocks/*.styl'],
				tasks: ['stylus'],
				options: {
					spawn: false,
				}
			},
			html: {
				files: ['src/*.jade', 'src/include_tpl/*.jade'],
				tasks: ['jade'],
				options: {
					spawn: false,
				}
			},
			js: {
				files: ['src/js/*.js', 'src/include_tpl/js/*.js'],
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
    grunt.loadNpmTasks('grunt-browser-sync');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'stylus', 'jade', 'browserSync', 'watch']);

};